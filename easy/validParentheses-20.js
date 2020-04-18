/*Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let comp = {'{': '}',
             '[': ']',
             '(': ')'};
    
    let a = [];
    
    for(let i = 0; i < s.length; i++){
        for(const k in comp){
            if(k === s[i]){
                a.push(s[i]);
            }
                
            if(s[i] === comp[k] && a.length == 0) return false;
            if(a.length > 0 && (s[i] === comp[k] && a[a.length - 1] !== k)){
                return false
            }
            if(a.length > 0 && (s[i] === comp[k] && a[a.length - 1] === k)){
                a.pop();
            }
        }
    }
    
    if(a.length == 0) return true;
    else return false;
};