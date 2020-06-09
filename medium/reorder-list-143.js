/**
Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

You may not modify the values in the list's nodes, only nodes itself may be changed.

Example 1:

Given 1->2->3->4, reorder it to 1->4->2->3.
Example 2:

Given 1->2->3->4->5, reorder it to 1->5->2->4->3.

**/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    if(typeof head === 'undefined' || !head) return head;
  if(typeof head.next === 'undefined' || !head.next) return head;
  
  let array = [];
  let index = 0;
  let node = head;
  
  while(node){
    array.push(node);
    node = node.next;
    array[array.length -1].next = null;
    index++;
  }
  
   let len = array.length - 1;
  
  for(index = 0; index < array.length; index++){
    if((index % 2) === 0){
      if(index === len) array[index/2].next = null;
      else array[index/2].next = array[len - (index/2)];  
    }else{
      if(index === len) array[len - Math.ceil(index/2) + 1].next = null;
      else array[len - Math.ceil(index/2) + 1].next = array[Math.ceil(index/2)];
    }
  }
  
  return head;
};

let l1 = {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: null}}}};
let l2 = {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: {val: 5, next: null}}}}};
let l3 = {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: {val: 5, next: 
                                                                      {val: 6, next:{val: 7, next: null}}}}}}};

console.log(reorderList(l1));
//console.log(reorderList(l2));
//console.log(reorderList(l3));
