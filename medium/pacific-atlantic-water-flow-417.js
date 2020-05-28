var pacificAtlantic = function(matrix) {
  if(matrix.length === 0) return [];
  let ret = [];
  
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      if(i === 1 && j ===4){
      judgeAPoint(i, j, matrix, ret);
      }
    }
  }
  
  return ret;
  
};

function judgeAPoint(x, y, matrix, ret){
  let con = {p: false, a: false};
  
  if(x === 0 || y === 0) con.p = true;
  if(x === (matrix.length -1) || y === (matrix[0].length -1)) con.a = true;
  console.log(con);
  
  let tempa = matrix[x];
  
  //test row
  let tempret = judgeAPoint1(y, tempa, con);
  
  if(tempret.p && tempret.a) ret.push([x,y]);
  
  else{
    tempa = getColum(y, matrix);
    tempret = judgeAPoint1(x, tempa, tempret);
    if(tempret.p && tempret.a) ret.push([x,y]);
  }
  
}
  
function getColum(y, matrix){
  let ret = [];
  for(let i = 0; i < matrix.length; i++){
    ret.push(matrix[i][y]);
  }
  
  return ret;
}

function judgeAPoint1(index, array, con){
  
  if(con.p & con.a) return con;
  
  if(con.p) con.a = goRight(index, array);
  else if(con.a) con.p = goLeft(index, array);
  else {
    con.p = goLeft(index, array);
    con.a = goRight(index, array);
  }
  
  return con;
}

function goRight(index, array){
  let tempnow = array[index];
  
  for(let i = index; i < array.length; i++){
    if(tempnow < array[i]) return false;
    tempnow = array[i];
  }
  return true;
}

function goLeft(index, array){
  let tempnow = array[index];
  
  for(let i = index -1; i >=0; i--){
    if(tempnow < array[i]) return false;
    tempnow = array[i];
  }
  return true;
}

let mt = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]];
let mt1 = [[1,2,2]];

console.log(pacificAtlantic(mt));
//console.log(pacificAtlantic(mt1));