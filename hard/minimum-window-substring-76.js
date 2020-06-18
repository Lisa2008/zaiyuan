/**
Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

Example:

Input: S = "ADOBECODEBANC", T = "ABC"
Output: "BANC"
Note:

If there is no such window in S that covers all characters in T, return the empty string "".
If there is such window, you are guaranteed that there will always be only one unique minimum window in S.
**/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
/*var minWindow = function(s, t) {
    if(!s || !t) return '';
  if(s.length === 0 || t.length === 0) return '';
  
  let win = '';
  let miniwin = '';
  
  let ts = t;
  
  let index = 0;
  let rego;
  let tc;

  let tindex = null;
  
  while(index < s.length){
    for(let i = index; i < s.length; i++){
      tc = s.charAt(i);
      if(ts.indexOf(tc) == -1) {
        if(win.length === 0) {
          tindex = i;
          continue;
        }
        else win = win + tc;
      }

      else {
        win = win + tc;
        rego = new RegExp(tc);
        ts = ts.replace(rego, '');
        if(ts.length === 0) break;
      }
    }

    if(win.length === 0 || ts.length > 0 ) break;

    if(miniwin.length === 0 || miniwin.length > win.length){
      miniwin = win;
    }
    
    win = '';
    ts = t;
    
    index = (tindex && tindex >= index) ? tindex + 2: index + 1;
  }
  
  return miniwin;
};
*/

/**
Sliding window
*/

var minWindow = function(s, t) {
  if(!s || !t) return '';
  if(s.length === 0 || t.length === 0 || t.length > s.length) return ''
  if(s === t) return s;
  
  let tmap = new Map();
  
  for(let c of t){
    if(!tmap.has(c)) {
      tmap.set(c, 1);
    }else {
      tmap.set(c, tmap.get(c) + 1);
    }
  }
  
  let left = 0;
  let right = 0;
  
  let win = '';
  let char;
  let count = t.length;
  let temps
  
  while(right < s.length){
    char = s.charAt(right);
    if(tmap.has(char)){
      tmap.set(char, tmap.get(char) - 1);
      if(tmap.get(char) >= 0) count--;
      
      if(count === 0){
        
        while(count === 0){
          char = s.charAt(left);
          
          if(tmap.has(char)){
            tmap.set(char, tmap.get(char) + 1);
            if(tmap.get(char) > 0) count++;
            
            temps = s.substring(left, right + 1);
            if(!win) win = temps;
            else if(win.length > (right + 1 - left)) {
              win = temps;
            }
          }
          left++;
        }
      }
    }
    
    right++;
  }
  return win;
}

console.log(minWindow('ADOBECODEBANC', 'ABC'));