function reverseShuffleMerge(s) {
  if(!s || s.length === 0) return '';
  
  let len = s.length;
  let map = new Map();
  let count;
  [...s].forEach(c => {
    count = map.get(c) || 0;
    map.set(c, count + 1);
  });
//  console.log(map);
  s = reverseString(s);
  
  let keya = createArray(map).sort();
  
  let ret = '';
  return ckeckC(s, keya, ret);
}

function reverseString(s){
  return [...s].reverse().join('');
}

function createArray(m){
  let ret = [];
  m.forEach((value, key) => {
    for(let i = 0; i < (value / 2); i++){
      ret.push(key);
    }
  });
  
  return ret;
}

function ckeckC(str, arr, ret){
  let tempa;
  let curc;
  let ret1 = ret;
  let index;
  
  /*console.log('str ' + str);
  console.log(arr);
  console.log('ret ' + ret);*/
  
  for(let i = 0; i <  arr.length; i++){
 // let i = 0;
    tempa = [...arr];
    curc = tempa.splice(i,1)[0];
    ret1 = ret;
    index = findC(str, curc, str.length - arr.length);
    if(index === -1) continue;
  //if(index === -1) return null
    else{
      ret1 += curc;
      if(tempa.length === 0) return ret1;
      else{
        let newstr = str.slice(index + 1);
        let what = ckeckC(newstr, tempa, ret1);
       // return what;
        if(what === null) continue;
        else return what;
      }
   }
  }
   return null; 
}

function findC(str, c, ref){
  let index = str.indexOf(c);
  if(index === -1 || index > ref) return -1;
  else return index;
}

//console.log(reverseShuffleMerge('abcabc')); // acb
//console.log(reverseShuffleMerge('eggegg')); // egg
//console.log(reverseShuffleMerge('abcdefgabcdefg')); //agfedcb
console.log(reverseShuffleMerge('bdabaceadaedaaaeaecdeadababdbeaeeacacaba')); //aaaaaabaaceededecbdb

  