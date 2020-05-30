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
      calculatePathThrough(i, j, matrix, newM);
    }
  }
  
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      if((newM[i][j].up || newM[i][j].left) && (newM[i][j].down || newM[i][j].right)) ret.push([i,j]);
    }
  }
  
  console.log(newM);
  //console.log(ret);
  return ret;
};

function calculatePathThrough(x, y, matrix, newm){
  if(typeof newm[x][y] === 'undefined')
    newm[x][y] = {up: null, down: null, left: null, right: null};
            
  if(x === 0) newm[x][y].up = true;
  if(y === 0) newm[x][y].left = true;
  if(x === matrix.length -1) newm[x][y].down = true;
  if(y === matrix[0].length -1) newm[x][y].right = true;

  
  let tempobj;
  if((newm[x][y].up || newm[x][y].left) && (newm[x][y].down || newm[x][y].right)) return newm[x][y];
  
  newm[x][y] = goOneStep(x,y,matrix,newm, 'right');
  newm[x][y] = goOneStep(x,y,matrix,newm, 'down');
  newm[x][y] = goOneStep(x,y,matrix,newm, 'left');
  return goOneStep(x,y,matrix,newm, 'up');
}

function goOneStep(x,y,matrix,newm,direction){
  if(typeof newm[x][y] != 'undefined'){
    if(newm[x][y][direction]) return newm[x][y];
  }
  
  if(direction === 'right'){
    if(y < matrix[x].length -1) {
      if(matrix[x][y] < matrix[x][y+1])  
        newm[x][y].right = false;
      else{
        if(typeof newm[x][y+1] === 'undefined'){
          newm[x][y+1] = {up: null, down: null, left: null, right: null};
        }
        if(newm[x][y+1].right == null) goOneStep(x,y+1,matrix,newm,direction);
        if(newm[x][y+1].down == null) goOneStep(x,y+1,matrix,newm,'down');
        newm[x][y].right = newm[x][y+1].right || newm[x][y+1].down;
      }
    }
    else newm[x][y].right = true;
  }
  
  if(direction === 'down'){
    if(x < matrix.length -1) {
      if(matrix[x][y] < matrix[x + 1][y])  
        newm[x][y].down = false;
      else{
        if(typeof newm[x+1][y] === 'undefined'){
          newm[x+1][y] = {up: null, down: null, left: null, right: null};
        }
        if(newm[x+1][y].right == null) goOneStep(x+1,y,matrix,newm,'right');
        if(newm[x+1][y].down == null) goOneStep(x+1,y,matrix,newm,direction);
        newm[x][y].down = newm[x+1][y].right || newm[x+1][y].down;
      }
    }
    else newm[x][y].down = true;
  }
  
  if(direction === 'left'){
    if(y > 0){
      if(matrix[x][y] < matrix[x][y-1])
        newm[x][y].left = false;
      else {
        if(typeof newm[x][y-1] === 'undefined'){
          newm[x][y-1] = {up: null, down: null, left: null, right: null};
        }
        if(newm[x][y-1].left == null) goOneStep(x,y-1,matrix,newm,direction);
        if(newm[x][y-1].up == null) goOneStep(x,y-1,matrix,newm,'up');
        newm[x][y].left = newm[x][y-1].left || newm[x][y-1].up;
      }
    }
    else newm[x][y].left = true;
  }
  
  if(direction === 'up'){
    if(x > 0) {
      if(matrix[x][y] < matrix[x-1][y])
        newm[x][y].up = false;
      else {
        if(typeof newm[x-1][y] === 'undefined'){
          newm[x-1][y] = {up: null, down: null, left: null, right: null};
        }
        if(newm[x-1][y].left == null) goOneStep(x-1,y,matrix,newm,'left');
        if(newm[x-1][y].up == null) goOneStep(x-1,y,matrix,newm,direction);
        newm[x][y].left = newm[x-1][y].left || newm[x-1][y].up;
      }
    }
    else newm[x][y].up = true;
  }
    
  return newm[x][y];
}

let mt = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];
let mt1 = [[1,2,3],[8,9,4],[7,6,5]];
//console.log(pacificAtlantic(mt)); //[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
console.log(pacificAtlantic(mt1)); //[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]