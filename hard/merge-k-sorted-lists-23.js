/**
Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

Example:

Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if(!Array.isArray(lists) || lists.length === 0 ) return null;
  if(lists.length === 1) return lists[0];
  
  let map = new Map();
  let newLink = null;
  let tempNode;
  let cur;
  
  for(let i = 0; i < lists.length; i++){
      if(lists[i]) map.set(i, lists[i]);
  }
  
  while(map.size > 0){
    tempNode = addToLink(map);
    if(!newLink) {
      newLink = Object.assign({}, tempNode);
      cur = newLink;
    }else{
      cur.next = Object.assign({}, tempNode);
      cur = cur.next;
    }
  }
  
  return newLink;
};


function addToLink(m){
  if(m.size === 0) return null;
  
  let current = null;
  
  for (const [i, value] of m.entries()){
    if(!value) {
      m.delete(i);
      continue;
    }
    
    if(!current) {
      current = {index: i, node: value};
      continue;
    }
    
    if(current.node.val > value.val){
      current.index = i;
      current.node = value;
    }
  }
  
  if(!current.node.next) m.delete(current.index);
  else m.set(current.index, current.node.next);
  
  return current.node;
}

let l1 = {val: 1, next: {val: 4, next: {val: 5, next: null}}};
let l2 = {val: 1, next: {val: 3, next: {val: 4, next: null}}};

console.log(mergeKLists([l1,l2]));