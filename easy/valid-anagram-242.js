/**
Given two strings s and t , write a function to determine if t is an anagram of s.

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
Note:
You may assume the string contains only lowercase alphabets.

Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case?
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false;
  
  let tmap = new Map();
  let char;
  
  for(let i = 0; i < t.length; i++){
    char = t.charAt(i);
    if(!tmap.has(char)){
      tmap.set(char, 1);
    }else {
      tmap.set(char, tmap.get(char) + 1);
    }
  }
  
  let count;
  for(let i = 0; i < s.length; i++){
    char = s.charAt(i);
    if(!tmap.has(char)) return false;
    
    count = tmap.get(char) - 1;
    if(count < 0) return false;
    else tmap.set(char, count);
  }
  
  return true;
};
