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
      if(tempObj.p && tempObj.a) ret.push([i,j]);
      //if((tempObj.up || tempObj.left) && (tempObj.down || tempObj.right)) ret.push([i,j]);
    }
  }
      
  console.log(newM);
  //console.log(ret);
  return ret;
};

function calculatePathThrough(x, y, matrix, newm){
  initPoint(x,y,matrix,newm);
  
  if(newm[x][y].p != null && newm[x][y].a !== null) return newm[x][y];
  
  return seeAround(x, y, matrix, newm);
  
}

function initPoint(x,y,matrix,newm){
  if(typeof newm[x][y] === 'undefined')
    newm[x][y] = {p: null, a: null};
  
  if(x === 0 || y === 0) {
    newm[x][y].p = true;
  }
  
  if(x === matrix.length -1 || y === matrix[0].length -1) {
      newm[x][y].a = true;
  }
  
  return newm[x][y];
}

function seeAround(x,y,matrix,newm){
  console.log(x + " " + y);
  
  //up
  if( x - 1 >= 0){
    if(matrix[x][y] >= matrix[x-1][y]){
      initPoint(x-1,y,matrix,newm);
      
      if(newm[x-1][y].p === null) newm[x][y].p = seeAround(x-1,y,matrix,newm).p;
      else newm[x][y].p = newm[x-1][y].p;
      if(newm[x-1][y].a === null) newm[x][y].a = seeAround(x-1,y,matrix,newm).a;
      else newm[x][y].a = newm[x-1][y].a;
      if(newm[x][y].p && newm[x][y].a) return newm[x][y];
    }
  }
  
  //down
  if( x + 1 < matrix.length){
    if(matrix[x][y] >= matrix[x+1][y]){
      initPoint(x+1,y,matrix,newm);
      if(newm[x+1][y].p === null) newm[x][y].p = seeAround(x+1,y,matrix,newm).p;
      else newm[x][y].p = newm[x+1][y].p;
      if(newm[x+1][y].a === null) newm[x][y].a = seeAround(x+1,y,matrix,newm).a;
      else newm[x][y].a = newm[x+1][y].a;
      if(newm[x][y].p && newm[x][y].a) return newm[x][y];
    }
  }
  
  //left
  if( y - 1 >= 0){
    if(matrix[x][y] >= matrix[x][y-1]){
      initPoint(x,y-1,matrix,newm);
      if(newm[x][y-1].p === null) newm[x][y].p = seeAround(x,y-1,matrix,newm).p;
      else newm[x][y].p = newm[x][y-1].p;
      if(newm[x][y-1].a === null) newm[x][y].a = seeAround(x,y-1,matrix,newm).a;
      else newm[x][y].a = newm[x][y-1].a;
      if(newm[x][y].p && newm[x][y].a) return newm[x][y];
    }
  }
  
  //right
  if( y + 1 < matrix[0].length){
    if(matrix[x][y] >= matrix[x][y+1]){
      initPoint(x,y+11,matrix,newm);
      if(newm[x][y+1].p === null) newm[x][y].p = seeAround(x,y+1,matrix,newm).p;
      else newm[x][y].p = newm[x][y+1].p;
      if(newm[x][y+1].a === null) newm[x][y].a = seeAround(x,y+1,matrix,newm).a;
      else newm[x][y].a = newm[x][y+1].a;
      if(newm[x][y].p && newm[x][y].a) return newm[x][y];
    }
  }
  if(newm[x][y].p === null) newm[x][y].p = false;
  if(newm[x][y].a === null) newm[x][y].a = false;
  
  return newm[x][y];
}

let mt = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];

let mt00 = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1]];

let mt1 = [[1,2,3],[8,9,4],[7,6,5]];
//console.log(pacificAtlantic(mt)); //[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
console.log(pacificAtlantic(mt00)); //[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
//console.log(pacificAtlantic(mt1)); //[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]