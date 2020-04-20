/*Reverse a singly linked list.

Example:

Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
Follow up:

A linked list can be reversed either iteratively or recursively. Could you implement both?
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(head === null || head.next === null) return head;
    
    let l1 = head.next;
    head.next = null;
    
    return reverse(head,l1)
};

function reverse(l1, l2){
    let l3 = l2.next;
    l2.next = l1;
    if(l3 === null) return l2;
    else return reverse(l2,l3);
}