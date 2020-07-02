/*Given a binary tree, determine if it is a valid binary search tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 

Example 1:

    2
   / \
  1   3

Input: [2,1,3]
Output: true
Example 2:

    5
   / \
  1   4
     / \
    3   6

Input: [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.

*/

var isValidBST = function(root) {
  if(!root) return true;
  
  if(!root.left && !root.right) return true;
  
  if((!root.left || root.left.val < root.val) && 
     (!root.right || root.right.val > root.val)){
    
    let a = true;
    let b = true;
    
    if(root.left){
      a = isValidBST1(root.left, {left: root.val, right: null});
    }
    
    if(root.right){
      b = isValidBST1(root.right, {left: null, right: root.val});
    }
    return a && b;
  }
  
  return false;
};

function isValidBST1(node, parent){
  if(!node.left && !node.right) return true;
  
  let ret = (!node.left || (node.left.val < node.val && (!parent.right || node.left.val > parent.right)));
  
  ret = ret ? (!node.right || (node.right.val > node.val && (!parent.left || node.right.val < parent.left))) : false;
  
  if(ret){
    let a = true;
    let b = true;
    let temp = {};
    if(node.left){
      temp = Object.assign(temp, parent);
      temp.left = node.val;
      a = isValidBST1(node.left, temp);
    }
    
    if(node.right){
      temp = Object.assign(temp, parent);
      temp.right = node.val;
      b = isValidBST1(node.right, temp);
    }
    
    return a && b;
    
  }
  
  return false;
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

//console.log(isValidBST(t)); //true
//console.log(isValidBST(t1)); //false
//console.log(isValidBST(t2)); //false
console.log(isValidBST(t3)); //false

