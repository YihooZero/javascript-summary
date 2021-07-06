// 方法一：sort 方法进行排序
var numArray = [140000, 104, 99];
numArray.sort(function(a, b) {
  return a - b;
});
console.log(numArray);

/**
 * 方法二：冒泡排序
 *
 * 算法描述
 * 冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，
 * 如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需
 * 要交换，也就是说该数列已经排序完成。
 *
 * 具体算法实现
 * 1、比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 * 2、对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
 * 3、针对所有的元素重复以上的步骤，除了最后一个；
 * 4、重复步骤1-3，直到排序完成。
 *
 * 参考文章
 * https://www.section.io/engineering-education/sorting-algorithms-in-js/
 */
function bubbleSort(arr){
  //Outer pass
  for(let i = 0; i < arr.length; i++){
    //Inner pass
    for(let j = 0; j < arr.length - i - 1; j++){
      //Value comparison using ascending order
      if(arr[j + 1] < arr[j]){
        //Swapping
        [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
      }
    }
  }
  return arr;
}
console.log(bubbleSort([5,3,8,4,6]));

/**
 * 方法三：插入排序
 */
function insertionSort(arr){
  //Start from the second element.
  for(let i = 1; i < arr.length;i++){
    //Go through the elements behind it.
    for(let j = i - 1; j > -1; j--){
      //value comparison using ascending order.
      if(arr[j + 1] < arr[j]){
        //swap
        [arr[j+1],arr[j]] = [arr[j],arr[j + 1]];
      }
    }
  }
  return arr;
}
console.log(insertionSort([23, 1, 10, 5, 2]));
