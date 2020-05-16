/**
Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Note: A leaf is a node with no children.

Example:

Given binary tree [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
return its depth = 3.

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
 * @return {number}
 */
var maxDepth = function(root) {
    let depth = 0;
  
    return maxDepth1(root, depth);
  
};

function maxDepth1(root, depth) {
  if(root === null) return depth;
  else depth++;
  
  let rightd = 0;
  rightd = maxDepth1(root.right, depth);
  let leftd = 0;
  leftd = maxDepth1(root.left, depth);
  
  return Math.max(rightd, leftd);

}

var root1 = {val: 3, left: {val: 9, left: null, right: null}, right: {val: 20, left: {val: 15, left: null, right: null}, right: {val: 7, left: null, right: null}}};

console.log(maxDepth(root1));