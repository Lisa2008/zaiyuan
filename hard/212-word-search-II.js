/**
Given a 2D board and a list of words from the dictionary, find all words in the board.

Each word must be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

 

Example:

Input: 
board = [
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
]
words = ["oath","pea","eat","rain"]

Output: ["eat","oath"]
 

Note:

All inputs are consist of lowercase letters a-z.
The values of words are distinct.
*/

const trieNode = function(){
  this.children = {};
  this.end = false;
}

const Trie = function(){
  this.root = new trieNode();
}

Trie.prototype.insert = function(word){
  let root = this.root;
  
  for(let letter of word){
    if(!root.children[letter]){
      root.children[letter] = new trieNode();
    }
    
    root = root.children[letter];
  }
  
  root.end = true;
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  let trie = new Trie();
  let ret = [];
  
  for( let word of words){
    trie.insert(word);  
  }
  
  ret = find(board, trie, ret);
  
  return ret;
};

function find(board, trie, ret){
  let root = trie.root;
  
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      
      find1(board, i, j, root, [], ret);
    }
  }
  
  return ret;
}

function find1(board, x, y, node, visited, ret){
 
  let lenx = board.length;
  let leny = board[x].length;
  
  /*console.log(`x: ${x} y: ${y}`);
  console.log(node);
  console.log(visited);
  console.log(ret);*/
  
  
  for(let c of Object.keys(node.children)){
    if(c === board[x][y]){
      let visitedcur = [...visited];
      visitedcur.push({[c]: [x, y]});
      if(node.children[c].end) {
        let temps = getWord(visitedcur);
        if(ret.indexOf(temps) === -1) {
          ret.push(temps);
        }
        if(Object.keys(node.children[c].children) === 0) continue;
      }
      
      let findw = false;
      
      if((x + 1) < lenx && !isVisited(visited, [x + 1, y])) findw = find1(board, x + 1, y, node.children[c], visitedcur, ret);
      if((x - 1) >= 0 && !isVisited(visited, [x - 1, y]) && !findw) findw = find1(board, x - 1, y, node.children[c], visitedcur, ret);
      if((y + 1) < leny && !isVisited(visited, [x, y + 1]) && !findw) findw = find1(board, x, y + 1, node.children[c], visitedcur, ret);
      if((y - 1) >= 0 && !isVisited(visited, [x, y - 1]) && !findw) findw = find1(board, x, y - 1, node.children[c], visitedcur, ret);
    }
  }
  
  //console.log('\r\n');
}

function getWord(v){
  return v.reduce((acc,cur) => {
    for(let kk of Object.keys(cur)){
      acc = acc + kk;
    }
    return acc;
  }, '');
}

function isVisited(visited, cor){
  for(let obj of visited){
    for(let val of Object.values(obj)){
      if(val[0] === cor[0] && val[1] === cor[1]) return true;
    }
  }
  return false;
}

let board = [
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
];

let ws =  ["oath","pea","eat","rain"];

//console.log(findWords(board, ws));

let board1 = [['a', 'a']];
let ws1 = ['a'];

//console.log(findWords(board1, ws1));

let board2 = [['a', 'b'],
              ['c', 'd']];

let ws2 = ["ab","cb","ad","bd","ac","ca","da","bc","db","adcb","dabc","abb","acb"];
//console.log(findWords(board2, ws2));

let board3 = [['a', 'b'],
              ['a', 'a']];
let ws3 = ["aba","baa","bab","aaab","aaa","aaaa","aaba"]
              
console.log(findWords(board3, ws3));



