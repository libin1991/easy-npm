/*
* @Author: bluedoor
* @Date:   2017-04-03 09:19:07
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-04-03 09:34:37
*/

'use strict';
function Dictionary () {
	var items = {};

	this.set = function (key, value) {
		items[key] = value;
	}
	this.remove = function (key) {
		if (this.has(key)) {
			delete items[key];
			return true;
		}
		return false;
	}
	this.has = function (key) {
		// return key in items;
		return items.hasOwnProperty(key);
	}
	this.get = function (key, def) {
		return this.has(key) ? items[key] : def;
	}
	this.clear = function () {
		items = {};
	}
	this.size = function () {
		return Object.keys(items).length;
	}
	this.keys = function () {
		return Object.keys(items);
	}
	this.values = function () {
		var values = [];
		for (var k in items) {
			this.has(k) ? values.push(items[k]) : undefined;
		}
		return values;
	}

	this.print = function () {
		console.log('-------------------------------');
		console.log('length: ' + this.size());
		console.log(items);
		console.log('keys: ' + this.keys());
		console.log('values: ' + this.values());
		console.log('-------------------------------');
	}
}


