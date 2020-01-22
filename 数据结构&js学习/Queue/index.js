/*
* @Author: bluedoor
* @Date:   2017-03-24 09:14:19
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-03-24 21:35:02
*/

'use strict';
~function (Queue, PriorityQueue) {
	window.addEventListener('load', function () {
		// 普通队列
		// var queue = new Queue()
		// queue.print()
		// queue.enqueue(123)
		// queue.print()
		// queue.dequeue()
		// queue.enqueue(234)
		// queue.print()
		// console.log(queue.isEmpty())
		// queue.enqueue(345)
		// queue.dequeue()
		// console.log(queue.front())

		// 优先队列
		// var pQueue = new PriorityQueue()
		// pQueue.print()
		// pQueue.enqueue({name: 'linge'},10)
		// pQueue.enqueue({name: 'yue'},11)
		// pQueue.enqueue(123,9)
		// pQueue.dequeue()
		// pQueue.print()
		// console.log(pQueue.front())
		// console.log(pQueue.length())
		// pQueue.clear()

		// 击鼓传花
		
		function hotPhtato (list, num) {

			var queue = new Queue()
			Array.prototype.forEach.call(list,function(val,index){
				queue.enqueue(val)
			})
			while (queue.length() !== 1) {
				var temp = num
				while (--temp) {
					queue.enqueue(queue.dequeue())
				}
				console.log(queue.dequeue() + ' 被移除队列')
			}
			console.log('获胜者: ' + queue.dequeue())
		}

		hotPhtato(['a','b','c','d','e'],7)
	}, false);
}(Queue, PriorityQueue)
