/**
Given a string s that consists of only uppercase English letters, you can perform at most k operations on that string.

In one operation, you can choose any character of the string and change it to any other uppercase English character.

Find the length of the longest sub-string containing all repeating letters you can get after performing the above operations.

Note:
Both the string's length and k will not exceed 104.

Example 1:

Input:
s = "ABAB", k = 2

Output:
4

Explanation:
Replace the two 'A's with two 'B's or vice versa.
 

Example 2:

Input:
s = "AABABBA", k = 1

Output:
4

Explanation:
Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
 **/
 
 /**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  if(s.length <= 1) return s.length;
  
  let sa = s.split('');
  let maxlen = 0;
  let len;
  let a;
  let tk;
  
  for(let i = 0; i < sa.length; i++){
    a = sa[i];
    len = 1;
    tk = k;
    
    for(let j = (i + 1); j < sa.length; j++){
      if(sa[j] !== a && tk > 0){
        tk--;
        len++;
        continue;
      }
      if(sa[j] === a) {
        len++;
        continue;
      }
      
      if(sa[j] !== a && tk === 0) break;
    }
    
    if(tk === 0) {
      maxlen = maxlen > len ? maxlen : len;
      if(maxlen === sa.length) break;
    }
    
    else{
      for(let j = (i - 1); j >= 0; j--){
        if(sa[j] !== a && tk > 0){
          tk--;
          len++;
          continue;
        }
        if(sa[j] === a) {
          len++;
          continue;
        }

        if(sa[j] !== a && tk === 0) break;
      }
      maxlen = maxlen > len ? maxlen : len;
      if(maxlen === sa.length) break;
    }
  }
    
  return maxlen;
  
};

//console.log(characterReplacement('ABAB',2)); // 4
console.log(characterReplacement('AABABBA',1)); // 4
//console.log(characterReplacement('ABBB',2)); // 4