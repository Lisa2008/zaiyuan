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

//Wrong approach because of wrong understanding the question

var maxPathSum = function(root) {
  let maxWeight = {max: -Infinity};
  
  let temp = getWeight(root, maxWeight);
  console.log(root);
  return maxWeight.max;
 
};

function getWeight(node, maxWeight) {
  if(node === null) return 0;
  
  let weight = node.val;
  
  let testa = [weight];
  
  let templeft = 0;
  let tempright = 0;
  
  if(node.left !== null){
    templeft = getWeight(node.left, maxWeight);
    testa.push(templeft);
    testa.push(weight + templeft);               
  }
  
  if(node.right !== null){
    tempright = getWeight(node.right, maxWeight);
    testa.push(tempright);
    testa.push(weight + tempright);               
  }
  
  if(node.left !== null && node.right !== null)
    testa.push(weight + templeft +tempright);
  
  maxWeight.max = Math.max(maxWeight.max, ...testa);
  
  weight = weight + templeft + tempright;
  
  node['weight'] = weight;
  
  return weight;
}

/*var root1 = {val: -10, 
             left: {val: 9, 
                    left: null, right: null}, 
                    
             right: {val: 20,
                     left: {val: 15,
                            left: null, right: null},
                     right: {val: 7,
                             left: null, right: null}
             }};*/

/*var root1 = {val: 1, 
             left: {val: 2, 
                    left: null, right: null}, 
                    
             right: {val: 3,
                     left: null, right: null}
             };*/

/*var root1 = {val: 2, 
             left: {val: -1, 
                    left: null, right: null}, 
                    
             right: null
             };*/


/*var root1 = {val: 1, 
             left: {val: -2, 
                    left: {val: 1,
                           left: {val: -1,left: null, right: null},
                           right: null},
                    right: {val: 3, left: null, right: null}},
                    
             right: {val: -3,
                     left: {val: -2,
                            left: null, right: null},
                     right: null
             }};*/

/*var root1 = {val: -3, 
             left: null, 
                    
             right: null
             };*/


var root1 = {val: 5, 
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
console.log(maxPathSum(root1));