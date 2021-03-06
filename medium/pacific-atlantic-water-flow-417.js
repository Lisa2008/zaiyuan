/**
Given an m x n matrix of non-negative integers representing the height of each unit cell in a continent, the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean" touches the right and bottom edges.

Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.

Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.

Note:

The order of returned grid coordinates does not matter.
Both m and n are less than 150.
 

Example:

Given the following 5x5 matrix:

  Pacific ~   ~   ~   ~   ~ 
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic

Return:

[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix).
*/

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */

var pacificAtlantic = function(matrix) {
    if(matrix.length === 0) return [];
  let newM = new Array(matrix.length);
  for(let i = 0; i < newM.length; i++){
    newM[i] = new Array(matrix[i].length);
  }
  
  let ret = [];
  let tempObj;
  
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      tempObj = calculatePathThrough(i, j, matrix, newM);
    }
  }
  
  console.log(newM);
  
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      if(newM[i][j].p && newM[i][j].a) {
        ret.push([i,j]);
      }else{
      
        if((i -1) >= 0 && (matrix[i][j] >= matrix[i-1][j]) && (newM[i-1][j].p && newM[i-1][j].a)){
          ret.push([i,j]);
          continue;
        }
        if((i +1) < matrix.length && (matrix[i][j] >= matrix[i+1][j]) && (newM[i+1][j].p && newM[i+1][j].a)){
          ret.push([i,j]);
          continue;
        }
        if((j -1) >= 0 && (matrix[i][j] >= matrix[i][j-1]) && (newM[i][j-1].p && newM[i][j-1].a)){
          ret.push([i,j]);
          continue;
        }
        if((j +1) < matrix[i].length && (matrix[i][j] >= matrix[i][j+1]) && (newM[i][j+1].p && newM[i][j+1].a)){
          ret.push([i,j]);
          continue;
        }
      }
    }
  }
  
  
      
//  
  return ret;
};

function calculatePathThrough(x, y, matrix, newm){
  initPoint(x,y,matrix,newm);
  
  if(newm[x][y].p != null && newm[x][y].a !== null) return newm[x][y];
  
  return seeAround(x, y, matrix, newm);
  
}

function initPoint(x,y,matrix,newm){
  if(typeof newm[x][y] === 'undefined')
    newm[x][y] = {p: null, a: null, visited: false};
  
  if(x === 0 || y === 0) {
    newm[x][y].p = true;
  }
  
  if(x === matrix.length -1 || y === matrix[0].length -1) {
      newm[x][y].a = true;
  }
  
  return newm[x][y];
}

function seeAround(x,y,matrix,newm){
  newm[x][y].visited = true;
  let tempo;
  //up
  if( x - 1 >= 0){
    if(matrix[x][y] >= matrix[x-1][y]){
      initPoint(x-1,y,matrix,newm);
      if(!newm[x-1][y].visited && ( newm[x-1][y].p === null || newm[x-1][y].a === null )){
        tempo = seeAround(x-1,y,matrix,newm);
      }else tempo = newm[x-1][y];
      
      newm[x][y].p = newm[x][y].p === null ? tempo.p : newm[x][y].p || tempo.p;
      newm[x][y].a = newm[x][y].a === null ? tempo.a : newm[x][y].a || tempo.a;
      if(newm[x][y].p && newm[x][y].a) return newm[x][y];  
    }
  }
  
  //down
  if( x + 1 < matrix.length){
    if(matrix[x][y] >= matrix[x+1][y]){
      initPoint(x+1,y,matrix,newm);
      if(!newm[x+1][y].visited && ( newm[x+1][y].p === null || newm[x+1][y].a === null )){
        tempo = seeAround(x+1,y,matrix,newm);
      }else tempo = newm[x+1][y];
      
      newm[x][y].p = newm[x][y].p === null ? tempo.p : newm[x][y].p || tempo.p;
      newm[x][y].a = newm[x][y].a === null ? tempo.a : newm[x][y].a || tempo.a;
      if(newm[x][y].p && newm[x][y].a) return newm[x][y];  
    }
  }
  
  //left
  if( y - 1 >= 0){
    if(matrix[x][y] >= matrix[x][y-1]){
      initPoint(x,y-1,matrix,newm);
      if(!newm[x][y-1].visited && ( newm[x][y-1].p === null || newm[x][y-1].a === null )){
        tempo = seeAround(x,y-1,matrix,newm);
      } else tempo = newm[x][y-1];
      
      newm[x][y].p = newm[x][y].p === null ? tempo.p : newm[x][y].p || tempo.p;
      newm[x][y].a = newm[x][y].a === null ? tempo.a : newm[x][y].a || tempo.a;
      if(newm[x][y].p && newm[x][y].a) return newm[x][y];  
    }
  }
  
  //right
  if( y + 1 < matrix[0].length){
    if(matrix[x][y] >= matrix[x][y+1]){
      initPoint(x,y+1,matrix,newm);
      if(!newm[x][y+1].visited && ( newm[x][y+1].p === null || newm[x][y+1].a === null )){
        tempo = seeAround(x,y+1,matrix,newm);
      } else tempo = newm[x][y+1];
      
      newm[x][y].p = newm[x][y].p === null ? tempo.p : newm[x][y].p || tempo.p;
      newm[x][y].a = newm[x][y].a === null ? tempo.a : newm[x][y].a || tempo.a;
      if(newm[x][y].p && newm[x][y].a) return newm[x][y];  
    }
  }
  if(newm[x][y].p === null) newm[x][y].p = false;
  if(newm[x][y].a === null) newm[x][y].a = false;
  
  
  return newm[x][y];
}

