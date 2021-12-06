//集合示意图传送门：https://github.com/YihooZero/javascript-summary/blob/main/imgs/gather.jpg
//第一：数组取交集-->lodash.intersection
const array1 = [{ name: 'a', id: 1 }, { name: 'b', id: 2 }, { name: 'c', id: 3 }];
const array2 = [{ name: 'b', id: 2 }, { name: 'c', id: 3 }, { name: 'd', id: 4 }];

const intersection1 = array1.filter(item1 => array2.some(item2 => item1.id === item2.id))

const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4, 5];

const intersection2 = arr1.filter(value => arr2.includes(value));
const intersection3 = arr1.filter(function(n) {
  return arr2.indexOf(n) !== -1;
});
const intersection4 = function (a, b) {
  var setA = new Set(a);
  var setB = new Set(b);
  var intersection = new Set([...setA].filter(x => setB.has(x)));
  return Array.from(intersection);
};

//第二: 数组取并集-->lodash.union
const union1 = function (arr1, arr2) {
  var union = arr1.concat(arr2);
  for (var i = 0; i < union.length; i++) {
    for (var j = i+1; j < union.length; j++) {
      if (arr1[i].id === arr2[j].id) {
        union.splice(j, 1);
        j--;
      }
    }
  }
  return union;
}
// 此方法对对象数组不适用
const union2 = [...new Set([...arr1, ...arr2])];

//第三：数组取对称差集-->lodash.xor
const difference1 = arr1
  .filter(x => !arr2.includes(x))
  .concat(arr2.filter(x => !arr1.includes(x)));
