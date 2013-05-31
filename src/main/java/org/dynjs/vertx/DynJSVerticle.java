package org.dynjs.vertx;

import java.io.FileNotFoundException;

import org.dynjs.runtime.ExecutionContext;
import org.dynjs.runtime.InitializationListener;
import org.dynjs.runtime.Runner;
import org.vertx.java.platform.Verticle;

public class DynJSVerticle extends Verticle {
    protected final String scriptName;
    protected ExecutionContext rootContext;
    protected DynJSVerticleFactory factory;

    public DynJSVerticle(DynJSVerticleFactory factory, String scriptName) {
        this.factory = factory;
        this.scriptName = scriptName;
    }

    protected ExecutionContext initializeRootContext() {
        return ExecutionContext.createGlobalExecutionContext(factory.getRuntime(), new InitializationListener()
        {
            @Override
            public void initialize(ExecutionContext context) {
                rootContext = context;
                factory.getRuntime().clearModuleCache();
            }
        });
    }

    @Override
    public void start() {
        rootContext = initializeRootContext();
        try {
            factory.loadScript(this.rootContext, this.scriptName);
        } catch (FileNotFoundException e) {
            System.err.println("Cannot load script: " + this.scriptName);
            e.printStackTrace();
            throw new RuntimeException("Cannot start verticle", e);
        }
    }

    @Override
    public void stop() {
        try {
            Runner runner = rootContext.getGlobalObject().getRuntime().newRunner();
            runner.withContext(rootContext).withSource("(vertxStop ? vertxStop() : null)").execute();
        } catch (Exception e) {
        }
    }
}