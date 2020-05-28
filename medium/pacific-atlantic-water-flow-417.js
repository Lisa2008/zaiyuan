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
      if((tempObj.up || tempObj.left) && (tempObj.down || tempObj.right)) ret.push([i,j]);
    }
  }
      
  console.log(newM);
  console.log(ret);
};

function calculatePathThrough(x, y, matrix, newm){
  if(typeof newm[x][y] === 'undefined')
    newm[x][y] = {up: null, down: null, left: null, right: null};
            
  if(x === 0 || y === 0) {
      newm[x][y].up = true;
      newm[x][y].left = true;
  }
  if(x === matrix.length -1 || y === matrix[0].length -1) {
      newm[x][y].down = true;
      newm[x][y].right = true;
  }
  
  let tempobj;
  if((newm[x][y].up || newm[x][y].left) && (newm[x][y].down || newm[x][y].right)) return newm[x][y];
  
  else if(newm[x][y].up || newm[x][y].left) {
    tempobj = goOneStep(x,y,matrix,newm, 'right');
    if(tempobj.right) return newm[x][y];
    else{
      return goOneStep(x,y,matrix,newm, 'down');
    }
  }
  
  else if(newm[x][y].down || newm[x][y].right) {
    tempobj = goOneStep(x,y,matrix,newm, 'left');
    if(tempobj.left) return newm[x][y];
    else{
      return goOneStep(x,y,matrix,newm, 'up');
    }
  }
  
  else {
    newm[x][y] = goOneStep(x,y,matrix,newm, 'right');
    newm[x][y] = goOneStep(x,y,matrix,newm, 'down');
    newm[x][y] = goOneStep(x,y,matrix,newm, 'left');
    return goOneStep(x,y,matrix,newm, 'up');
  }
  
}

function goOneStep(x,y,matrix,newm,direction){
  
  if(direction === 'right'){
    if(y < matrix[x].length -1) {
      if(matrix[x][y] < matrix[x][y+1])  
        newm[x][y].right = false;
      else{
        if(typeof newm[x][y+1] === 'undefined'){
          newm[x][y+1] = {up: null, down: null, left: null, right: null};
        }
        if(newm[x][y+1].right != null) newm[x][y].right = newm[x][y+1].right;
        else newm[x][y].right = goOneStep(x,y+1,matrix,newm,direction).right;
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
        if(newm[x+1][y].down != null) newm[x][y].down = newm[x][y+1].down;
        else newm[x][y].down = goOneStep(x+1,y,matrix,newm,direction).down;
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

        if(newm[x][y-1].left != null) newm[x][y].left = newm[x][y-1].left;
        else newm[x][y].left = goOneStep(x, y -1, matrix, newm,direction).left;
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

        if(newm[x-1][y].up != null) newm[x][y].up = newm[x-1][y].up;
        else newm[x][y].up = goOneStep(x -1, y, matrix, newm,direction).up;
      }
    }
    else newm[x][y].up = true;
  }
    
  return newm[x][y];
}

let mt = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];
let mt1 = [[1,2,2,3,5],[3,2,3,4,4]];
console.log(pacificAtlantic(mt));
//console.log(pacificAtlantic(mt1));