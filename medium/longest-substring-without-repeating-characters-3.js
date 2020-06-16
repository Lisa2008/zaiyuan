/**
Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 
Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
			 
*/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if(typeof s === 'undefined' || !s) return 0;
  if(s.length <= 1) return s.length;
  
  let maxlen = 0;
  let as = s.split('');
  
  let temp = [];
  let index = 0;
  
  while(as.length > 1){
    temp.push(as.shift());
    
    for(let c of as){
      if(temp.indexOf(c) !== -1) break;
      temp.push(c);
    }
  
    maxlen = maxlen > temp.length ? maxlen : temp.length;
    index++;
    temp = [];
  }
  
  return maxlen;
};

//console.log(lengthOfLongestSubstring('abcabcbb')); // 3
//console.log(lengthOfLongestSubstring('bbbbb')); // 1
//console.log(lengthOfLongestSubstring('pwwkew')); // 3
console.log(lengthOfLongestSubstring(' ')); // 3