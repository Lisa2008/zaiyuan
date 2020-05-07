/*
Given two strings text1 and text2, return the length of their longest common subsequence.

A subsequence of a string is a new string generated from the original string with some characters(can be none) deleted without changing the relative order of the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not). A common subsequence of two strings is a subsequence that is common to both strings.

 

If there is no common subsequence, return 0.

 

Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 

Constraints:

1 <= text1.length <= 1000
1 <= text2.length <= 1000
The input strings consist of lowercase English characters only.

*/

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
   let len1 = text1.length;
  let len2 = text2.length;
  
  let dp = new Array(Math.min(len1, len2) + 1).fill(0);
  
  let c1 = text1;
  let c2 = text2;
  
  if(len1 < len2){
    c1 = text2;
    c2 = text1;
  }
  
  //console.log(`c1: ${c1} , c2: ${c2}`);
  let pre = [];
  
  for(let i = 0; i < c1.length; i++){
    //console.log(dp);
    //console.log(c1.charAt(i));
    pre = [...dp];
    for(let j = 0; j < c2.length; j++){
      if(c1.charAt(i) === c2.charAt(j)) dp[j + 1] = pre[j] + 1;
      else{
        dp[j + 1] = Math.max(dp[j], dp[j+1]);
      }
    }
  }
  
  return Math.max(...dp);
};

// examples
console.log(longestCommonSubsequence("abcde","ace"));//expect 3
console.log(longestCommonSubsequence("abc","def"));//expect 0
console.log(longestCommonSubsequence("nematode","knowledge"));//expect 4
console.log(longestCommonSubsequence("oxcpqrsvwf","shmtulqrypy"));//expect 2
console.log(longestCommonSubsequence("yzebsbuxmtcfmtodclszgh","ejevmhcvshclydqrulwbyha"));//expect 6
console.log(longestCommonSubsequence("bsbininm","jmjkbkjkv")); //expect 1
console.log(longestCommonSubsequence("pmjghexybyrgzczy","hafcdqbgncrcbihkd")); //expect 4
