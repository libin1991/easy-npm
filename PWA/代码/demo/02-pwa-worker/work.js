// 要求:计算1-1亿之间所有数的和
// 注意：web worker是一个独立的进程，不能操作DOM和BOM
// 适合做大量的运算
let total = 0
for (var i = 0; i < 100000000; i++) {
  total += i
}

// 发消息给主线程，把结果给他
self.postMessage({ total: total })
