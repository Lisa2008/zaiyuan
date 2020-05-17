/**
Given a non-empty binary tree, find the maximum path sum.

For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.

Example 1:

Input: [1,2,3]

       1
      / \
     2   3

Output: 6
Example 2:

Input: [-10,9,20,null,null,15,7]

   -10
   / \
  9  20
    /  \
   15   7

Output: 42
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
var maxPathSum = function(root) {
  if(root.left === null && root.right === null) return root.val;
  let maxp = {max: root.val};
  
  createMaxPath(root, maxp);
  //console.log(root);
  return maxp.max;
}

function createMaxPath(node, m) {
  if(node.left === null && node.right === null) {
    node['leftmax'] = node.val;
    node['rightmax'] = node.val;
    if(node.val > m.max) m.max = node.val;
  }
  
  let tempNode;
  let leftpath = null;
  let rightpath = null;
  
  if(node.left != null){
    tempNode = createMaxPath(node.left, m);
    leftpath = Math.max(tempNode.leftmax + node.val, tempNode.rightmax + node.val, node.val);
    if(leftpath > m.max) m.max = leftpath;
    node['leftmax'] = leftpath;
  }
  
  if(node.right != null) {
    tempNode = createMaxPath(node.right, m);
    rightpath = Math.max(tempNode.leftmax + node.val, tempNode.rightmax + node.val, node.val);
    if(rightpath > m.max) m.max = rightpath;
    node['rightmax'] = rightpath;
  }
  
  if(leftpath === null) {
    leftpath = node.val;
    node['leftmax'] = node.val;  
  }
    
  if(rightpath === null) {
    rightpath = node.val;
    node['rightmax'] = node.val;  
  }
    
  m.max = Math.max(m.max, node.val, leftpath, rightpath, leftpath + rightpath - node.val);
  
  return node;
}

var root1 = {val: 1, 
             left: {val: 2, 
                    left: null, right: null}, 
                    
             right: {val: 3,
                     left: null, right: null}
             };  //6

var root2 = {val: -3, 
             left: null, 
                    
             right: null
             }; //-3

var root3 = {val: 2, 
             left: {val: -1, 
                    left: null, right: null}, 
                    
             right: null
             }; //2

var root4 = {val: -2, 
             left: null, 
                    
             right: {val: -3, left: null, right: null}
             }; //-2

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
             }}; //48

var root6 = {val: -10, 
             left: {val: 9, 
                    left: null, right: null}, 
                    
             right: {val: 20,
                     left: {val: 15,
                            left: null, right: null},
                     right: {val: 7,
                             left: null, right: null}
             }}; //42

var root7 = {val: 1, 
             left: {val: -2, 
                    left: {val: 1,
                           left: {val: -1,left: null, right: null},
                           right: null},
                    right: {val: 3, left: null, right: null}},
                    
             right: {val: -3,
                     left: {val: -2,
                            left: null, right: null},
                     right: null
             }}; //3

var root8 = {val: 1, 
             left: {val: -2, left: null, right: null}, 
                    
             right: {val: 3, left: null, right: null}
             }; //4

var root9 = {val: -2, 
             left: {val: -1, left: null, right: null}, 
                    
             right: null
             }; //-1

var root10 = {val: 9, 
             left: {val: 6, left: null, right: null}, 
                    
             right: {val: -3,
                     left: {val: -6, left: null, right: null},
                     right: {val: 2,
                             left: {val: 2,
                                    left: {val: -6, 
                                           left: {val: -6, left: null, right: null}, 
                                           right: null
                                          },
                                    right: {val: -6, left: null, right: null}
                                   },
                             right: null}
                    }
             }; //16

/*var root101 = {val: 2,
               left: {val: 2,
                      left: {val: -6, 
                             left: {val: -6, left: null, right: null}, 
                             right: null
                             },
                     right: {val: -6, left: null, right: null}
                    },
               right: null};*/

//console.log(maxPathSum(root1));
//console.log(maxPathSum(root2));
//console.log(maxPathSum(root3));
//console.log(maxPathSum(root4));
//console.log(maxPathSum(root5));
//console.log(maxPathSum(root6));
//console.log(maxPathSum(root7));
//console.log(maxPathSum(root8));
//console.log(maxPathSum(root9));
console.log(maxPathSum(root10));
//console.log(maxPathSum(root101));