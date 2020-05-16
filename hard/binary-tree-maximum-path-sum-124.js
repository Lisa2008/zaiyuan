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
    
  getWeight(root);
  console.log(root);
  
  return findPath(root);
};

function getWeight(node) {
  if(node === null) return 0;
  
  let weight = node.val;
  
  weight = node.left === null? weight: weight + getWeight(node.left);
  weight = node.right === null? weight: weight + getWeight(node.right);
  
  node['weight'] = weight;
  
  return weight;
}

function findPath(node) {
  if(node.left === null && node.right === null) return node.val;
  
  let maxPath;
  
  if(node.left === null){
    if(node.val > node.right.weight) return node.val;
    if(node.weight > node.right.weight){
      maxPath = Math.max(node.val, node.val + findSPath(node.right));
    }
    else{
      maxPath = findPath(node.right);
    }
  }
  else if(node.right === null){
    if(node.val > node.left.weight) return node.val;
    
    if(node.weight > node.left.weight || node.val > node.left.weight){
      maxPath = Math.max(node.val, node.val + findSPath(node.left));
    }
    else{
      maxPath = findPath(node.left);
    }
  }
  else {
    if(node.val > node.left.wegith && node.val > node.right.weight) return node.val;
    if(node.weight > node.left.weight && node.weight > node.right.weight) {
      maxPath = node.val + findSPath(node.left) + findSPath(node.right);
    }
    else {
      maxPath = Math.max(findPath(node.left), findPath(node.right));
    }
  }
  
  return maxPath;
}

function findSPath(node) {
  if(node.left === null && node.right === null) return node.val;
  
  if(node.left === null) {
    if(node.val > node.right.weight) return node.val;
    if(node.weight > node.right.weight){
      return node.val + findSPath(node.right);  
    }
    else return node.val;
  }
  else if(node.right === null){
    if(node.val > node.left.weight) return node.val;
    if(node.weight > node.left.weight){
      return node.val + findSPath(node.left);  
    }
    else return node.val;
  }
  else{
    if(node.val > node.left.weight && node.val > node.right.weight) return node.val;
    if(node.weight > node.left.weight && node.weight > node.right.weight)
      return node.left.weight > node.right.weight ? (node.val + findSPath(node.left)):(node.val + findSPath(node.right));
    else return node.val;
  }
}

/*var root1 = {val: -10, 
             left: {val: 9, 
                    left: null, right: null}, 
                    
             right: {val: 20,
                     left: {val: 15,
                            left: null, right: null},
                     right: {val: 7,
                             left: null, right: null}
             }}; //42*/

/*var root1 = {val: 1, 
             left: {val: 2, 
                    left: null, right: null}, 
                    
             right: {val: 3,
                     left: null, right: null}
             };  //6*/

/*var root1 = {val: 2, 
             left: {val: -1, 
                    left: null, right: null}, 
                    
             right: null
             }; //2*/


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
             }}; //3*/

/*var root1 = {val: -3, 
             left: null, 
                    
             right: null
             }; //-3*/


/*var root1 = {val: 5, 
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
             }}; //48*/

/*var root1 = {val: -2, 
             left: null, 
                    
             right: {val: -3, left: null, right: null}
             }; //-2*/

var root1 = {val: 1, 
             left: {val: -2, left: null, right: null}, 
                    
             right: {val: 3, left: null, right: null}
             }; //-2


console.log(maxPathSum(root1));