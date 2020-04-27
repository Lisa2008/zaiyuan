/*
Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

Example 1:

Input: [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  
  let ret = nums[0];
 
  let i = 0;
  let base;
  do{
     base = nums.shift();
    if(base > ret) ret = base;
    ret = sfun(nums, base, ret);
  } while(nums.length > 0)
   
  
  return ret;
    
};

function sfun(array, base, ret){
  //console.log("array: " + array + " base: " + base + " ret: " + ret);
  if(array.length === 0) return ret;
  
  for(let i = 0; i < array.length; i++){
    base = base * array[i];
    if(base > ret){
      ret = base;
    }
  }
  return ret;
}
  