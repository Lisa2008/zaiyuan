/**
Given an array of strings, group anagrams together.

Example:

Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
Note:

All inputs will be in lowercase.
The order of your output does not matter.
*/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  if(strs.length <= 1) return [strs];
  
  let base = strs.shift();
  let map = new Map().set(base,[base]);
  let temp = [];
  let find = false;
  
  for(let s of strs){
    find = false;
    for(let key of map.keys()){
      if(isAnagram(key,s)){
        temp = map.get(key);
        temp.push(s);
        map.set(key, temp);
        find = true;
        break;
      }
    }
    if(!find) map.set(s, [s]);
  }
  
  let ret = Array.from(map.values());
  
  return ret;
};

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