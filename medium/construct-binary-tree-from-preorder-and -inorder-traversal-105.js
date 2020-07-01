/*Given preorder and inorder traversal of a tree, construct the binary tree.

Note:
You may assume that duplicates do not exist in the tree.

For example, given

preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]
Return the following binary tree:

    3
   / \
  9  20
    /  \
   15   7
   
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if(preorder.length !== inorder.length) return null;
  
  return buildTree1(preorder,inorder);

};

function buildTree1(pre,ino){
  
  if(pre.length === 0) return null;
  
  let t = {val: pre.shift(), left: null, right: null};
  if(pre.length === 0) return t;
  
  let index = ino.indexOf(t.val);
  
  let inoleft = ino.slice(0, index);
  
  
  t.left = buildTree1(pre.slice(0, inoleft.length), inoleft);
  t.right = buildTree1(pre.slice(inoleft.length), ino.slice(index+1));
  
  return t;
  
}
let p = [1,2,4,5,3,7,6,8];
let i = [4,2,5,1,6,7,3,8];

let p1 = [3,9,20,15,7];
let i1 = [9,3,15,20,7];

//console.log(buildTree(p,i));
console.log(buildTree(p1,i1));

