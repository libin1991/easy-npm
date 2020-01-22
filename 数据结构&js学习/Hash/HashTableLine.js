/*
* @Author: bluehezi
* @Date:   2017-04-05 16:29:38
* @Last Modified by:   bluehezi
* @Last Modified time: 2017-04-05 18:54:04
*/

'use strict';
// 线性筛法
function HashTableLine () {
	var items = [];

	function PairValue (key, value) {
		this.key = key;
		this.value = value;
	}

	// 定位   散列函数
	this.loseloseHashCode = function (key) {
		// if (Object.prototype.toString.call(key) !== '[object string]') {
		// 	throw new Error('not string');
		// }
		if (Object.prototype.toString.call(key) !== Object.prototype.toString.call(new String())) {
			throw new Error('not string');
		}
		var hash = 5381;
		for (var i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
			hash = hash * 33 + key.charCodeAt(i);
		}
		return hash % 1013;
	}

	this.put = function (key, value) {

		var position = this.loseloseHashCode(key);
		var pair = new PairValue(key, value);
		while (items[position] !== undefined) {
			if (items[position].key === pair.key) {
				break;
			}
			++position;		
		}
		items[position] = pair;
	}
	this.get = function (key, def) {
		var position = this.loseloseHashCode(key);
		var pair = new PairValue(key, def);
		
		while (!items[position] || items[position].key !== pair.key) {
			++position;
			if (position >= items.length) {
				return pair;
			}
		}
		return items[position];
	}
	this.remove = function (key) {
		var position = this.loseloseHashCode(key);
		while (!items[position] || items[position].key !== key) {
			++position;	
			if (position >= items.length) {
				return false;
			}	
		}
		items[position] = undefined;
		return true;
	}
	this.size = function () {
		// 散列数组获取长度
		var size = 0;
		Object.keys(items).forEach(function(value, i){
			console.log();
			if (items[value] !== undefined) {
				++size;
			}
		});
		return size;
	}
	this.clear = function () {
		items = [];
	}

	this.print = function () {
		console.log(items);
	}
}
