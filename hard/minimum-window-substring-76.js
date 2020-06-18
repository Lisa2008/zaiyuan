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
var minWindow = function(s, t) {
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

console.log(minWindow('ADOBECODEBANC', 'ABC'));