/**
Given a collection of intervals, merge all overlapping intervals.

Example 1:

Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
**/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 var merge = function(intervals) {
    if(!intervals || intervals.length === 0) return [];
  if(intervals.length === 1) return intervals;
  
  intervals.sort((a,b) => a[0] - b[0]);
  
  let output = [];
  let merg = false;
  let newiv = [];
  
  while(intervals.length > 0){
    for(let i = 0; i < intervals.length; i++) {
      if(!merg && (i + 1) === intervals.length){
        output.push(intervals[i]);
        intervals = [];
        break;
      }
                    
      if(!merg && intervals[i + 1][0] <= intervals[i][1]){
        newiv[0] = Math.min(intervals[i][0], intervals[i+1][0]);
        newiv[1] = Math.max(intervals[i][1], intervals[i+1][1]);
        merg = true;
        continue;
      }
      
      if(!merg && intervals[i + 1][0] > intervals[i][1]){
        output.push(intervals[i]);
        intervals = intervals.slice(i + 1);
        break;
      }
      
      if(merg){
        if(intervals[i][0] <= newiv[1]){
          newiv[0] = Math.min(intervals[i][0], newiv[0]);
          newiv[1] = Math.max(intervals[i][1], newiv[1]);
          continue;
        } else {
          output.push([...newiv]);
          merg = false;
          intervals = intervals.slice(i);
          break;
        }
      }
    }
    
    if(merg) {
      newiv[0] = Math.min(newiv[0], intervals[intervals.length -1][0]);
      newiv[1] = Math.max(newiv[1], intervals[intervals.length -1][1]);
      output.push(newiv);
      intervals = [];
    }
  }
  
  
  return output;
};

//console.log(merge([[1,3],[2,6],[8,10],[15,18]])); //[[1,6],[8,10],[15,18]]
//console.log(merge([[1,4],[4,5]])); //[[1,5]]
//console.log(merge([[1,4],[0,0]])); //[[0,0],[1,4]]
console.log(merge([[2,3],[2,2],[3,3],[1,3],[5,7],[2,2],[4,6]])); //[[1,3],[4,7]]