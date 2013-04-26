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

var timers = {};

timers.setTimer     = __jvertx.setTimer.bind(__jvertx);
timers.setPeriodic  = __jvertx.setPeriodic.bind(__jvertx);
timers.cancelTimer  = __jvertx.cancelTimer.bind(__jvertx);
timers.runOnContext = __jvertx.runOnContext.bind(__jvertx);

module.exports = timers;
