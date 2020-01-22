/*
* @Author: bluehezi
* @Date:   2017-04-10 13:28:45
* @Last Modified by:   bluehezi
* @Last Modified time: 2017-04-10 13:57:42
*/
// 插入排序
'use strict';
ArrayBase.prototype.insertionSort = function () {
	var sentry; // 哨兵

	for (var i = 1; i < this.items.length; i++) {
		sentry = this.items[i];
		let j = i;
		while (j > 0 && this.items[j-1] > sentry) {
			this.items[j] = this.items[j-1];
			--j;
		}
		if (i!==j) {
			this.items[j] = sentry;
		}
	}
}