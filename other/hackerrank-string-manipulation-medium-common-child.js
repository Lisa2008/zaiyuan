function commonChild(s1, s2) {
  if(s1.length === 0 || s2.length === 0) return 0;
  
  let ret = 0;
  
  return compare(s1,s2,ret);
}

function compare(s1, s2, ret) {
  if(s1.length === 0 || s2.length === 0) return ret;
  
  let c1 = s1.charAt(s1.length - 1);
  let c2 = s2.charAt(s2.length -1);
  
  if(c1 === c2) {
    return compare(s1.slice(0, s1.length -1), s2.slice(0, s2.length -1), ret + 1);
  } else {
    return Math.max(compare(s1, s2.slice(0, s2.length -1), ret), compare(s1.slice(0, s1.length -1), s2, ret));  
  }
  
}

//console.log(commonChild('abcd', 'abdc'));//3
//console.log(commonChild('harry', 'sally'));//2
//console.log(commonChild('shinchan', 'noharaaa'));//3
console.log(commonChild('aggtab', 'gxtxayb'));//4