/*
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Follow up:

If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

*/


/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
let coinChange = function(coins, amount) {
    coins.sort((a,b) => b - a);
  
  let count = Infinity;
  if (amount === 0) return 0;
  let base = 0;
  
  count = subf(coins, amount, base, count);
  
  return count === Infinity? -1: count;
};

function subf(array, num, base, count){
   if(array.length === 0) return count;
  
  let ta = [];
  let coin;
  let mod, division;
  let cur = num;
  
 // console.log("array " + array  + " num: " + num + " base: " + base + " count: " + count);
  
  for(let i = 0; i < array.length; i++){
	  if(array[i] > num) continue;
    mod = num % array[i];
    
    if(mod === 0) {
      division = Math.floor(num / array[i]);
      count = Math.min(count, (base + division));
    }
  }
  
  for(let i = 0; i < array.length; i++){
    ta = [...array];
    coin = ta.splice(i, 1)[0];

    mod = num % coin;
    division = Math.floor(num / coin);
    if(mod === 0) continue;
    
    /*if(mod === 0) {
      cur = num;
      count = subf(ta, cur, base, count);
    }*/
    //else {
      //
      if((base + division) > count) continue;
    else {
      
      cur = mod;
      
      count = subf(ta, cur, (base + division) , count);
    }
      //
      if(division > 1) {
        if((base + division - 1) > count) continue;
        cur = coin + mod;
        count = subf(ta, cur, base + (division - 1), count);
      }

    //}
    
  }
  return count;
}

/*
Wrong about [186, 419,83,408] 6249
*/

/*Dynamic Programming solution */
coins.sort((a, b) => a - b);
    
    let dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    
    for(let i = 0; i < dp.length; i++){
        for(let j = 0; j < coins.length; j++){
            if(coins[j] <= i) {
                dp[i] = Math.min(dp[i], (dp[i - coins[j]] + 1));    
            }
            else break;
        }
    }
    
    return (dp[amount] > amount )? -1: dp[amount];



