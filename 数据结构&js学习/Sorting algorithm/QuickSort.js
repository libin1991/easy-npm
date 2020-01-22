/*
* @Author: bluehezi
* @Date:   2017-04-10 15:26:24
* @Last Modified by:   bluehezi
* @Last Modified time: 2017-04-10 15:40:45
*/

// 快速排序
'use strict';
ArrayBase.prototype.quickSort = function () {
	function partion (arr, left, right) {
		var povt = arr[Math.floor((left + right) / 2)]
		
		var il = left, ir = right;
		while (il <= ir) {
			while (il < right && arr[il] < povt) {
				++il;
			}
			while (ir >= left && arr[ir] > povt) {
				--ir;
			}

			if (il <= ir) {
				_this.swap(arr, il, ir);
				++il;
				--ir;
			}
		}
		return il;
	}
	function QuickSortDivide (arr, left, right) {
		if (arr.length > 1) {
			var index = partion(arr, left, right);
			if (index-1 > left) {
				QuickSortDivide(arr, left, index-1);
			}
			if (index < right) {
				QuickSortDivide(arr, index, right);
			}
		}
	}
	var _this = this;
	QuickSortDivide(this.items, 0, this.items.length-1);
}