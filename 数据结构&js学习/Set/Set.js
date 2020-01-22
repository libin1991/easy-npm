/*
* @Author: bluedoor
* @Date:   2017-04-01 13:23:36
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-04-01 14:26:04
*/

'use strict';

function Set () {
	this.items = {};
}
Set.prototype = {
	has (value) {
		// return value in this.items;
		return this.items.hasOwnProperty(this.ts(value));
	},
	add (value) {
		if (!this.has(value)) {
			this.items[this.ts(value)] = value;
			return true;
		}
		return false;
	},
	remove (value) {
		if (this.has(value)) {
			delete this.items[this.ts(value)];
			return true;
		}
		return false;
	},
	clear () {
		this.items = {};
	},
	size () {
		return Object.keys(this.items).length;
	},
	values () {
		var arr = [];
		for (var key in this.items) {
			arr.push(this.items[key]);
		}
		return arr;
	},
	// 键值
	ts (value) {
		return value.toString();
	},
	// operate
		// 并集
	union (otherSet) {
		if (!otherSet instanceof Set) {
			throw new Error('otherSet must be a Set type');
		}
		var unionSet = new Set();
		var values = this.values();
		for (var i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}
		values = otherSet.values();
		for (var i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}
		return unionSet;
	},
		// 交集
	intersection (otherSet) {
		if (!otherSet instanceof Set) {
			throw new Error('otherSet must be a Set type');
		}
		var intersectionSet = new Set();
		var values = this.values();
		// for (var i = 0; i < values.length; i++) {
		// 	intersectionSet.add(values[i]);
		// }
		
		// for (var i = 0; i < values.length; i++) {
		// 	if (!otherSet.has(values[i])) {
 	// 			intersectionSet.remove(values[i]);
		// 	}
		// }
		// 
		for (var i = 0; i < values.length; i++) {
			if (otherSet.has(values[i])) {
				intersectionSet.add(values[i]);
			}
		}
		return intersectionSet;
	},

	// 差集
	difference (otherSet) {
		if (!otherSet instanceof Set) {
			throw new Error('otherSet must be a Set type');
		}
		var set = new Set();
		var values = this.values();
		for (var i = 0; i < values.length; i++) {
			if (!otherSet.has(values[i])) {
				set.add(values[i]);
			}
		}
		return set;
	},
	subset (otherSet) {
		if (!otherSet instanceof Set) {
			throw new Error('otherSet must be a Set type');
		}
		if (this.size > otherSet.size) {
			return false;
		}

		var values = this.values();
		for (var i = 0; i < values.length; i++) {
			if (!otherSet.has(values[i])) {
				return false;
			}
		}
		return true;
	}
};
