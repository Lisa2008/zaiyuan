/**
Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.

 

Example 1:

Input: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
Output: 1
Example 2:

Input: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
Output: 3
Follow up:
What if the BST is modified (insert/delete operations) often and you need to find the kth smallest frequently? How would you optimize the kthSmallest routine?

 

Constraints:

The number of elements of the BST is between 1 to 10^4.
You may assume k is always valid, 1 ≤ k ≤ BST's total elements.
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  if(!root) return null;
  
  let a = [root.val];
  
  a = fillA(root, k, a);
  
  return a[k-1];
  
};

function fillA(node, k, a){
  if(!node.left && !node.right) return a;
  
  if(node.left){
    a = insertN(a, k, node.left.val);
    
    a = fillA(node.left, k, a);
  }
  if(node.right){
    a = insertN(a, k, node.right.val);
    
    a = fillA(node.right, k, a);
  }
  
  return a;
}

function insertN(a,k,n){
  if(a.length < k){
    a.push(n);
  }else {
    if(n > a[a.length -1]) return a;
    a.splice(a.length -1, 1,n);  
  }
  
  return a.sort((m1,n1) => m1-n1);
}

let t = {val: 2,
         left: {val: 1, left: null, right: null},
         right: {val: 3, left: null, right: null}};

let t1 = {val: 5,
          left: {val: 1, left: null, right: null},
          right: {val: 4,
                  left: {val: 3,left: null, right: null},
                  right: {val: 6, left: null, right: null}}
         };

let t2 = {val: 10,
          left: {val: 5, left: null, right: null},
          right: {val: 15, 
                  left: { val: 6, left: null, right: null},
                  right: {val: 20, left: null, right: null}}
         };

let t3 = {val: 3,
          left: {val: 1,
                 left: {val: 0, left: null, right: null},
                 right: {val: 2,
                         left: null,
                         right: {val: 3, left: null, right: null}}},
          right: {val: 5,
                  left: {val: 4, left: null, right: null},
                  right: {val: 6, left: null, right: null}}
         };


console.log(kthSmallest(t1,3));         