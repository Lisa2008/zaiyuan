/**
A message containing letters from A-Z is being encoded to numbers using the following mapping:

'A' -> 1
'B' -> 2
...
'Z' -> 26
Given a non-empty string containing only digits, determine the total number of ways to decode it.

Example 1:

Input: "12"
Output: 2
Explanation: It could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: "226"
Output: 3
Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
*/

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  if(s.length === 0) return 0;
  if(s.charAt(0) === '0') return 0;
  if(s.indexOf('00') != -1) return 0;
  
  let nums = s.split("");
  
  let dp = new Array(nums.length + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  
  for(let i = 2; i <= nums.length; i++){
    if(nums[i-1] === '0'){
      if(parseInt(nums[i-2]+nums[i-1]) > 26) return 0;
      if(i -2 === 0) dp[i] = 1;
      else dp[i] = dp[i -2];
      continue;
    }
    if(nums[i-2] === '0') {
      dp[i] = dp[i-1];
      continue;
    }
    
    if(parseInt(nums[i-2] + nums[i-1]) <= 26){
      if(i -2 === 0) dp[i] = dp[i-1] +1;
      else dp[i] = dp[i-1] + dp[i-2];
    }else dp[i] = dp[i-1];
    
    
    //dp[i] = parseInt(nums[i-2] + nums[i-1]) <= 26? dp[i-1] + dp[i-2] : dp[i-1];
    
  }

  return dp[nums.length];
};

//console.log(numDecodings("1226"));//5
//console.log(numDecodings("110"));//1
//console.log(numDecodings("10"));//1
//console.log(numDecodings("012"));//0
//console.log(numDecodings("1202201"));//1
//console.log(numDecodings("1001"));//0
console.log(numDecodings("12120"));//3