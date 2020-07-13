/**
Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.

For example,
[2,3,4], the median is 3

[2,3], the median is (2 + 3) / 2 = 2.5

Design a data structure that supports the following two operations:

void addNum(int num) - Add a integer number from the data stream to the data structure.
double findMedian() - Return the median of all elements so far.
 

Example:

addNum(1)
addNum(2)
findMedian() -> 1.5
addNum(3) 
findMedian() -> 2
 

Follow up:

If all integer numbers from the stream are between 0 and 100, how would you optimize it?
If 99% of all integer numbers from the stream are between 0 and 100, how would you optimize it?

*/
var LinkedList = function(val, next){
  this.value = val;
  this.next = next;
}
/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
  this.left = {top: null, len: 0};
  this.right = {top: null, len: 0};
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  let ll = new LinkedList(num, null);
  
  if(!this.left.top && !this.right.top){
    this.left.top = ll;
    this.left.len++;
  }else{
    let cur;
    let inserted = false;
    if(this.left.top && num < this.left.top.value){
      cur = this.left.top;
      inserted = false;
      while(!inserted) {
        
        if(!cur.next) {
          cur.next = ll;
          inserted = true;
        }
        
        else{
         if(num >= cur.next.value){
           ll.next = cur.next;
           cur.next = ll;
           inserted = true;
         }else{
           cur = cur.next;
         }
        }
        if(inserted) this.left.len++;
      }
    }
    
    else if(this.right.top && num >= this.right.top.value){
      cur = this.right.top;
      inserted = false;
      while(!inserted) {
        
        if(!cur.next) {
          cur.next = ll;
          inserted = true;
        }
        
        else{
         if(num < cur.next.value){
           ll.next = cur.next;
           cur.next = ll;
           inserted = true;
         }else{
           cur = cur.next;
         }
        }
        if(inserted) this.right.len++;
      }
    }
    
    else if(!this.left.top && num < this.right.top.value){
      this.left.top = ll;
      this.left.len++;
    }
    
    else if(!this.right.top && num >= this.left.top.value){
      this.right.top = ll;
      this.right.len++;
    }
    
    else if(this.left.top && this.right.top && (num >= this.left.top.value && num < this.right.top.value)){
      ll.next = this.right.top;
      this.right.top = ll;
      this.right.len++;
    }
    
  }
  
  if(Math.abs(this.left.len - this.right.len) > 1){
    let templl;
    if(this.left.len > this.right.len){
      templl = this.left.top;
            
      this.left.top = this.left.top.next;
      
      templl.next = this.right.top;
      this.right.top = templl;
      
      this.left.len--;
      this.right.len++;
    }
    else{
      templl = this.right.top;
      this.right.top = this.right.top.next;
      
      templl.next = this.left.top;
      this.left.top = templl;
      
      this.left.len++;
      this.right.len--;
    }
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  if(this.left.len !== this.right.len) 
    return (this.left.len > this.right.len) ? this.left.top.value : this.right.top.value;
  else return (this.left.top.value + this.right.top.value) / 2;
};


let test = new MedianFinder();

test.addNum(6);
console.log(test.findMedian());
test.addNum(10);
console.log(test.findMedian());
test.addNum(2);
console.log(test.findMedian());
test.addNum(6);
console.log(test.findMedian());
test.addNum(5);
console.log(test.findMedian());