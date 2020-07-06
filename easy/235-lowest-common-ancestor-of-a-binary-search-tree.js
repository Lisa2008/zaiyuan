/**
Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Given binary search tree:  root = [6,2,8,0,4,7,9,null,null,3,5]


 

Example 1:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
Example 2:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
 

Constraints:

All of the nodes' values will be unique.
p and q are different and both values will exist in the BST.

**/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    let map = new Map();
  let pa = [];
  let qa = [];
  
  foo(root, null, map);
  
  for(let num of map.keys()){
    if(num === p) pa = map.get(num);
    if(num === q) qa = map.get(num);
    if(pa.length !== 0 && qa.length !== 0) break;
  }
  
  let cur;
  for(let i = 0; i < pa.length; i++){
    if(pa[i] === qa[i]){
      cur = pa[i];
    }
    else break;
  }
  return cur;
  
};

function foo(node, parent, map){
  let na;
  
  if(!parent) {
    na = [node.val];
  }else{
    na = [...map.get(parent.val)];
    na.push(node.val);
  }
  
  map.set(node.val, na);
  
  if(!node.left && !node.right) return;
  
  if(node.left) {
      foo(node.left, node, map);
  }
  
  if(node.right){ 
    foo(node.right, node, map);
  }
}

let t1 = {val: 6,
          left: {val: 2,
                 left: {val: 0, left: null, right: null},
                 right: {val: 4,
                         left: {val: 3, left: null, right: null},
                         right: {val: 5, left: null, right: null}}},
          right: {val: 8,
                  left: {val: 7, left: null, right: null},
                  right: {val: 9, left: null, right: null}}};

console.log(lowestCommonAncestor(t1, 3,7));