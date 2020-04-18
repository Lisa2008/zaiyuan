/*
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

var twoSum = function(nums, target) {
    let s;
  for(let i = 0; i < nums.length; i++){
    //if(nums[i] > target) continue;
    s = target - nums[i];
    for(let j = i + 1; j < nums.length; j++){
      if(nums[j] === s) return([i,j]);
    }
  }
};


console.log(twoSum([8,2,56,7], 9));
console.log(twoSum([0,4,3,0], 0));
console.log(twoSum([-1,-2,-3,-4,-5], -8));
