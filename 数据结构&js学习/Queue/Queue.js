/*
* @Author: bluedoor
* @Date:   2017-03-24 09:14:06
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-03-24 21:31:37
*/

// 队列
'use strict';
function Queue () {
	var container = []
	this.enqueue = function (ele) {
		container.push(ele)
		return this.length()
	}
	this.dequeue = function () {
		return container.shift()
	}
	this.front = function () {
		return container[0]
	}
	this.isEmpty = function () {
		return container.length === 0
	}
	this.clear = function () {
		container = []
	}
	this.print = function () {
		console.log('queue: ' + container)
	}
	this.length = function () {
		return container.length
	}
}