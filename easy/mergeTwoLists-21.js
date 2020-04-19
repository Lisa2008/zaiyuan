/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if(l1 === null && l2 === null) return null;
    if(l1 === null) return l2;
    if(l2 === null) return l1;
    
    let a = []
    pushToArray(l1, a);
    pushToArray(l2, a);
    
    a.sort((a,b) => a.val - b.val);
    
    let l3 = a[0];
    l3.next = a[1];
    for(let i = 1; i < a.length; i++){
        let newL = a[i];
        if(i === (a.length -1)) newL.next = null;
        else newL.next = a[i+1];
    }
    
    return l3;
};

function pushToArray(l, a){
    a.push(l);
    if(l.next !== null) pushToArray(l.next, a);
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists1 = function(l1, l2) {
    if(l1 === null && l2 === null) return null;
    if(l1 === null) return l2;
    if(l2 === null) return l1;
    
    let l3;
    if(l1.val <= l2.val) {
      l3 = l1;
      sortLinkNode(l1.next,l2,l3);  
    }
    else{
      l3 = l2;
      sortLinkNode(l1,l2.next,l3);  
    }
  
    return l3;
};

function sortLinkNode(l1,l2,l3){
    if(l1 == null) {
        l3.next = l2;
        return;
    }
    if(l2 == null){
        l3.next = l1;
        return;
    }
    if(l1.val <= l2.val){
        l3.next = l1;
        sortLinkNode(l1.next, l2,l3.next);
    }
    else{
        l3.next = l2
        sortLinkNode(l1, l2.next, l3.next);
    }
}
    


