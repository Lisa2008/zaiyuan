/**
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Example: 

You may serialize the following tree:

    1
   / \
  2   3
     / \
    4   5

as "[1,2,3,null,null,4,5]"
Clarification: The above format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

Note: Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
  if(root === null || root === {}) return "";
  
  let ra = [root];
  let ret = [];
  ret.push(root.val);
  
  serial(ra, ret);
  
  return ret.toString();
  
};

function serial(ra, a){
  let tempra = [];
  let node;
  for(let i = 0; i < ra.length; i++){
    node = ra[i];
    if(node.left !== null) {
      a.push(node.left.val);
      tempra.push(node.left);
    }
    else a.push(null);
    
    if(node.right !== null) {
      a.push(node.right.val);
      tempra.push(node.right);
    }
    else a.push(null);
  }

  if(tempra.length > 0) serial(tempra, a);
}


/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  if(data.length === 0) return null;
  let nums = data.split(",");
  
  let tree = {val: parseInt(nums[0]), left: null, right: null};
  nums.shift();
  
  rebuildTree([tree], nums)
  return tree;
};

function rebuildTree(nodes, nums){
  let tempa = [];
  for(let i = 0; i < nodes.length; i++){
    if(nodes[i] === null) continue;
    nums = rebuildTree1(nodes[i], nums);
    if(nums.length <= 0) break;
    
    tempa.push(nodes[i].left);
    tempa.push(nodes[i].right);
  }
  
  if(tempa.length > 0) rebuildTree(tempa, nums);
 
}

function rebuildTree1(node, nums){
   if(nums[0] !== '') {
    node.left = {val: parseInt(nums[0]), left: null, right: null};
  }
  if(nums[1] !== '' ) {
    node.right = {val: parseInt(nums[1]), left: null, right: null};
  }
  
  return nums = nums.slice(2);
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
 
 var root1 = {val: 1, 
             left: {val: 2, 
                    left: null, right: null}, 
                    
             right: {val: 3,
                     left: null, right: null}
             };  

var root5 = {val: 5, 
             left: {val: 4, 
                    left: {val: 11,
                           left: {val: 7 ,left: null , right: null},
                           right: {val: 2, left: null, right: null}},
                    right: null},
                    
             right: {val: 8,
                     left: {val: 13,left: null, right: null},
                     right: {val: 4, 
                             left: {val: 1, left: null, right: null}, 
                             right: null}
             }}; 
			 
console.log(deserialize(serialize(root5)));
