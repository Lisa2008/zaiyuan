/**
Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
 

Constraints:

1 <= nums.length <= 3 * 10^4
0 <= nums[i][j] <= 10^5

**/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  if(nums[0] === 0 && nums.length === 1) return true;
  if(nums[0] === 0) return false;
  
  let dp = new Array(nums.length).fill(0);
  
  dp[0] = 1;
  
  for(let i = 0; i < nums.length - 1; i++){
    if(dp[i] === 0) break;
    for(let j = 1; j <= nums[i]; j++){
      dp[i + j] += 1;
    }
    
  }

  return dp[nums.length -1] > 0 ? true: false;
};

//console.log(canJump([2,3,1,1,4])); //true
//console.log(canJump([3,2,1,0,4])); //false
//console.log(canJump([0,2,3])); //false
console.log(canJump([1,0,1,0])); //false