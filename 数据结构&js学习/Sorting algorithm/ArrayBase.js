/*
* @Author: bluehezi
* @Date:   2017-04-10 13:11:09
* @Last Modified by:   bluehezi
* @Last Modified time: 2017-04-10 13:18:11
*/

'use strict';

function ArrayBase () {
	this.items = [];
	this.append = function (val) {
		// items.push(val);
		this.items[this.items.length] = val;
	}
	this.toString = function () {
		return this.items.join(' - ');
	}
}
ArrayBase.prototype.swap = function (arr, i, j) {
	var temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp; 
}
