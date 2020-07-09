/**
Implement a trie with insert, search, and startsWith methods.

Example:

Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");   
trie.search("app");     // returns true
Note:

You may assume that all inputs are consist of lowercase letters a-z.
All inputs are guaranteed to be non-empty strings.

*/

let trieNode = function() {
  this.children = {};
  this.end = false;
}

var Trie = function() {
    this.root = new trieNode();
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let root = this.root;
  
  for(let letter of word){
    if(!root.children[letter]) {
      root.children[letter] = new trieNode();
    }
    root = root.children[letter];
  }
  root.end = true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let root = this.root;
  
  for(let letter of word){
    if(root.children[letter]) root = root.children[letter];
    else return false;
  }
  if(root.end) return true;
  else return false;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let root = this.root;
  
  for(let letter of prefix){
    if(root.children[letter]) root = root.children[letter];
    else return false;
  }
  
  return true;
};


let test = new Trie();
test.insert("apple");
console.log(test);

//console.log(test.search('apple'));
console.log(test.startsWith('spp'));