package org.dynjs.vertx;

import org.dynjs.runtime.*;
import org.vertx.java.platform.Verticle;

import java.io.*;

public class DynJSVerticle extends Verticle {
    protected final DynJS runtime;
    protected final String scriptName;
    protected Object stopFunction;
    protected ExecutionContext rootContext;

    public DynJSVerticle(DynJS runtime, String scriptName) {
        this.runtime = runtime;
        this.scriptName = scriptName;
    }

    protected ExecutionContext initializeRootContext() {
        return ExecutionContext.createGlobalExecutionContext(runtime, new InitializationListener() {
            @Override
            public void initialize(ExecutionContext context) {
                rootContext = context;
            }
        });
    }

    @Override
    public void start() {
        this.loadResource(this.scriptName);
    }

    protected void loadResource(String resourceName) {
        ClassLoader old = Thread.currentThread().getContextClassLoader();
        Thread.currentThread().setContextClassLoader(runtime.getConfig().getClassLoader());

        File scriptFile = new File(resourceName);
        rootContext = initializeRootContext();
        runtime.clearModuleCache();

        Runner runner = runtime.newRunner();
        try {
            if (scriptFile.exists()) {
                runner.withContext(rootContext).withSource(scriptFile).evaluate();
            } else {
                InputStream is = runtime.getConfig().getClassLoader().getResourceAsStream(resourceName);
                if (is == null) {
                    throw new FileNotFoundException("Cannot find script: " + resourceName);
                }
                BufferedReader reader = new BufferedReader(new InputStreamReader(is));
                runner.withSource(reader).evaluate();
                stopFunction = runner.withSource("(typeof vertxStop == 'function' ? vertxStop : null)").evaluate();
                try {
                    is.close();
                } catch (IOException e) {
                    // ignore
                }
            }
        } catch (Exception e) {
            System.err.println("Error loading script: " + resourceName + ". " + e.getLocalizedMessage());
            throw new RuntimeException(e);
        } finally {
            Thread.currentThread().setContextClassLoader(old);
        }
    }

    @Override
    public void stop() {
        try {
            if (stopFunction instanceof JSFunction) ((JSFunction)stopFunction).call(rootContext);
        } catch (Exception e) {
        }
    }
}
