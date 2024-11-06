// 参照highLevelUsage/05PromiseSequentialExecution.js
// Promise vs async...await

function asyncFn(id) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000*id, id)
  })
}

async function logInOrder(ids) {
  const textPromises = ids.map(id => {
    return asyncFn(id).then(response => response);
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
    // output: 2 1 4 3
  }

  // NOTE: forEach 并不会按照次序输出，有两种说法
  // 原因1：forEach() 方法要求使用同步函数——它不会等待 promise 执行完成
  // 详见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  // 原因2：forEach() 方法中的异步是并发执行，也就是同步执行，不是继发执行
  // 详见：https://es6.ruanyifeng.com/#docs/async
  textPromises.forEach(async textPromise => {
    console.log(await textPromise)
    // output: 1 2 3 4
  })
}

logInOrder([2, 1, 4, 3])

