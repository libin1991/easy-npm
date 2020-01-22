/*
* @Author: bluedoor
* @Date:   2017-03-25 17:03:06
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-03-26 10:52:41
*/

'use strict';
~function () {
	window.addEventListener('load', function(){
		
		// var list = new LinkedList()
		// list.append(1)
		// list.append(2)
		// list.append(3)
		// list.append(4)
		// console.log(list.toString())
		// list.remove(2)
		// console.log(list.toString())
		// list.removeAt(1)
		// list.removeAt(1)
		// list.removeAt(0)
		// console.log(list.toString())
		// list.insert(0,{name:'linge'})
		// console.log(list.toString())
		// console.log(list.indexOf({name:'linge'}))
		// list.clear()
		// console.log(list.toString())
		// list.insert(0,1)
		// console.log(list.toString())
		// console.log(list.remove(1))
		// console.log(list.toString())

		var twList = new TwoWayLinkedList();
		twList.append(1);
		twList.append(2);
		twList.append(3);
		twList.insert(3,12)
		twList.insert(0,12)
		twList.insert(2,12)
		console.log(twList.toString());

		twList.removeAt(1);
		console.log(twList.toString())
		console.log(twList.remove(1))
		twList.removeAt(0);
		console.log(twList.toString())
	}, false);
}()