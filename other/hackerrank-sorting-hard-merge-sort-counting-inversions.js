function countInversions(arr) {
  if(!arr || arr.length === 0) return 0;
  
  let index = 0;
  let len = arr.length;
  let count = 0;
  
  while(index < len - 1){
    if(arr[index] > arr[index + 1]){
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      count++;
      if(index > 0) index --;
    }
    else index++;
  }
  
  return count;

}

let arr1 = [2,1,3,1,2];
//console.log(countInversions(arr1));

let arr2 = [3,5,8,7,6];
//console.log(countInversions(arr2));

let arr3 = [1,1,1,2,2];
//console.log(countInversions(arr3));

let arr4 = [8,4,2,1];
console.log(countInversions(arr4));
console.log(countInversions(arr4));