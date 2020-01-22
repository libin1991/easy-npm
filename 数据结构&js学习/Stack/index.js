/*
* @Author: bluedoor
* @Date:   2017-03-22 08:25:01
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-03-22 09:32:57
*/

'use strict';
!function (window, document,Stack) {
	window.addEventListener('load', function (event) {
		// let stack = new Stack()
		// stack.print()
		// stack.push('hello world!')
		// stack.print()
		// stack.push('memeda')
		// stack.print()
		// console.log(stack.pop() + '被弹出栈')
		// stack.print()
		// stack.clear()
		// stack.print()
		
		// 十进制转换为二进制
			// 0 - 1000 之间的伪随机数 [0, 1000)
		let digit = Math.floor(Math.random() * 1000)
		let stack = new Stack()
		let m = digit
		let binaryString = ''
		while (m !== 0) {
			stack.push(m % 2)
			m = Math.floor(m / 2)
		}
		stack.print()
		while (stack.size()) {
			binaryString += stack.pop()
		}
		console.log(binaryString)


		// 十进制转其他进制
		/* 
			digit 要转换的十进制数
			base  转换为几进制  八进制 二进制 16进制
			Stack 栈对象
			numBytes 几字节长度  
		*/
		function digitToOther (digit, base, Stack, length) {
			let rem = digit
			let stack = new Stack()
			let baseString = ''
			let remainder = 0
			while (rem !== 0) {
				remainder = rem % base
				if (base === 16 && remainder >= 10) {
					let temp = String.fromCharCode('A'.charCodeAt() + remainder - 10) 
					stack.push(temp)
				} else {
					stack.push(remainder)
				}				
				rem = Math.floor(rem / base)
			}
			while (stack.size()) {
				baseString += stack.pop()
			}

			let rel = length - baseString.length
			if (rel <= 0) {
				return baseString
			}

			return new Array(rel + 1).join('0') + baseString
		}
		console.log(digitToOther(16,8,Stack,8))
	}, false)
} (window,document,Stack)