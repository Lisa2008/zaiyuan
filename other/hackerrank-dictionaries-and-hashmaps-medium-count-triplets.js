function countTriplets(arr, r) {
  if(!arr || arr.length === 0) return 0;
  
  let count = 0;
  let len = arr.length;
  
  let lvl1 = new Map();
  let lvl2 = new Map();
  let num, num1;
  
  for(let i = 0; i < len; i++) {
    if(i > 1){
      num = lvl2.get(arr[i]/r) || 0;
      if(num > 0){
        count += num;
      }
    }
    
    if(i > 0) {
      num = lvl1.get(arr[i]/r) || 0;
      if(num > 0){
        num1 = lvl2.get(arr[i]) || 0;
        lvl2.set(arr[i], num1 + num);
      }
    }
    
    num = lvl1.get(arr[i]) || 0;
    lvl1.set(arr[i], num + 1);
    
  }
    
  return count;
}

//console.log(countTriplets([1,2,2,4], 2));// 2
//console.log(countTriplets([1, 3, 9, 9, 27, 81], 3));// 6
//console.log(countTriplets([1, 5, 5, 25, 125], 5));// 4
let arr1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
console.log(countTriplets(arr1, 1)); //161700





