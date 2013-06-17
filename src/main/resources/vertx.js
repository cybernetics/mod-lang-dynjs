/*
 * Copyright 2011-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

if (typeof module === 'undefined') {
  throw "Use require() to load Vert.x API modules"
}

/**
 * The 'vertx' module provides all of the vertx API namespaced 
 * under 'vertx'. For example:
 *
 * @example
 * var vertx  = require('vertx');
 * var buff   = new vertx.Buffer('some string');
 * var bus    = vertx.eventBus;
 * var client = vertx.http.createHttpClient();
 *
 * // Each of the modules imported by vertx may also be required as 
 * //individual modules. For example:
 *
 * var http   = require('vertx/http');
 * var server = http.createHttpServer();
 * var client = http.createHttpClient();
 *
 * var Buffer = require('vertx/buffer');
 * var buff   = new Buffer('another string');
 *
 * @exports vertx
 */
var vertx = {};

function addProps(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      vertx[key] = obj[key];
    }
  }
}

   
/** 
 * The vert.x Buffer class. 
 * See the {@linkcode module:vertx/buffer|buffer} module.
 * */
vertx.Buffer = require('vertx/buffer');

/**
 * The vert.x distributed event bus.
 * See the {@linkcode module:vertx/event_bus|event_bus} module.
 */
vertx.eventBus = require('vertx/event_bus');
addProps(require('vertx/net'));
addProps(require('vertx/http'));
vertx.Pump = require('vertx/pump');

// See if this fixes the intermittent 
// build failures with vertx.setTimer
var Timers = require('vertx/timer');
vertx.setTimer     = Timers.setTimer;
vertx.setPeriodic  = Timers.setPeriodic;
vertx.cancelTimer  = Timers.cancelTimer;
vertx.runOnContext = Timers.runOnContext;

addProps(require('vertx/sockjs'));
addProps(require('vertx/parse_tools'));
addProps(require('vertx/shared_data'));
vertx.fileSystem = require('vertx/file_system');

/**
 * Put the task on the event queue for this loop so it will be run asynchronously
 * immediately after this event is processed.
 *
 * @param {function} handler The desired diameter of the circle.
 */
vertx.runOnContext = function(task) {
  __jvertx.runOnContext(task);
}

vertx.currentContext = function() {
  return __jvertx.currentContext();
}

module.exports = vertx;
