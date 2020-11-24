function commonChild(s1, s2) {
  if(s1.length === 0 || s2.length === 0) return 0;
  
  let bp2 = new Array(s1.length);
  
  for(let i = 0; i < bp2.length; i++){
    bp2[i] = new Array(s2.length).fill(0);
  }
  
  for(let i = 0; i < s1.length; i++) {
    for(let j = 0; j < s2.length; j++) {
      if(s1.charAt(i) === s2.charAt(j)) {
        if((i - 1) < 0 || (j - 1) < 0) bp2[i][j] = 1;
        else bp2[i][j] = bp2[i-1][j-1] + 1;
      }else {
        if((i - 1) >= 0 && (j - 1) >= 0) bp2[i][j] = Math.max(bp2[i-1][j], bp2[i][j-1]);
        else if((i - 1) < 0 && (j -1) >= 0) bp2[i][j] = bp2[i][j-1];
        else if((i - 1) >= 0 && (j - 1) < 0) bp2[i][j] = bp2[i-1][j];
      }
    }
  }
  return bp2[s1.length-1][s2.length-1];
  
}

//console.log(commonChild('abcd', 'abdc'));//3
//console.log(commonChild('harry', 'sally'));//2
//console.log(commonChild('shinchan', 'noharaaa'));//3
console.log(commonChild('aggtab', 'gxtxayb'));//4