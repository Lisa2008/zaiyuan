/**
Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.

Example 1:

Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
Output: [1,2,3,6,9,8,7,4,5]
Example 2:

Input:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
*/

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if(typeof matrix === 'undefined' || !Array.isArray(matrix)) return [];
  if(matrix.length === 0) return [];
  if(matrix.length === 1) return matrix[0];
  
  let ret = [];
  
  while(matrix.length > 0){
    ret = peelMatrix(matrix, ret);
  }
  
  return ret;
};

function peelMatrix(m, a){
  a = a.concat(m[0]);
  m.shift();
  
  if(checkMatrix(m)) return a;
  
  for(let i = 0; i < m.length - 1; i++){
    a.push(m[i][m[i].length -1]);
    m[i].pop();
  }
  
  if(checkMatrix(m)) return a;
  
  let len = m[m.length - 1].length -1;
  
  for(let i = len; i >= 0; i--){
    a.push(m[m.length -1][i]);
  }
  m.pop();
  
  if(checkMatrix(m)) return a;
  
  len = m.length -1;
  
  for(let i = len; i >= 0; i--){
    a.push(m[i][0]);
    m[i].shift();
  }
  
  if(checkMatrix(m)) return a;
  
  return a;
  
}

function checkMatrix(m){
  if(m.length === 0) return true;
  
  let index = 0;
  
  while(index < m.length){
    if(m[index].length === 0) m.splice(index,1);
    else index++;
  }
  
  if(m.length === 0) return true;
  else return false;
}

let m1 = [
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
];


console.log(spiralOrder(m1)); // [1,2,3,6,9,8,7,4,5]
