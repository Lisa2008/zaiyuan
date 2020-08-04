function reverseShuffleMerge(s) {
  if(!s || s.length === 0) return '';
  
  let len = s.length;
  let map = new Map();
  let count;
  [...s].forEach(c => {
    count = map.get(c) || 0;
    map.set(c, count + 1);
  });
  
  s = reverseString(s);
  //console.log(s);
  
  let ret = [];
  let suposLen = len/2;
  
  let newMap = new Map();
  let c;
  let tempArr;
  let index;
  for(let i = 0; i < len; i++){
    c = s.charAt(i);
    
    if(ret.length < suposLen){
      count = newMap.get(c) || 0;
      if(count < (map.get(c) / 2)){
        ret.push(c);
        newMap.set(c, count + 1);
      }else{
        ret = replaceC1(newMap.get(c), ret, c);
      }
    }else{
      ret = replaceC1(newMap.get(c), ret, c);
    }
    //console.log(ret.join(''));
  }
  
  return ret.join('');
   
}

function replaceC1(countC, minArr, c){
  let index = 1;
  let tempArr;
  
  while(index <= countC){
    tempArr = [...minArr];
    tempArr = replaceC(tempArr, c, index);
    if(tempArr < minArr) {
      return tempArr;
    }else{
      index++;
    }
  }
  return minArr;
}

function reverseString(s){
  return [...s].reverse().join('');
}

function replaceC(arr, c, count){
  let len = arr.length;
  let i;
  let index = 1;
  for(i = 0; i < len; i++){
    if(arr[i] === c){
      if(index === count) break;
      else index++;
    }
  }
  arr.splice(i,1);
  arr.push(c);
  
  return arr;
}

//console.log(reverseShuffleMerge('abcabc')); // acb
//console.log(reverseShuffleMerge('eggegg')); // egg
//console.log(reverseShuffleMerge('abcdefgabcdefg')); //agfedcb
//console.log(reverseShuffleMerge('bdabaceadaedaaaeaecdeadababdbeaeeacacaba')); //aaaaaabaaceededecbdb

let str1 = 'djjcddjggbiigjhfghehhbgdigjicafgjcehhfgifadihiajgciagicdahcbajjbhifjiaajigdgdfhdiijjgaiejgegbbiigida';

console.log(reverseShuffleMerge(str1)); //aaaaabccigicgjihidfiejfijgidgbhhehgfhjgiibggjddjjd