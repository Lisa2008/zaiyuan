/**
Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example:

board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

Given word = "ABCCED", return true.
Given word = "SEE", return true.
Given word = "ABCB", return false.
 

Constraints:

board and word consists only of lowercase and uppercase English letters.
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3

**/

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    if(typeof board === 'undefined' || !Array.isArray(board)) return false;
  if(board.length === 0 || word === '') return false;
  
  let worda = word.split('');
  let find = [];
  
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      board[i][j] = board[i][j];
      if(board[i][j] === worda[0]){
        find.push({parent: [], x: i, y: j, next: 1});
      }
    }
  }
  
  
  let index = 1;
  let temp;
  
  while(find.length > 0 && index < worda.length){
    temp = find1(board, find.shift(), worda[index], index);
    find = temp.concat(find);  
    if(temp.length > 0) index = temp[0].next;
    else if(find.length > 0) index = find[0].next;
    else index = 0;
  }
  
  if(index === worda.length && find.length > 0) return true;
  else return false;
  
};

function find1(board, obj, char, index){
  let ret = [];
  let tempparent = obj.parent;
  tempparent.push([obj.x, obj.y]);
  
  if(obj.x - 1 >= 0 && board[obj.x -1][obj.y] === char && (obj.parent=== 0 || !find2(obj.parent, [obj.x -1, obj.y]))) ret.push({parent: [...tempparent], x: obj.x -1, y: obj.y, next: index + 1});
  
  if(obj.x + 1 < board.length && board[obj.x +1][obj.y] === char && (obj.parent=== 0 || !find2(obj.parent, [obj.x +1, obj.y]))) ret.push({parent: [...tempparent], x: obj.x +1, y: obj.y, next: index + 1});
  
  if(obj.y - 1 >= 0 && board[obj.x][obj.y - 1] === char && (obj.parent=== 0 || !find2(obj.parent, [obj.x, obj.y -1]))) ret.push({parent: [...tempparent], x: obj.x, y: obj.y - 1, next: index + 1});
  
  if(obj.y + 1 < board[obj.x].length && board[obj.x][obj.y + 1] === char && (obj.parent=== 0 || !find2(obj.parent, [obj.x , obj.y + 1]))) {
    ret.push({parent: [...tempparent], x: obj.x, y: obj.y + 1, next: index + 1});
  }
  
  
  return ret;
  
}

function find2(a1, a2){
  for(let i = 0; i < a1.length; i++){
    if(a1[i][0] === a2[0] && a1[i][1] === a2[1]) return true;
  }
  return false;
}

let board1 =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];

let board2 = [['a']];

let board3 = [['a','a']];

let board4 = [
  ["F","Y","C","E","N","R","D"],
  ["K","L","N","F","I","N","U"],
  ["A","A","A","R","A","H","R"],
  ["N","D","K","L","P","N","E"],
  ["A","L","A","N","S","A","P"],
  ["O","O","G","O","T","P","N"],
  ["H","P","O","L","A","N","O"]];

let board5 = [["a","a","a","a"],
              ["a","a","a","a"],
              ["a","a","a","a"]]


//console.log(exist(board1,'SEE')); //true
//console.log(exist(board1,'ABCCED')); //true
//console.log(exist(board1,'ABCB')); //false
//console.log(exist(board2,'b')); //false
//console.log(exist(board3,'aaa')); //false
//console.log(exist(board4,'poland')); //false
console.log(exist(board5,"aaaaaaaaaaaaa")); //false