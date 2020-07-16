/**
Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to find the number of connected components in an undirected graph.
Example 1:
     0          3
     |          |
     1 --- 2    4
Given n = 5 and edges = [[0, 1], [1, 2], [3, 4]], return 2.
Example 2:
     0           4
     |           |
     1 --- 2 --- 3
Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [3, 4]], return 1.
Note:
You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.
*/

function countComponents(n, edges){
  if(edges.length === 0) return 0;
  
  let map = new Map();
  
  let temp;
  let root0, root1;
  for(let pair of edges){
    temp = map.get(pair[0]);
    if(temp === undefined || temp === null) {
      map.set(pair[0], pair[0]);
    }
    root0 = map.get(pair[0]);
    temp = map.get(pair[1]);
    if(temp === undefined || temp === null){
      map.set(pair[1], root0);
    }else{
      root1 = temp;
      if(root0 !== root1){
        if(root0 < root1) {
          map.set(root1, root0);
          map.set(pair[1], root0);
        } else {
          map.set(root0, root1);
          map.set(pair[0], root1);
        }
      }
    }
    //console.log(map);
  }
  
  
  
  let cur = map.get(0);
  let roots = [cur];
  for(let p of map.values()){
    if(p !== cur){
      cur = p;
      roots.push(cur);
    }
  }
  
  //console.log(roots);
  
  return roots.length;
}

let egs1 = [[0, 1], [1, 2], [3, 4]];
console.log(countComponents(5, egs1)); // 2

/*let egs2 = [[0, 1], [1, 2], [2, 3], [3, 4]];
console.log(countComponents(5, egs2)); // 1*/

/*let egs3 = [[0, 1], [2, 3], [3, 1]];
console.log(countComponents(4, egs3)); // 1*/