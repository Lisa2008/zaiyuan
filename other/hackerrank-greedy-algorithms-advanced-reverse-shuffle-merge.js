function reverseShuffleMerge(s) {
  if(!s || s.length === 0) return '';
  
  let len = s.length;
  let map = new Map();
  let count;
  [...s].forEach(c => {
    count = map.get(c) || 0;
    map.set(c, count + 1);
  });
  //console.log(map);
  s = reverseString(s);
  //console.log(s);
  
  let c;
  let suposLen = len / 2;
  let ret = [];
  
  let mapUsable = new Map(map);
  let mapCur = new Map();
  let usableCount;
  let instrCount;
  let j;
  //len = 45;
  for(let i = 0; i < len; i++){
    c = s.charAt(i);
    usableCount = mapUsable.get(c);
    instrCount = mapCur.get(c) || 0;
    if(instrCount === (map.get(c) / 2)){
      mapUsable.set(c, usableCount - 1);
      continue;
    }
    
    if(ret.length === 0) {
      ret.push(c);
      mapCur.set(c, 1);
    }
    else{
      j = ret.length -1;
      while(j >= 0){
        if((mapUsable.get(ret[j]) + mapCur.get(ret[j])) <= (map.get(ret[j]) / 2)) break;
        if(c < ret[j]){
          removeElement(ret, j, mapCur);                    
        }
        j--;
      }
      if(ret.length < len / 2 && (instrCount < (map.get(c) / 2)) ){
        ret.push(c);
        mapCur.set(c, instrCount + 1);
      }
      //console.log(ret);

    }
    mapUsable.set(c, usableCount - 1);
  }
  return ret.join('');
}


function removeElement(arr, index, map){
  let temp;
  for(let i = arr.length - 1; i >= index; i--){
    temp = map.get(arr[i]);
    map.set(arr[i], temp - 1);
    arr.pop();
  }
}



function reverseString(s){
  return [...s].reverse().join('');
}


//console.log(reverseShuffleMerge('abcabc')); // acb
//console.log(reverseShuffleMerge('eggegg')); // egg
//console.log(reverseShuffleMerge('abcdefgabcdefg')); //agfedcb
console.log(reverseShuffleMerge('bdabaceadaedaaaeaecdeadababdbeaeeacacaba')); //aaaaaabaaceededecbdb

let str1 = 'djjcddjggbiigjhfghehhbgdigjicafgjcehhfgifadihiajgciagicdahcbajjbhifjiaajigdgdfhdiijjgaiejgegbbiigida';

//console.log(reverseShuffleMerge(str1)); //aaaaabccigicgjihidfiejfijgidgbhhehgfhjgiibggjddjjd

  