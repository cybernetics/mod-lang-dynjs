[![Build Status](https://secure.travis-ci.org/dynjs/dynjs-vertx-module.png) ](http://travis-ci.org/dynjs/dynjs-vertx-module)

[![Build Status](https://buildhive.cloudbees.com/job/dynjs/job/dynjs-vertx-module/badge/icon) ](https://buildhive.cloudbees.com/job/dynjs/job/dynjs-vertx-module/)

# Javascript on Vert.x with DynJS

Use [DynJS](http://github.com/dynjs/dynjs) instead of Rhino on vert.x 2.0.

## API Documentation

While the API is essentially complete, the documentation is still a work in
progress. You can find our latest 
[API docs](https://projectodd.ci.cloudbees.com/view/DynJS/job/dynjs-vertx-module/lastSuccessfulBuild/artifact/target/docs/index.html)
on the CI server.

## Usage

We intend for DynJS to be the default Javascript runtime in vert.x 2.0, but
that is not currently the case, and since vert.x 2.0 is not currently released,
you'll need to build it.

    $ git clone https://github.com/vert-x/vert.x.git
    $ cd vert.x
    $ ./gradlew collectDeps
    $ ./gradelew distTar

This will put the complete vert.x installation in
`build/vert.x-2.0.0-SNAPSHOT`. Just update your `$PATH` to include
`/path/to/repo/vert.x/build/vert.x-2.0.0-SNAPSHOT/bin`. 

By default, vert.x runs Javascript with Rhino. Change this by creating a
`langs.properties` file at the root of your project that looks like this.

    dynjs=org.dynjs~lang-dynjs~1.0.0-SNAPSHOT:org.dynjs.vertx.DynJSVerticleFactory
    .js=dynjs

Enjoy. And if you have any problems, hit us on on freenode at #dynjs or #vertx.
And you can file any reproducible issues in our
[Jira](http://jira.codehaus.org/browse/DYNJS).
