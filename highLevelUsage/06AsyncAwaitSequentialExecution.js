// 参照hightLevelUsage/05PromiseSequentialExecution.js
// Promise vs async...await

async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }

  // NOTE: forEach 并不会按照次序输出
  // 原因：forEach() 方法要求使用同步函数——它不会等待 promise 执行完成
  // 详见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  textPromises.forEach(async textPromise => {
    console.log(await textPromise)
  })
}
