// https://es6.ruanyifeng.com/#docs/async#%E5%AE%9E%E4%BE%8B%EF%BC%9A%E6%8C%89%E9%A1%BA%E5%BA%8F%E5%AE%8C%E6%88%90%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C
function asyncFn(id) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000, id)
  })
}

function logInOrder(ids) {
  const textPromises = ids.map(id => {
    return asyncFn(id).then(response => response);
  });

  // 按次序输出
  // method1
  // textPromises.reduce((chain, textPromise) => {
  //   return chain.then(() => textPromise)
  //     .then(text => console.log(text));
  // }, Promise.resolve());
  
  // method2
  // 参照https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#%E7%A4%BA%E4%BE%8B
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise.then(console.log))
  }, Promise.resolve())
}

logInOrder(['1','2','3','4'])
