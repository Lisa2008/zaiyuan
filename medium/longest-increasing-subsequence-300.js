/*
Given an unsorted array of integers, find the length of longest increasing subsequence.

Example:

Input: [10,9,2,5,3,7,101,18]
Output: 4 
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4. 
Note:

There may be more than one LIS combination, it is only necessary for you to return the length.
Your algorithm should run in O(n2) complexity.
Follow up: Could you improve it to O(n log n) time complexity?
*/

/** Original solution */

var lengthOfLIS = function(nums) {
  if(nums.length === 0) return 0;
  
  let dp = new Array(nums.length + 1);
  let dpindex = 1;
  dp[dpindex] = [nums[0]];
  
  for(let i = 1; i < nums.length; i++){
    //console.log(dp);    
    if(nums[i] > dp[dpindex][dp[dpindex].length -1]){
      dpindex ++;
      dp[dpindex] = dp[dpindex - 1].concat(nums[i]);
      continue;
    }
    for(let j = 1; j <= dpindex; j++){
      if(nums[i] === dp[j][dp[j].length -1]) {
        break;
      }
      if(nums[i] < dp[j][dp[j].length -1]){
        dp[j][dp[j].length -1] = nums[i];
        break;
      }
    }
  }
  
  return dpindex;
};

/** Optimized solution */

var lengthOfLIS = function(nums) {
  if(nums.length === 0) return 0;
  
  let dp = [];
  let dpindex = 1;
  dp[dpindex] = nums[0];
  
  for(let i = 1; i < nums.length; i++){
   // console.log(dp);    
    if(nums[i] > dp[dpindex]){
      dpindex ++;
      dp[dpindex] = nums[i];
      continue;
    }
    for(let j = 1; j <= dpindex; j++){
      if(nums[i] === dp[j]) {
        break;
      }
      if(nums[i] < dp[j]){
        dp[j] = nums[i];
        break;
      }
    }
  }
  
  return dpindex;
};