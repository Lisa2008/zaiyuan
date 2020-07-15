/**
Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.
For example:
Given n = 5 and edges = [[0, 1], [0, 2], [0, 3], [1, 4]], return true.
Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]], return false.
Note: you can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0]and thus will not appear together in edges.

*/

function validTree(n, edges){
  if(edges.length === 0) return true;
  
  let map = new Map();
  
  let temp;
  
  for(let a of edges){
    if(!map.get(a[0])){
       map.set(a[0],[a[1]]);
    }else{
      temp = map.get(a[0]);
      temp.push(a[1]);
      map.set(a[0], temp);
    }
    
    if(!map.get(a[1])){
       map.set(a[1],[a[0]]);
    }else{
      temp = map.get(a[1]);
      temp.push(a[0]);
      map.set(a[1], temp);
    }
  }
  
  let visited = [];
  let index = 0;
  while( index < n){
    visited.push(index);
    if(!map.get(index)) {
      index++;
      continue;
    }else{
      
    }
  }
}

let arry1 = [[0, 1], [0, 2], [0, 3], [1, 4]];
console.log(validTree(5, arry1));