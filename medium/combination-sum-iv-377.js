/*
Given an integer array with all positive numbers and no duplicates, find the number of possible combinations that add up to a positive integer target.

Example:

nums = [1, 2, 3]
target = 4

The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)

Note that different sequences are counted as different combinations.

Therefore the output is 7.
 

Follow up:
What if negative numbers are allowed in the given array?
How does it change the problem?
What limitation we need to add to the question to allow negative numbers?

Credits:
Special thanks to @pbrother for adding this problem and creating all test cases.

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {
    if(target === 0 || nums.length === 0) return 0;
    
    let dp = new Array(target +1).fill(0);
    
    for(let i = 1; i <= target; i++){
        for(let j = 0; j < nums.length; j++){
            if(nums[j] === i) dp[i]++;
            else if(i > nums[j]){
                dp[i] += dp[i - nums[j]];
            }
        }
    }
    
    return dp[target];
};