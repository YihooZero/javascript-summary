// 参考https://es6.ruanyifeng.com/#docs/async
async function retry(retryUrl, retryTimes) {
  for (let i = 0; i < retryTimes; i++) {
    try {
      await fetch(retryUrl)
      break
    } catch (error) {}
  }
}