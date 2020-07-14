/**
There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of non-empty words from the dictionary, where words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.
Example 1:
Given the following words in dictionary,
[
  "wrt",
  "wrf",
  "er",
  "ett",
  "rftt"
]
The correct order is: "wertf".
Example 2:
Given the following words in dictionary,
[
  "z",
  "x"
]
The correct order is: "zx".
Example 3:
Given the following words in dictionary,
[
  "z",
  "x",
  "z"
]
The order is invalid, so return "".
Note:
You may assume all letters are in lowercase.
You may assume that if a is a prefix of b, then a must appear before b in the given dictionary.
If the order is invalid, return an empty string.
There may be multiple valid order of letters, return any one of them is fine.
*/

function alienOrder(words){
  if(words.lenght === 0) return '';
  
  let map = new Map();
  
  for(let word of words){
    for(let c of word){
      if(!map.get(c)){
        map.set(c, {degree: 0, set: []});
      }
    }
  }
  
  let cur;
  let next;
  let len;
  let c1, c2;
  let obj;
  for(let i = 0; i < words.length -1; i++){
    cur = words[i];
    next = words[i + 1];
    
    len = Math.min(cur.length, next.length);
    for(let j = 0; j < len; j++){
      c1 = cur.charAt(j);
      c2 = next.charAt(j);
      if(c1 !== c2){
        obj = map.get(c1);
        obj.set.push(c2);
        map.set(c1, obj);
        
        obj = map.get(c2);
        obj.degree++;
        map.set(c2, obj);
        
        break;
      }
    }
  }
  
  //console.log(map);
  
  let ret = '';
  let keys = Array.from(map.keys());
  ret = ret + keys[0];
  
  let curkey = keys[0];
  while(map.size > 0){
    obj = map.get(curkey);
    if(obj.set.length === 0) break;
    /*console.log(ret);
    console.log(obj);*/
    for(let cc of obj.set){
      if(ret.indexOf(cc) !== -1) return '';
      ret = ret + cc;
      map.delete(curkey);
      curkey = cc;
    }
  }
  
  return ret;
  
}

let ws = [
  "wrt",
  "wrf",
  "er",
  "ett",
  "rftt"
];

//console.log(alienOrder(ws));

//console.log(alienOrder(['z', 'x']));

//console.log(alienOrder(['z', 'x', 'z']));

console.log(alienOrder(["za","zb","ca","cb"]));

