/**
Design a data structure that supports the following two operations:

void addWord(word)
bool search(word)
search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means it can represent any one letter.

Example:

addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search("bad") -> true
search(".ad") -> true
search("b..") -> true

*/

let trieNode = function() {
  this.children = {};
  this.end = false;
}
/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
    this.root = new trieNode();
};

/**
 * Adds a word into the data structure. 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    let root = this.root;
  
  for(let letter of word){
    if(!root.children[letter]){
      root.children[letter] = new trieNode();
    }
    
    root = root.children[letter];
  }
  
  root.end = true;
};

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter. 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word, root) {
  let rootnode = this.root;
   if(arguments[1] !== undefined) rootnode = root;
  
  for(let i = 0; i < word.length; i++){
    let letter = word.charAt(i);
    if( letter === '.') {
      word = word.slice(i + 1);
      for(let value of Object.values(rootnode.children)){
        if(this.search(word, value)) return true;
      }
      return false;
    }
    else if(rootnode.children[letter]){
      rootnode = rootnode.children[letter];
    }
    else return false;
  }
  
  return rootnode.end;

};

let test = new WordDictionary();

test.addWord('bad');
test.addWord('dad');
test.addWord('mad');

//console.log(test);

//console.log(test.search("pad"));// -> false
//console.log(test.search("bad")); // -> true
//console.log(test.search(".ad")); // -> true
console.log(test.search("b.."));// -> true