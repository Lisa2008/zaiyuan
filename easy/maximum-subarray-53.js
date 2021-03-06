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
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if(nums.length === 0 ) return 0;
    if(nums.length === 1) return nums[0];
    
    let max = -Infinity;
    let temp;
    for(let i = 0; i < nums.length; i++){
        if(nums[i] > max) max = nums[i];
        temp = nums[i];
        for(let j = i + 1; j < nums.length; j++){
            temp = temp + nums[j];
            if(temp > max) max = temp;
        }
    }
    
    return max;
};