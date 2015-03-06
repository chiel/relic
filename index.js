'use strict';

/**
 * New relic
 */
var Relic = function(){
	this.cache = {};
};

/**
 * Set a new key into the cache
 * @param {String} key
 * @param {Mixed} value
 * @param {Number} ttl
 */
Relic.prototype.set = function(key, value, ttl){
	var record = this.cache[key] || {};

	if (record.timeout){
		clearTimeout(record.timeout);
		record = {};
	}

	if (ttl){
		record.expires = ttl + (+new Date());
		record.timeout = setTimeout(function(){
			this.del(key);
		}.bind(this), ttl);
	}

	record.value = value;
	this.cache[key] = record;
};

/**
 * Get a key from the cache
 * @param {String} key
 */
Relic.prototype.get = function(key){
	var record = this.cache[key];
	return record ? record.value : undefined;
};

/**
 * Delete a key from the cache
 * @param {String} key
 */
Relic.prototype.del = function(key){
	delete this.cache[key];
};

module.exports = Relic;
