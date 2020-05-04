/*
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Note:

The solution set must not contain duplicate triplets.

Example:

Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]
*/

/////Exceed time limit
var threeSum = function(nums) {
if(nums.length < 3) return [];
    if(nums.length == 3){
        if((nums[0] + nums[1] + nums[2]) === 0) return [nums];
        else return [];
    }
    
    let dp = {};
    let b, c;
  
    let dupn = [...nums];
    let dupn1;
    let sum;
    let ret = [];
    let tempa = [];
    let k;
    
    do{
        b = dupn.shift();
        dupn1 = [...dupn];
      
        for(let i = 0; i < dupn.length; i++){
          c = dupn1.shift();
          sum = b + c;
          for(let j = 0; j < dupn1.length; j++){
            if((sum + dupn1[j]) === 0){
              //console.log("b: " + b + " c: " + c + " dupn1[j]: " + dupn1[j]);
              tempa = [b, c, dupn1[j]].sort((a,b) => a - b);
              for(k = 0; k < ret.length; k++){
                if(tempa[0] === ret[k][0] && tempa[1] === ret[k][1]) break;
              }
              if(k === ret.length) ret.push(tempa);
            }
          }
        }
    }while(dupn.length > 0);
  
    return ret;
};


//Accepted solution, from zaridias
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let len = nums.length;
  if(len < 3) return [];
  if(len == 3){
        if((nums[0] + nums[1] + nums[2]) === 0) return [nums];
        else return [];
  }
  
  nums = nums.sort((a, b) => a - b);
  let rets = new Set();
  let root;
  let left;
  let j,k;
  let temp;
  
  
  for(let i = 0; i < (len - 2); i ++){
    if(nums[i] > 0) break;;
    
    root = nums[i];
    left = 0 - root;
    
    if((i - 1) >= 0) {
      if(nums[i -1] === nums[i]) continue;
    }
    
    let j = i + 1;
    let k = len - 1;
    
    while( j < k){
      temp = nums[j] + nums[k];
      if(temp === left){
        rets.add(`${root},${nums[j]},${nums[k]}`);
      }
      
      if(temp >= left){
        k--;
      }else j++;
    }
    
  }
  
  return Array.from(rets).map(v => v.split(',').map(Number));;
};
