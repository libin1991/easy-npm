/*
* @Author: bluedoor
* @Date:   2017-03-24 20:58:40
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-03-24 21:32:09
*/
// 优先队列
'use strict';

// 最小优先队列， 优先值小的元素放在队列的前面
function PriorityQueue () {
	var container = []
	function QueueElement (ele, priority) {
		this.element = ele
		this.priority = priority
	}

	this.enqueue = function (ele, priority) {
		var qEle = new QueueElement(ele, priority)

		if (this.isEmpty()) {
			container.push(qEle)
			return this.length() 
		}

		for (var i = 0; i < container.length; i++) {
			if (qEle.priority < container[i].priority) {
				container.splice(i,0,qEle)
				return this.length()
			}
		}
		container.push(qEle)
		return this.length()
	}
	this.dequeue = function () {
		return container.shift()
	}
	this.isEmpty = function () {
		return container.length === 0
	}
	this.length = function () {
		return container.length
	}
	this.clear = function () {
		container = []
	}
	this.front = function () {
		return container[0]
	}
	this.print = function () {
		if (this.isEmpty()) {
			console.log('!!! EMPTY')
		} else {
			console.log(container)
		}
	}
}