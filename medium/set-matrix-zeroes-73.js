/**
Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

Example 1:

Input: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
Output: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
Example 2:

Input: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
Output: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
Follow up:

A straight forward solution using O(mn) space is probably a bad idea.
A simple improvement uses O(m + n) space, but still not the best solution.
Could you devise a constant space solution?

**/
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    if(typeof matrix === 'undefined' || !Array.isArray(matrix)) return [];
  if(matrix.length === 0) return [];
  
  let obj = {row: new Set(), col: new Set};
  
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      if(matrix[i][j] === 0){
        obj.row.add(i);
        obj.col.add(j);
      }
    }
  }
  
  obj.row.forEach( value => {
    matrix[value].fill(0);
  });
  
  obj.col.forEach( value => {
    for(let i = 0; i < matrix.length; i++){
      matrix[i][value] = 0;
    }
  });
  
  return matrix;
};

let m1 = [
  [1,1,1],
  [1,0,1],
  [1,1,1]
];

console.log(setZeroes(m1)); //
/*[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]*/