var reorderList = function(head) {
    if(typeof head === 'undefined' || !head) return head;
  if(typeof head.next === 'undefined' || !head.next) return head;
  
  let array = [];
  let index = 0;
  let node = head;
  
  while(node){
    array.push(node);
    node = node.next;
    index++;
  }
  
   let len = array.length - 1;
  
  for(index = 0; index <= Math.ceil(array.length / 2); index++){
    if((index % 2) === 0){
      array[index/2].next = array[len - (index/2)];  
    }else{
      array[len - Math.ceil(index/2) + 1].next = array[Math.ceil(index/2)];
    }
  }
  
  
  if((array.length % 2) === 1){
    array[len / 2].next = null;
    //array[array.length - len / 2].next = array[len/2];
    array[len / 2 + 1].next = array[len / 2];
  } else {
    array[array.length / 2].next = null;
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
