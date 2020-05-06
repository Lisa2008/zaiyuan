/*
dynamic programming
Serling sells saws, different length, with different price, given a length, get the maximum profit(price), considering
the price/length is consecutive, for example:
length 1, price 1
length 2, price 5
length 3, price 8
so for length 4, the max price is 10

for given the price form 1 to 10
[1,5,8,9,10,17,17,20,24,30]

give the maximum price of a length 
*/
function serling(price, len){
  let dp = new Array(len + 1).fill(-1);
  dp[0] = 0;
  dp[1] = price[0];
  
  
  for(let i = 2; i <= len; i++){
    if(i < price.length){
      dp[i] = price[i -1];
      console.log(`i: ${i} , dp[i]: ${dp[i]}`);
    }
    
    
    for(let j = 1; j < i; j++){
      dp[i] = Math.max(dp[i], (dp[i - j] + dp[j]));
      //console.log(`i: ${i} , j: ${j} , dp[i]: ${dp[i]}`);
    }
  }
  
  return dp[len];
  
}

console.log(serling([1,5,8,9,10,17,17,20,24,30], 15));