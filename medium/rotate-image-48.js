/**
You are given an n x n 2D matrix representing an image.

Rotate the image by 90 degrees (clockwise).

Note:

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

Example 1:

Given input matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

rotate the input matrix in-place such that it becomes:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
Example 2:

Given input matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

rotate the input matrix in-place such that it becomes:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]

*/
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    if(typeof matrix === 'undefined' || !Array.isArray(matrix)) return [];
  if(matrix.length <= 1) return matrix;
  
  let size = matrix.length;
  let index = 0;
  
  while(size >1){
    rotate1(matrix, index);
    size = size - 2;
    index++;    
  }
  
  return matrix;
};

function rotate1(m, index){
  
  let obj= {up: m[index].slice(index,(m[0].length -index)),
            bottom: m[m.length -1 - index].slice(index,(m[0].length -index)),
            left: [],
            right: []};
  
  for(let i = index; i < m.length - index; i++){
    obj.left.push(m[i][index]);
    obj.right.push(m[i][m[i].length -1 -index]);
  }
  
  obj.left = obj.left.reverse();
  obj.right = obj.right.reverse();
  
  m[index].splice(index, m[index].length - index * 2, ...obj.left);
  m[m.length - 1 - index].splice(index, m[index].length - index * 2, ...obj.right);
  
  for(let i = index; i< m.length - index; i++){
    m[i][m[i].length -1 - index] = obj.up[i - index];
    m[i][index]=obj.bottom[i - index];
  }
  
}
let m1 = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

let m2 = [
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
]

let m3 = [[4,8],[3,6]];

//console.log(rotate(m1));
/*
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]*/

console.log(rotate(m2));
/*
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]*/

//console.log(rotate(m3));