/*
* @Author: bluehezi
* @Date:   2017-04-10 13:24:41
* @Last Modified by:   bluehezi
* @Last Modified time: 2017-04-10 13:29:03
*/

// 冒泡排序
'use strict';
ArrayBase.prototype.bubbleSort = function () {
	for (var i = 0; i < this.items.length; i++) {
		for (var j = 0; j < this.items.length-i-1; j++) {
			if (this.items[j] > this.items[j+1]) {
				this.swap(this.items, j, j + 1);
			}
		}
	}
}