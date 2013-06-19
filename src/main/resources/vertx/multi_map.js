/**
 * A <code>MultiMap</code> is a type of Map object that can store more
 * than one value for a given key. This is useful for storing and passing
 * around things like HTTP headers where a single header can have multiple
 * values.
 *
 * @constructor
 * @param {org.vertx.java.core.MultiMap} multiMap the underlying Java MultiMap instance
 */
MultiMap = function(j_map) {

  /**
   * Return the value for the given name
   *
   * @param {string} name The name to lookup in the map
   * @returns {string} value The value for the given name. If more than one value maps to 
   *          <code>name</code>, the first value is returned.
   */
  this.get = function(name) {
    return j_map.get(name);
  }

  /**
   * Execute the given function for every name, value pair stored
   *
   * @param {function} func The function to execute
   */
  this.forEach = function(func) {
    var names = j_map.names().iterator();
    while (names.hasNext()) {
      var name = names.next();
      var values = j_map.getAll(name).iterator();
      while (values.hasNext()) {
        func(name, values.next());
      }
    }
  }

  /**
   * Return all values stored for the given name.
   *
   * @param {string} name The name to lookup values for
   * @returns {Array} The values for the given name
   */
  this.getAll = function(name) {
    var n =  j_map.getAll(name);
    return _convertToArray(n);
  }

  /**
   * Returns if a value for the given name is stored
   *
   * @param {string} name The name to check for
   * @returns {boolean} <code>true</code> if <code>name</code> is stored in this map
   */
  this.contains = function(name) {
    return j_map.contains(name);
  }

  /**
   * Returns if this map is empty
   *
   * @returns {boolean} <code>true</code> if empty
   */
  this.isEmpty = function() {
    return j_map.isEmpty();
  }

  /**
   * Return all names for which values are stored
   *
   * @returns {Array} The names for which values are stored
   */
  this.names = function() {
    var n =  j_map.names();
    return _convertToArray(n);
  }

  /**
   * Add a value for the given name
   *
   * @param {string} name The name under which the value should be stored
   * @param {string} value The value to store
   * @returns {MultiMap}
   */
  this.add = function(name, value) {
    j_map.add(name, value);
    return this;
  }

  /**
   * Set a value for the given name. All previous stored values under the name will get deleted.
   *
   * @param {string} name The name under which the value should be stored
   * @param {string} value The value to store
   * @returns {MultiMap}
   */
  this.set = function(name, value) {
    j_map.set(name, value);
    return this;
  }

  /**
   * Set the content of the given map.
   *
   * @param {MultiMap} The map to set
   * @returns {MultiMap} self
   */
  this.setMap = function(map) {
    j_map.set(map._jmap);
    return this;
  }

  /**
   * Remove all values stored under the name
   *
   * @param {string} name The name for which all values should be removed
   * @returns {MultiMap} self
   */
  this.remove = function(name) {
    j_map.remove(name);
    return this;
  }

  /**
   * Clears the map
   *
   * @returns {MultiMap} self
   */
  this.clear = function() {
    j_map.clear();
    return this;
  }

  /**
   * Return the number of names stored.
   * @returns {number} the number of names stored
   */
  this.size = function() {
    return j_map.size();
  }

  /**
   * @private
   */
  this._jmap = j_map;
}

function _convertToArray(j_col) {
  var n = j_col.iterator();
  var array = new Array();
  var i = 0;

  while (n.hasNext()) {
    array[i++] = n.next();
  }
  return array;
}

/**
 * @module vertx/multi_map
 */
module.exports.MultiMap = MultiMap;
