// 创建length为3的数组
// 方法一
Array.from({length:3})  // [undefined, undefined, undefined]

// 方法二
Array.apply(null, {length:3}) // [undefined, undefined, undefined]

// 方法三
new Array(3).fill() // [undefined, undefined, undefined]
