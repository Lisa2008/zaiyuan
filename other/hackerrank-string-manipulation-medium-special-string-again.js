function substrCount(n, s) {
  let arr = [];
  
  let count = 0;
  
  let conSum = 1;
  let cur = s.charAt(0);
  let feq = [];
  
  let len = s.length;
  let c;
  for(let i = 1; i < len; i++){
    c = s.charAt(i);
    if(cur === c) conSum++;
    else{
       count += conSum * (conSum + 1) / 2;
       feq.push({c: cur, feq: conSum});
       cur = c;
       conSum = 1;
    }
  }
  
  count += conSum * (conSum + 1) / 2;
  feq.push({c: cur, feq: conSum});
  
  len = feq.length;
  for(let i = 1; i < len - 1; i++){
    if(feq[i].feq === 1 && (feq[i -1].c === feq[i+1].c)){
      count += Math.min(feq[i - 1].feq, feq[i + 1].feq);
    }
  }
  
  return count;

}

//console.log(substrCount(5, 'asasd')); //7
//console.log(substrCount(7, 'abcbaba')); //10
console.log(substrCount(4, 'aaaa')); //10
console.log(substrCount(5, 'aabaa'));