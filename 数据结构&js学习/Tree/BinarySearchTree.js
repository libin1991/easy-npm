/*
* @Author: bluedoor
* @Date:   2017-04-04 18:50:50
* @Last Modified by:   bluehezi
* @Last Modified time: 2017-04-06 15:49:06
*/

'use strict';
function BinarySearchTree () {
	function Node (ele) {
		this.element = ele;
		this.left = null;
		this.right = null;
	}
	var root = null;

	this.insert = function (ele) {
		var node = new Node(ele);
		if (root === null) {
			root = node;
		} else {
			insertNode(root, node);
		}

	}
	function insertNode (root, node) {
		if (node.element < root.element) {
			if (root.left === null) {
				root.left = node;
			} else {
				insertNode(root.left,node);
			}
		} else {
			if (root.right === null) {
				root.right = node;
			} else {
				insertNode(root.right,node);
			}
		}
	}

	this.print = function () {
		console.log(root);
	}

// 遍历
	
	// 中序遍历
	this.inOrderTraverse = function (callback) {
		inOrderTraverseNode(root, callback);
	}

	function inOrderTraverseNode (node,callback) {
		if (node !== null) {
			inOrderTraverseNode(node.left, callback);
			callback(node.element);
			inOrderTraverseNode(node.right, callback);
		}
	}

	// 先序遍历
	this.preOrderTraverse = function (callback) {
		preOrderTraverseNode(root, callback);
	}

	function preOrderTraverseNode (node, callback) {
		if (node !== null) {
			callback(node.element);
			preOrderTraverseNode(node.left, callback);
			preOrderTraverseNode(node.right, callback);
		}
	}

	// 后序遍历
	this.postOrderTraverse = function (callback) {
		postOrderTraverseNode(root, callback);
	}
	function postOrderTraverseNode (node, callback) {
		if (node !== null) {
			postOrderTraverseNode(node.left, callback);
			postOrderTraverseNode(node.right, callback);
			callback(node.element);
		}
	}

	// 获取最左边的值，最右边的值
	this.leftValue = function () {
		return leftNode(root);
	}
	function leftNode (node) {
		if (node) {
			while (node && node.left !== null) {
				node = node.left;
			}
			return node.element;
		} else {
			return null;
		}
	}

	this.rightValue = function () {
		return rightNode(root);
	}
	function rightNode (node) {
		if (node) {
			while (node && node.right !== null) {
				node = node.right;
			}
			return node.element;
		} else {
			return null;
		}
	}
	// 搜索
	this.search = function (ele) {
		return searchNode(root, ele);
	}
	function searchNode (node, ele) {
		if (node === null) {
			return false;
		}
		if (ele < node.element) {
			return searchNode(node.left, ele);
		} else if (ele > node.element) {
			return searchNode(node.right, ele);
		} else {
			return true;
		}
	}

	// 移除
	this.remove = function (ele) {
		root = removeNode(root, ele);
	}

	function removeNode (node, ele) {
		if (node === null) {
			return null;
		}
		if (node.element > ele) {
			node.left = removeNode(node.left, ele);
			return node;
		} else if (node.element < ele) {
			node.right = removeNode(node.right, ele);
			return node;
		} else {
			if (node.left === null && node.right === null) {
				node = null;
				return node;
			} else if (node.left === null) {
				node = node.right;
				return node;
			} else if (node.right === null) {
				node = node.left;
				return node;
			}


			// 二叉搜索树删除左右叶子都存在的节点的几种方法：
			// 1、 删除节点左子树的最右边的元素替代之，相当于用前继节点替代
			// 2、删除节点右子树的最左边的元素替代之，相当于用后继节点替代
			// 以上两种都不改变中序遍历二叉树所得的顺序
			// 3、设要删除的节点是B，节点B是节点A的左子树。删除节点B以后，令B
			// 的左子树为A的左子树，B的右子树加到B的左子树的最右边
			// 4、假设要删除节点A，则（考虑节点A的左子树，找出左子树中最大的节点并与
			// A替换，若此时A为叶子节点，则直接删除，否则重复括号内的过程）
			
			// 方法一、
			// var aux = findRightNode(node.left);
			// node.element = aux.element;
			// node.left = removeNode(node.left, aux.element);
			// return node;
			// 方法二、
			var aux = findLeftNode(node.right);
			node.element = aux.element;
			node.right = removeNode(node.right, aux.element);
			return node;
			// 方法三、
			// var left = node.left;
			// var leftrightNode = findRightNode(node.left);
			// leftrightNode.right = node.right;
			// node.right = null;
			// node.left = null;
			// node = null;
			// return left;

			// 方法四、
			// 感觉方法四和方法一二一样

		}
	}

	function findLeftNode (node) {
		// if (node.left === null) {
		// 	return node;
		// }
		// return findLeftNode(node.left);

		if (node === null) {
			return null;
		}
		while (node.left) {
			node = node.left;
		}
		return node;
	}
	function findRightNode (node) {
		// if (node.right === null) {
		// 	return node;
		// }
		// return findRightNode(node.right);

		if (node === null) {
			return null;
		}
		while (node.right) {
			node = node.right;
		}
		return node;
	}
}

