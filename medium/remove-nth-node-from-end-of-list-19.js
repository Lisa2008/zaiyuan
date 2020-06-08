/**
Given a linked list, remove the n-th node from the end of list and return its head.

Example:

Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
Note:

Given n will always be valid.

Follow up:

Could you do this in one pass?
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    if(typeof head === 'undefined' || !head) return head;
  
  if((typeof head.next === 'undefined' || !head.next) && n === 1) return null;
  
  let map = new Map();
  let node = head;
  let index = 0;
  
  while(node){
    map.set(index, node);
    node = node.next;
    index++;
  }
    
  if(index === n) return head.next;
    
  map.get(index - n - 1).next = map.get(index - n).next;
  
  return head;
}; 

let l1 = {val: 1, next: {val: 4, next: {val: 5, next: null}}};
let l2 = {val: 1, next: null};
let l3 = {val: 1, next: {val: 2, next: null}};

//console.log(removeNthFromEnd(l1, 1));
//console.log(removeNthFromEnd(l2, 1));
console.log(removeNthFromEnd(l3, 2));
