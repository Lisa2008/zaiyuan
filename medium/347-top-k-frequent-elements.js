/**
Given a non-empty array of integers, return the k most frequent elements.

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
Note:

You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
It's guaranteed that the answer is unique, in other words the set of the top k frequent elements is unique.
You can return the answer in any order.

*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  nums = nums.sort((a,b) => a -b);
  
  let ret = [];
  let cur = nums[0]
  let count = 1;
  
  for(let i = 1; i < nums.length; i++){
      if(nums[i] === cur) count++;
    else{
      ret.push({val: cur, count: count});
      cur = nums[i];
      count = 1;
    }
  }
  ret.push({val: cur, count: count});
  
  ret = ret.sort((a, b) => b.count - a.count);
  
  return ret.map((e, index) => {
    if(index < k) return e.val;
    return null;
  }).filter(e=> (e !== undefined && e !== null));
  
};

//console.log(topKFrequent([1,1,1,2,2,3], 2));
//console.log(topKFrequent([1], 1));
console.log(topKFrequent([3,0,1,0], 1));
