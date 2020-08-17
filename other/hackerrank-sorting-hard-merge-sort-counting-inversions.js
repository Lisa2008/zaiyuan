function countInversions(arr) {
  if(!arr || arr.length === 0) return 0;
  
  let count = 0;
  count = mergeSortCount(arr);
  
  return count.count;

}

function mergeSortCount(arr){
  
  let len = arr.length;
  let mid = Math.floor(len/2);
  let leftArr, rightArr;
  
  if(len%2 === 0){
    leftArr = arr.slice(0, mid );
    rightArr = arr.slice(mid);
  }else{
    leftArr = arr.slice(0, mid + 1 );
    rightArr = arr.slice(mid + 1);
  }
  
  let leftObj, rightObj;
  
  if(leftArr.length > 1) {
    leftObj = mergeSortCount(leftArr);
  }else{
    leftObj = {count: 0, arr: leftArr};
  }
  
  if(rightArr.length > 1) rightObj = mergeSortCount(rightArr);
  else{
    rightObj = {count: 0, arr: rightArr};
  }
  
  let retObj = mergeCount(leftObj, rightObj);
  
  return retObj;
}

function mergeCount(leftObj, rightObj){
  let leftIndex = 0;
  let rightIndex = 0;
  let swaps = 0;
  
  let leftLen = leftObj.arr.length;
  let retObj = {count: leftObj.count + rightObj.count,
                arr: []};
  
  while(leftIndex < leftLen && rightIndex < rightObj.arr.length){
    if(leftObj.arr[leftIndex] <= rightObj.arr[rightIndex]) {
      retObj.arr.push(leftObj.arr[leftIndex]);
      leftIndex++;
    }else{
      retObj.arr.push(rightObj.arr[rightIndex]);
      rightIndex++;
      retObj.count += leftLen - leftIndex;
    }
  }
  
  while(leftIndex < leftLen){
    retObj.arr.push(leftObj.arr[leftIndex]);
    leftIndex++;
  }
  
  while(rightIndex < rightObj.arr.length){
    retObj.arr.push(rightObj.arr[rightIndex]);
    rightIndex++;
  }
  
  return retObj;
}

let arr0 = [2,1,3];
//console.log(countInversions(arr0)); //1

let arr1 = [2,1,3,1,2];
//console.log(countInversions(arr1)); //4

let arr2 = [3,5,8,7,6];
//console.log(countInversions(arr2)); //3

let arr3 = [1,1,1,2,2];
//console.log(countInversions(arr3)); //0

let arr4 = [8,4,2,1];
//console.log(countInversions(arr4)); //6

let arr5 = [ 1, 20, 6, 4, 5 ];
console.log(countInversions(arr5)); //5