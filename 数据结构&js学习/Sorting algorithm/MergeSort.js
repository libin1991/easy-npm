/*
* @Author: bluehezi
* @Date:   2017-04-10 14:59:48
* @Last Modified by:   bluehezi
* @Last Modified time: 2017-04-10 15:26:09
*/

// 归并排序
'use strict';

ArrayBase.prototype.mergeSort = function () {

	function MergeSortDivide (arr) {
		if (arr.length > 1) {
			var mid = Math.floor(arr.length / 2);
			
			return merge(
						MergeSortDivide(arr.slice(0,mid)),
						MergeSortDivide(arr.slice(mid))				
				);
		}
		return arr;
	}
	function merge (left, right) {
		var result = [];
		var il = 0, ir = 0;
		while (il < left.length && ir < right.length) {
			if (left[il] < right[ir]) {
				result.push(left[il++]);
			} else {
				result.push(right[ir++]);
			}
		}
		// while (il < left.length) {
		// 	result.push(left[il++]);
		// }
		// while (ir < right.length) {
		// 	result.push(right[ir++]);
		// }
		if(il < left.length){
			result = result.concat(left.slice(il));
		}
		if(ir < right.length){
			result = result.concat(right.slice(ir));
		}
		return result;
	}

	this.items = MergeSortDivide(this.items);
}