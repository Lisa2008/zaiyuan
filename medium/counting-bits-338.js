/*
Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.

Example 1:

Input: 2
Output: [0,1,1]
Example 2:

Input: 5
Output: [0,1,1,2,1,2]
Follow up:

It is very easy to come up with a solution with run time O(n*sizeof(integer)). But can you do it in linear time O(n) /possibly in a single pass?
Space complexity should be O(n).
Can you do it like a boss? Do it without using any builtin function like __builtin_popcount in c++ or in any other language.
*/
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
    let ret = [0];
    if(num === 0) return ret;
    
    let cur = 0;
    let a, b;
    let index;
    for(let i = 1 ; i <= num; i++){
        if((i & (i - 1)) === 0) {
            cur = 1;
        }else{
          a = i - 1;
          if( (a & 1) === 0) {
              cur++;
          }else{
              b = 1 << 1;
            while((a & b) !== 0){
              cur--;
              b = b << 1;
            }
          }
        }
        ret.push(cur);      
    }
    
    return ret;
};
