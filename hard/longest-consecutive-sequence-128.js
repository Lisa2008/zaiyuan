/**
Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

Your algorithm should run in O(n) complexity.

Example:

Input: [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

**/

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  if(nums === null || nums.length === 0) return 0;
  else if (nums.length === 1) return 1;
  
  nums = nums.sort((a, b) => a - b);

  let con = 1;
  let maxc = con;
  for(let i = 1; i < nums.length; i++){
    if(nums[i] === nums[i -1]) continue;
    if(nums[i] - nums[i-1] === 1) {
      con++;
      continue;
    }
    
    maxc = Math.max(maxc, con);
    con = 1;
  }
  
  maxc = Math.max(maxc, con);
  
  return maxc;
};


//console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));
//console.log(longestConsecutive([0, -1]));
console.log(longestConsecutive([1,2,0,1]));