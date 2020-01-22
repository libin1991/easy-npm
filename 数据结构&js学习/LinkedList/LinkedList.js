/*
* @Author: bluedoor
* @Date:   2017-03-25 17:03:17
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-03-27 14:22:20
*/

'use strict';
function LinkedList () {
	function Node (ele) {
		this.element = ele;
		this.next = null;
	}
	var head = null;
	var length  = 0;
	// 加入到链表
	this.append = function (ele) {
		var node = new Node(ele);
		if (head === null) {
			head = node;
		} else {
			var current = head;
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

	// 插入到链表中
	this.insert = function (position, ele) {
		var current = head,
			previous,
			index = 0;
		if (position > -1 && position <= length) {
			var node = new Node(ele)
			if (position === 0) {
				node.next = current;
				head = node;
			} else {
				while (index++ < position) {
					previous = current;
					current = current.next;
				}
				previous.next = node;
				node.next = current;
			}
			length++;
			return true;
		}
		return false;
	}
	// 返回元素在链表中的位置
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
	// 根据元素从链表对象移除节点
	this.remove = function (ele) {
		var index = this.indexOf(ele);
		return this.removeAt(index);
	}
	// 返回链表长度
	this.size = function () {
		return length;
	} 
	// 清空链表
	this.clear = function () {
		var current = head;
		while(current){
			current.element = null;
			current = current.next;
		}
		head = null;
		length = 0;
		return length;
	}
	// 输出链表对象信息为字符串
	this.toString = function () {
		var string = '';
		string += 'length: ' + length + '; ';
		var current = head;
		while(current){
			string += (current===head?'':' -> ') + current.element; 
			current = current.next;
		}
		return string;
	}
	this.getHead = function () {
		return head;
	}
}