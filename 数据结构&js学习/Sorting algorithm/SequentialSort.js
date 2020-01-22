/*
* @Author: bluedoor
* @Date:   2017-04-10 13:08:47
* @Last Modified by:   bluehezi
* @Last Modified time: 2017-04-10 13:20:40
*/

'use strict';
/**
 * 顺序排序
 */
ArrayBase.prototype.SeqSort = function () {
	for (var i = 0; i < this.items.length-1; i++) {
		for (var j = i+1; j < this.items.length; j++) {
			if (this.items[i] > this.items[j]) {
				this.swap(this.items, i, j);
			}
		}
	}
}