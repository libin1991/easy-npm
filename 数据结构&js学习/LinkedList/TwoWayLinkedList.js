/*
* @Author: bluedoor
* @Date:   2017-03-25 22:13:01
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-03-26 10:56:16
*/

// 双向链表

'use strict';
function TwoWayLinkedList () {
	
	function Node (ele) {
		this.element = ele;
		this.prev = null;
		this.next = null;
	}

	var head = null,
		tail = null,
		length = 0;

	this.append = function (ele) {
		var node = new Node(ele);
		if (head === null && tail === null) {
			tail = head = node;
		} else {
			tail.next = node;
			node.prev = tail;
			tail = node;
		}
		return ++length;
	}

	this.insert = function (position,ele) {
		if (position > -1 && position <= length) {
			var node = new Node(ele),
				current = head,
				prev = null,
				index = 0;
			if (position === 0) {
				if (head === null && tail === null) {
					head = tail = node;
				} else {
					node.next = head;
					head.prev = node;
					head = node;
				}
			} else if (position === length) {
				tail.next = node;
				node.prev = tail;
				tail = node;
			} else {
				while (index++ < position) {
					prev = current;
					current = current.next;
				}
				prev.next = node;
				node.prev = prev;
				node.next = current;
				current.prev = node;
			}
			return ++length;
		}
		return -1;
	}
	this.removeAt = function (position) {
		if (position > -1 && position < length) {
			var current = head,
				prev = null,
				index = 0;

			if (position === 0) {
				if (head === tail) {
					tail = head = null;
				} else {
					current.next.prev = null;
					head = current.next;
					current.next = null;
				}	
				--length;
				return current.element;
			}

			if (position === length-1) {
				prev = tail.prev;
				prev.next = null;
				tail.prev = null;
				current = tail;
				tail = prev;
				--length;
				return current.element;
			}
			while (index++ < position) {
				prev = current;
				current = current.next;
			}

			prev.next = current.next;
			current.next.prev = prev;
			--length;
			return current.element;
		}
		return null;
	}
	this.indexOf = function (ele) {
		var current = head,
			index = -1;

		while (current) {
			++index;
			if (current.element === ele) {
				return index;
			}
			current = current.next;
		}

		return -1;
	}
	this.remove = function (ele) {
		var index = this.indexOf(ele);
		return this.removeAt(index);
	}
	this.size = function () {
		return length;
	}
	this.clear = function () {
		var current = head;
		while (current) {
			current.prev = null;
			current.element = null;
			current = current.next;
		}
		head = tail = null;
	}
	this.toString = function () {
		var string = 'length: ' + length + '; ';
		var current = head;
		while (current) {
			string += (current === head ? '' : '-> ') + current.element + ' ';
			current = current.next;
		}
		return string;
	}
}