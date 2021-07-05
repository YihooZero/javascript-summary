// 方法一
const array = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
const arr1 = [];
for (let i = 0; i < array.length; i++) {
  if (array.indexOf(array[i]) === i) {
    arr1.push(array[i]);
  }
}
console.log(arr1);
// [1, 2, 3, 5, 4]

// 方法二
const arr2 = array.filter((element, index, self) => {
  return self.indexOf(element) === index;
});
console.log(arr2);

// 方法三
let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
let arr31 = myArray.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue)
  }
  return accumulator
}, [])
console.log(arr31);
let arr32 = myArray.reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], [])

// 方法四
let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
let arr4 = arr.sort().reduce((init, current) => {
  if (init.length === 0 || init[init.length - 1] !== current) {
    init.push(current);
  }
  return init;
}, []);
console.log(arr4); // [1, 2, 3, 4, 5]

// 方法五
const arr51 = Array.from(new Set(array));
const arr52 = [...new Set(array)];

// 方法六(forEach和includes配合使用)
const arr6 = [];
array.forEach(el => {
  if (!arr6.includes(el)){
    arr6.push(el);
  }
})
console.log(arr6); // [1, 2, 3, 4, 5]
