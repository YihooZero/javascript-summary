const array = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
const arr1 = [];
for (let i = 0; i < array.length; i++) {
  if (array.indexOf(array[i]) === i) {
    arr1.push(array[i]);
  }
}
console.log(arr1);
// [1, 2, 3, 5, 4]

const arr2 = array.filter((element, index, self) => {
  return self.indexOf(element) === index;
});
console.log(arr2);

let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
let arr3 = myArray.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue)
  }
  return accumulator
}, [])
console.log(arr3);

let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
let arr4 = arr.sort().reduce((init, current) => {
  if (init.length === 0 || init[init.length - 1] !== current) {
    init.push(current);
  }
  return init;
}, []);
console.log(arr4); // [1, 2, 3, 4, 5]

const arr5 = Array.from(new Set(array));

const arr6 = [...new Set(array)];