let mt = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];

let mt1 = [[1,2,3],[8,9,4],[7,6,5]];

let mt2 = [[11,2,11,0,15,12,4,15,0,14,11,3,19,11,5,11,18,19,4,3,11,1,9,17,5,2,15,18,11,15],[12,10,8,15,4,7,4,5,7,8,5,12,3,3,10,12,16,15,17,13,13,16,0,0,17,17,11,3,14,0],[8,18,1,6,15,16,14,11,9,11,3,4,17,7,2,16,18,2,0,0,16,18,10,15,14,18,10,19,17,6],[14,17,4,13,13,6,16,1,3,18,18,18,4,1,15,4,0,9,19,3,6,7,19,13,11,11,10,19,3,15],[16,6,19,17,19,17,5,12,6,3,1,0,3,10,13,18,4,3,9,0,1,18,9,15,18,3,4,6,1,15],[1,2,12,9,9,7,17,0,1,14,18,1,5,3,0,7,2,19,7,19,1,11,1,3,2,4,0,3,16,18],[18,10,10,3,12,11,7,8,3,16,7,11,11,12,15,1,13,9,8,17,1,9,7,19,1,14,8,10,18,14],[5,19,9,4,10,14,1,5,11,16,11,3,5,4,19,8,11,16,19,12,6,3,18,16,17,8,11,19,7,14],[0,15,17,11,10,13,19,0,10,3,15,19,3,3,3,4,3,12,17,10,5,16,12,5,5,17,5,17,6,6],[8,19,9,3,13,8,13,17,4,12,13,8,13,12,10,10,16,7,2,8,17,3,7,1,7,16,11,19,13,19],[6,19,6,13,10,5,14,7,3,1,10,6,4,8,15,0,0,2,12,13,14,14,7,5,1,16,15,15,4,7],[7,7,11,14,2,4,14,2,2,0,6,11,15,14,11,13,2,3,14,9,16,3,8,15,2,18,15,15,2,2],[7,5,12,10,14,3,6,9,2,1,2,15,0,4,7,9,7,12,15,9,2,13,7,8,7,9,4,3,5,19],[11,9,1,8,0,15,1,6,5,11,14,19,6,11,0,12,1,6,8,7,0,1,2,9,14,4,5,8,3,16],[8,0,11,5,14,4,19,0,6,8,1,10,13,8,18,6,6,4,5,9,10,14,14,13,12,16,4,3,3,11],[0,9,6,19,16,4,5,10,13,19,8,15,14,7,13,11,17,18,14,18,19,11,0,4,12,11,2,8,17,14],[16,19,16,9,9,14,5,13,7,10,18,6,15,12,12,1,11,16,1,8,1,7,16,7,19,6,12,0,15,0],[2,4,18,15,13,9,4,18,19,5,16,7,10,1,7,7,4,4,10,8,13,15,9,4,16,13,6,3,13,7],[3,11,10,13,6,4,0,13,11,4,5,6,19,13,8,10,8,9,2,4,4,11,12,8,12,15,6,1,10,12],[7,6,19,3,2,14,15,6,9,1,6,14,4,15,13,9,14,7,10,12,17,18,6,4,12,4,1,6,6,12],[15,17,9,15,9,15,9,10,10,11,12,17,2,18,11,0,6,11,14,17,2,13,9,13,3,4,3,1,8,11],[17,13,12,17,4,19,19,7,7,13,19,10,4,16,1,18,14,2,9,18,2,8,3,1,10,9,12,6,2,11],[17,12,6,8,3,16,5,2,16,3,13,3,13,9,11,11,5,12,14,16,3,19,16,16,1,14,5,3,17,19],[1,4,0,3,1,17,5,15,2,19,12,7,18,13,1,0,7,2,9,18,10,18,8,9,13,13,8,10,14,14],[9,14,4,18,10,18,3,9,9,17,16,4,19,7,3,18,7,0,10,13,9,10,11,16,3,5,1,2,16,19],[8,10,13,8,7,2,9,4,16,15,5,4,15,7,9,7,15,2,6,17,14,3,13,3,4,15,13,10,8,16],[17,7,19,19,13,12,6,0,11,4,10,4,1,9,15,9,7,7,14,6,7,18,9,13,6,16,5,2,17,1],[2,7,0,4,8,18,4,11,13,4,11,12,3,18,11,2,4,18,3,3,17,9,18,11,9,15,14,19,7,17],[13,1,15,18,4,12,18,18,15,16,7,17,9,15,11,3,9,7,18,13,3,11,7,19,10,10,7,13,7,19],[17,17,14,3,19,7,1,13,9,3,6,16,10,8,14,8,17,18,12,11,4,11,10,15,9,0,4,12,7,15],[4,4,8,1,7,11,13,4,11,5,18,2,16,11,16,13,0,13,13,12,11,15,8,4,0,3,2,9,8,15],[17,4,13,5,3,17,14,4,7,6,6,11,16,18,2,0,3,12,1,5,12,16,3,14,4,16,5,8,15,9],[5,3,17,17,6,4,19,5,4,6,11,4,14,18,4,19,16,15,1,17,3,8,13,14,16,13,18,19,6,4],[15,0,8,15,6,6,11,8,18,2,4,10,18,16,15,8,1,5,9,13,7,19,12,2,9,18,1,15,12,8],[5,0,18,14,1,8,18,15,5,13,15,7,8,8,9,0,14,12,4,17,2,10,9,7,19,7,19,9,7,1],[7,4,16,16,13,4,3,6,15,11,14,7,3,0,5,15,10,13,18,18,11,6,7,9,19,13,4,2,7,9],[9,14,15,11,14,5,15,1,19,15,3,4,0,10,4,1,2,15,18,15,15,2,9,0,3,10,9,16,4,1],[14,13,17,19,0,13,15,9,16,18,5,6,16,16,6,10,14,15,17,5,9,2,5,11,19,19,11,6,15,14],[17,7,19,6,5,19,10,2,11,17,17,13,16,13,19,4,12,3,4,13,7,9,19,9,12,3,16,8,18,13]];

