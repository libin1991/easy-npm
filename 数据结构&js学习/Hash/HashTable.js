/*
* @Author: bluedoor
* @Date:   2017-04-04 10:37:26
* @Last Modified by:   bluehezi
* @Last Modified time: 2017-04-05 18:54:15
*/


'use strict';
function HashTable () {
	var items = [];

	function PairValue (key, value) {
		this.key = key;
		this.value = value;
	}

	function LinkedList () {
		function Node (ele) {
			this.element = ele;
			this.next = null;
		}
		var head = null;
		var length = 0;

		this.append = function (val) {
			var node = new Node(val),
				current = head;
			if (!head) {
				head = node;
			} else {
				while (current.next) {
					current = current.next;
				}
				current.next = node;
			}
			return ++length;
		}
		// 根据position移除节点
		this.removeAt = function (position) {
			if (position > -1 && length > position) {
				
				var current = head,
					previous,
					index = 0,
					value = null;
				if (position === 0) {
					head = current.next;
				} else {

					while (index++ < position) {
						previous = current;
						current =  current.next;
					}
					previous.next = current.next;

				}
				length--;
				return current.element;
			}
			return false;
		}
		this.size = function () {
			return length;
		}
		this.getHead = function () {
			return head;
		}
		this.print = function () {
			var current = head;
			console.log('----------------------------');
			while (current) {
				console.log(current.element);
				current = current.next;
			}
			console.log('----------------------------');
		}
	}

	// 定位 散列函数
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
		var pair = new PairValue(key,value);
		if (items[position] === undefined) {
			items[position] = new LinkedList();
		}
		
		var current = items[position].getHead(); 
		
		while (current) {
			if (current.element.key === pair.key) {
				current.element = pair;
				break;
			}
			current = current.next;
		}
		if (!current) {
			items[position].append(pair);
		}
		return items[position].size();
	}
	this.get = function (key, def) {
		var position = this.loseloseHashCode(key);
		var pair = new PairValue(key, def);
		if (!items[position]) {
			return pair;
		}
		var current = items[position].getHead();
		while (current) {
			if (current.element.key === key) {
				return current.element;
			}
			current = current.next;
		}
		return pair;
	}
	this.remove = function (key) {
		var position = this.loseloseHashCode(key);
		if (!items[position]) {
			return false;
		}
		var current = items[position].getHead();
		var index = 0;
		while (current) {
			if (current.element.key === key) {
				break;
			}
			current = current.next;
			index++;
		}
		return items[position].removeAt(index);
	}

	this.size = function () {
		// 散列数组获取长度
		var size = 0;
		Object.keys(items).forEach(function(value, i){
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
		var values = Object.keys(items);
		for (var i = 0; i < values.length; i++) {
			items[values[i]].print();
		}
	}
}
