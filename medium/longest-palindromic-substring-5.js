/**
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Example 1:

Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
Example 2:

Input: "cbbd"
Output: "bb"

*/

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if(s.length <= 1) return s;
  
  //s = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  
  let left = 0;
  let right = s.length -1;
  
  let sub;
  let ret = '';
  
  while ( left < s.length - 1){
    sub = s.substring(left, right + 1);
    if(isPalindrome(sub) && ((right + 1 - left) > ret.length)){
      ret = sub;
      if(ret.length === s.length) return ret;
    }
    
    right--;
    
    if(right === 0 || (right + 1 - left) < ret.length){
      left++;
      right = s.length - 1;
    }
    
  }
  if(ret.length === 0) ret = s.charAt(0);
         
  return ret;  
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

//console.log(longestPalindrome('babad'));
//console.log(longestPalindrome('cbbd'));
//console.log(longestPalindrome('ccc'));
console.log(longestPalindrome('ccd'));
