/**
Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its level order traversal as:
[
  [3],
  [9,20],
  [15,7]
]

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
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  let tra = [];
    if(root === null) return tra;
  let lev = 0;
  addNode(root, tra, lev);
  
  return tra;
};

function addNode(node, tra, lev){
  if(typeof tra[lev] === 'undefined') tra[lev] = [node.val];
  else tra[lev].push(node.val);
  
  lev++;
  if(node.left != null) addNode(node.left, tra, lev);
  if(node.right != null) addNode(node.right, tra, lev);
}
