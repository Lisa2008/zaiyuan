/*
Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

Example:

Input:  [1,2,3,4]
Output: [24,12,8,6]
Constraint: It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.

Note: Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    if(nums.length === 0 || nums.length === 1) return nums;
    
    let newa = fillArray(1, nums.length);
    for(let i = 0; i < nums.length; i++){
        for(let j = 0; j < nums.length; j++){
            if(j === i) continue;
            newa[j] = newa[j] * nums[i];
        }
    }
    
    return newa;
};

function fillArray(value,len){
    if(len === 0) return [];
    let a = [value];
    while(a.length * 2 <= len) a = a.concat(a);
    if(a.length < len) {
        a = a.concat(a.slice(0, (len - a.length)));
    }
    
    return a;
}