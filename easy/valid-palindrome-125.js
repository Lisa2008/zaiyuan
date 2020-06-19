/**
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

Note: For the purpose of this problem, we define empty string as valid palindrome.

Example 1:

Input: "A man, a plan, a canal: Panama"
Output: true
Example 2:

Input: "race a car"
Output: false
**/

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  if(s.length <= 1) return true;
  
  s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
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

//console.log(isPalindrome("A man, a plan, a canal: Panama"));
//console.log(isPalindrome("race a car"));