let mt3 = [[7 ,1 ,17,13,9 ,10,5 ,14,0 ,3 ],
           [7 ,15,7 ,8 ,15,16,10,10,5 ,13],
           [18,9 ,15,8 ,19,16,7 ,5 ,5 ,10],
           [15,11,18,3 ,1 ,17,6 ,4 ,10,19],
           [3 ,16,19,12,12,19,2 ,14,5 ,9 ],
           [7 ,16,0 ,13,14,7 ,2 ,8 ,6 ,19],
           [5 ,10,1 ,10,2 ,12,19,1 ,0 ,19],
           [13,18,19,12,17,17,4 ,5 ,8 ,2 ],
           [2 ,1 ,17,13,14,12,14,2 ,16,10],
           [5 ,8 ,1 ,11,16,1 ,18,15,6 ,19],
           [3 ,8 ,14,14,5 ,0 ,2 ,7 ,5 ,1 ],
           [17,1 ,9 ,17,10,10,10,7 ,1 ,16],
           [14,18,5 ,11,17,15,8 ,8 ,14,13],
           [6 ,4 ,10,17,8 ,0 ,11,4 ,2 ,8 ],
           [16,11,17,9 ,3 ,2 ,11,0 ,6 ,5 ],
           [12,18,18,11,1 ,7 ,12,16,12,12],
           [2 ,14,12,0 ,2 ,8 ,5 ,10,7 ,0 ],
           [16,13,1 ,19,8 ,13,11,8 ,11,3 ],
           [11,2 ,8 ,19,6 ,14,14,6 ,16,12],
           [18,0 ,18,10,16,15,15,12,4 ,3 ],
           [8 ,15,9 ,13,8 ,2 ,6 ,11,17,6 ],
           [7 ,3 ,0 ,18,7 ,12,2 ,3 ,12,10],
           [7 ,9 ,13,0 ,11,16,9 ,9 ,12,13],
           [9 ,4 ,19,6 ,8 ,10,12,6 ,7 ,11],
           [5 ,9 ,18,0 ,4 ,9 ,6 ,4 ,0 ,1 ],
           [9 ,12,1 ,11,13,13,0 ,16,0 ,6 ],
           [7 ,15,4 ,8 ,15,17,17,19,15,1 ],
           [7 ,17,4 ,1 ,1 ,14,10,19,10,19],
           [10,5 ,12,5 ,8 ,8 ,14,14,6 ,0 ],
           [16,10,10,7 ,13,4 ,0 ,15,18,0 ],
           [11,2 ,10,6 ,5 ,13,4 ,5 ,3 ,1 ],
           [9 ,14,16,14,15,3 ,2 ,13,17,8 ],
           [19,2 ,10,1 ,2 ,15,12,10,2 ,5 ],
           [12,4 ,8 ,9 ,8 ,6 ,4 ,14,14,0 ],
           [11,17,17,4 ,16,13,6 ,15,5 ,7 ],
           [12,18,1 ,3 ,9 ,10,7 ,1 ,1 ,1 ],
           [18,6 ,10,8 ,12,14,9 ,12,10,3 ],
           [15,13,18,13,8 ,5 ,12,14,18,0 ],
           [15,4 ,8 ,9 ,19,18,6 ,19,12,0 ],
           [4 ,14,15,4 ,17,17,9 ,17,9 ,0 ],
           [6 ,17,16,10,3 ,8 ,8 ,18,15,9 ],
           [3 ,8 ,4 ,2 ,13,0 ,2 ,8 ,8 ,2 ],
           [14,12,13,12,17,4 ,16,9 ,8 ,7 ],
           [0 ,19,8 ,16,1 ,13,7 ,6 ,15,11],
           [1 ,13,16,14,10,4 ,11,19,9 ,13],
           [8 ,0 ,2 ,1 ,16,12,16,9 ,9 ,9 ],
           [5 ,2 ,10,4 ,8 ,12,17,0 ,2 ,15],
           [11,2 ,15,15,14,9 ,11,19,18,11],
           [4 ,4 ,1 ,5 ,13,19,9 ,17,17,17],
           [4 ,1 ,8 ,0 ,8 ,19,11,0 ,5 ,4 ],
           [8 ,16,14,18,12,2 ,0 ,19,0 ,13],
           [7 ,11,3 ,18,8 ,2 ,2 ,19,8 ,7 ],
           [3 ,13,6 ,1 ,12,16,4 ,13,0 ,5 ],
           [12,1 ,16,19,2 ,12,16,15,19,6 ],
           [1 ,7 ,12,15,3 ,3 ,13,17,16,12]];

//console.log(pacificAtlantic(mt)); //[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
//console.log(pacificAtlantic(mt1)); //[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
//console.log(pacificAtlantic(mt2)); //[[0,29],[1,28],[2,27],[2,28],[3,27],[34,2],[35,2],[35,3],[36,1],[36,2],[37,0],[37,2],[37,3],[38,0],[38,2]]
console.log(pacificAtlantic(mt3)); //[[0,9],[1,9],[2,9],[3,9],[11,3],[53,0],[53,2],[53,3],[54,0],[54,1],[54,2],[54,3]]
