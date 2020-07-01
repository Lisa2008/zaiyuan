/*Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants. The tree s could also be considered as a subtree of itself.

Example 1:
Given tree s:

     3
    / \
   4   5
  / \
 1   2
Given tree t:
   4 
  / \
 1   2
Return true, because t has the same structure and node values with a subtree of s.
 

Example 2:
Given tree s:

     3
    / \
   4   5
  / \
 1   2
    /
   0
Given tree t:
   4
  / \
 1   2
Return false.

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function(s, t) {
  if(!s && !t) return true;
  if((!s && t) || (s && !t)) return false;
  
  return compareNode(s,t, false);
};

function compareNode(n1,n2, b){
  if(!n1 && !n2) return true;
  if((!n1 && n2) || (n1 && !n2)) return false;
  
  if(n1.val === n2.val){
    if (compareNode(n1.left, n2.left, true) && compareNode(n1.right, n2.right, true)) return true;  
  }
  
  if(b) return false;
  
  if(!compareNode(n1.left, n2, false)){
    return compareNode(n1.right, n2);
  }else return true;
}

let t1 = {val: 3, 
          left: { val: 4, 
                 left: { val: 1, left: null, right: null}, 
                 right: {val: 2, 
                         left: {val: 0, left: null, right: null},
                         right: null}},
          right: { val: 5, left: null, right: null}};

let t2 = {val: 4,
          left: {val: 1, left: null, right: null},
          right: {val: 2, left: null, right: null}};


let t3 = {val: 3, 
          left: { val: 4, 
                 left: { val: 1, left: null, right: null}, 
                 right: {val: 2, left: null, right: null}},
          right: { val: 5, left: null, right: null}};

let t4 = {val: 1,
          left: {val: 1,left: null, right: null},
          right: null};

let t5 = {val: 1, left: null, right: null};

let t6 = {val: 3, 
          left: {val: 4, 
                 left: {val: 1, left: null, right: null},
                 right: null},
          right: {val: 5,
                  left: {val: 2, left: null, right: null},
                  right: null}};

let t7 = {val: 3,
          left: {val: 1, left: null, right: null},
          right: {val: 2, left: null, right: null}};

let t8 = {val: 4,
          left: {val: 1,
                 left: {val: 1,
                        left: {val: 6, left: null, right: null},
                        right: {val: 7, left: null, right: null}},
                 right: null},
          right: null};

let t9 = {val: 4,
          left: {val: 1,
                 left: {val: 6, left: null, right: null},
                 right: {val: 7, left: null, right: null}},
          right: null};
                 

//console.log(isSubtree(t1,t2)); //false
//console.log(isSubtree(t3,t2)); //true
//console.log(isSubtree(t4,t5)); //true
//console.log(isSubtree(t6,t7)); //false
console.log(isSubtree(t8,t9)); //false
                  