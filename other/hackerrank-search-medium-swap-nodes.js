function treeNode(val, depth, left, right ) {
  this.val = val === undefined? 0 : val;
  this.left = left === undefined? null : left;
  this.right = right === undefined? null : right;
  this.depth = depth === undefined? 1: depth;
}

function swapNodes(indexes, queries) {
  let root = new treeNode(1);
  
  let nodes = [root];
  let curNode;
  let ret = [];
  
  for(let i in indexes) {
    curNode = nodes.shift();
    addNode(curNode, indexes[i], curNode.depth + 1);
    if(curNode.left) nodes.push(curNode.left);
    if(curNode.right) nodes.push(curNode.right);
  }
  
  nodes = [root];
  let queryIndex = 0;
  while(queryIndex < queries.length) {
    curNode = nodes.shift();
    if(curNode.depth % queries[queryIndex] === 0) {
      swapNode(curNode);
    }
    if(curNode.left) nodes.push(curNode.left);
    if(curNode.right) nodes.push(curNode.right);
    if(nodes.length === 0) {
      queryIndex++;
      nodes = [root];
      ret.push(printTree(root));
    }

  }
  
  return ret;
  
}

function addNode(node, array, depth) {
  if(array[0] != -1) {
      node.left = new treeNode(array[0], depth);
  }
    
  if(array[1] != -1) {
    node.right = new treeNode(array[1], depth);
  }
}

function swapNode(node) {
  let tempNode;
  tempNode = node.left;
  node.left = node.right;
  node.right = tempNode;
}

function printTree(root) {
  let ret = [];
  if(root.left){
    ret = printTree(root.left).concat(ret);
  }
  ret.push(root.val);
  if(root.right) {
    ret = ret.concat(printTree(root.right));
  }
  
  return ret;
}

let a = [[2,3], [-1,-1],[-1,-1]];
let b = [1,1];

//console.log(swapNodes(a, b));

let a1 = [[2,3], [-1,4], [-1,5], [-1,-1],[-1,-1]];
let b1 = [2];
//console.log(swapNodes(a1, b1));

let a2 = [[2,3], [4, -1], [5, -1], [6, -1], [7,8], [-1,9], [-1,-1],[10,11], [-1,-1],[-1,-1],[-1,-1]];
let b2 = [2,4];

console.log(swapNodes(a2, b2));