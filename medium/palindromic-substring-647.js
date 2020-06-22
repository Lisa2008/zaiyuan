/**
Given a string, your task is to count how many palindromic substrings in this string.

The substrings with different start indexes or end indexes are counted as different substrings even they consist of same characters.

Example 1:

Input: "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
 

Example 2:

Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

*/

/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  if(s.length === 0) return 0;
  if(s.length === 1) return 1;
  
  let count = s.length;
  
  let left = 0;
  let right = s.length -1;
  
  let sub;
  
  while ( left < s.length - 1){
    sub = s.substring(left, right + 1);
    if(isPalindrome(sub)){
      //console.log(left + " " + right);
      count++;
    }
    
    right--;
    
    if(right === left  ){
      left++;
      right = s.length - 1;
    }
    
  }
         
  return count;  
};


var isPalindrome = function(s) {
  if(s.length <= 1) return true;
  
  let left = 0;
  let right = s.length -1;
  
  while(left < Math.floor(s.length / 2)){
    if(s.charAt(left) === s.charAt(right)){
      left++;
      right--;
    } else {
      return false;
    }
  }
              
  return true;
};

//console.log(countSubstrings('abc')); // 3
//console.log(countSubstrings('aaa')); // 6
console.log(countSubstrings('aaaaa')); //15