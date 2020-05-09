/*
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
             Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false

*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    s = s.toLowerCase();
    wordDict = wordDict.map(a => a.toLowerCase());
    
    let dp = new Array(s.length + 1).fill(s.length + 1);
    dp[0] = 0;
    let subs,len;
    
    for(let i = 1; i < dp.length; i++){
        for(let j = 0; j < wordDict.length; j++){
            if(i < wordDict[j].length) continue;
            len = wordDict[j].length;
            subs = s.substring(i - len, i);
            if(subs === wordDict[j]){
              dp[i] = Math.min(dp[i], (dp[i - len] + 1));
            }
        }
    }
  
  if(dp[s.length] < (s.length + 1)) return true;
  else return false;
};


console.log(wordBreak("leetcode", ["leet", "code"])); //true
console.log(wordBreak("applepenapple", ["apple", "pen"])); //true
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); //false
