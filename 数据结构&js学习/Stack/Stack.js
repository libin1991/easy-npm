/*
* @Author: bluedoor
* @Date:   2017-03-22 08:21:50
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-03-22 08:45:32
*/

'use strict';

function Stack () {
	var container = []
	this.push = function (element) {
		container.push(element)
		return this.size()
	}
	this.pop = function () {
		return container.pop()
	}
	this.size = function () {
		return container.length
	}
	// 返回栈顶元素
	this.peek = function () {
		return container[container.length-1]
	}
	this.isEmpty = function () {
		return container.length === 0
	}
	this.clear = function () {
		container = []
	}
	this.print = function () {
		if (this.isEmpty()) {
			console.log('栈为空')
			return
		}
		console.log('container: ' + container)
		console.log('size: ' + this.size())
		console.log('peek: ' + this.peek())
	}
}