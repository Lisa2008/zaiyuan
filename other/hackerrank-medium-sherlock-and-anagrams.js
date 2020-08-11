function sherlockAndAnagrams(s) {
  if(!s || s.length === 0) return 0;
  
  let len = s.length;
  
  //let windowLen = 1;
  let count = 0;
  
  let str1, str2;
  for(let windowLen = 1; windowLen < len; windowLen++){
  //let windowLen = 2;
    for(let i = 0; i < (len - windowLen); i++){
      for(let j = i + 1; j < (len - windowLen + 1); j++){
        str1 = s.slice(i, i + windowLen);
        str2 = s.slice(j, j + windowLen);
        if(compareStrings(str1, str2)){
          //console.log(str1, str2);
          count++;
        }
      }
    }
  }
  return count;
}

function compareStrings(str1, str2){

  let map = new Map();
  
  let count;
  for(let c of str1){
    count = map.get(c) || 0;
    map.set(c, count + 1);
  }
  
  for(let c of str2){
    count = map.get(c);
    if(!map.get(c)) return false;
    else {
      count = count - 1;
      if(count === 0) map.delete(c);
      else map.set(c, count);
    }
  }
  
  if(map.size === 0) return true;
  else return false;
  
}
