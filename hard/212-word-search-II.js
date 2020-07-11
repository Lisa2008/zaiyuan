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
  
  
  for( let word of words){
    trie.insert(word);  
  }
  
  
};

let board = [
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
];

let ws =  ["oath","pea","eat","rain"];

console.log(findWords([], ws));


