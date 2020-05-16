/**
Invert a binary tree.

Example:

Input:

     4
   /   \
  2     7
 / \   / \
1   3 6   9
Output:

     4
   /   \
  7     2
 / \   / \
9   6 3   1

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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(root === null || root === {} ) {
      return null;
    }
  
  let tempObj = null;
  if(root.left !== null) 
    tempObj = Object.assign({}, root.left);
    
  root.left = invertTree(root.right);
  root.right = invertTree(tempObj);
  
  return root;
};

var root1 = {val: 4, 
             left: {val: 2, 
                    left: {val: 1, 
                           left: null, right: null}, 
                    right: {val: 3, 
                            left: null, right: null}
                   },
             right: {val: 7,
                     left: {val: 6,
                            left: null, right: null},
                     right: {val: 9,
                             left: null, right: null}
             }};

console.log(invertTree(root1));
