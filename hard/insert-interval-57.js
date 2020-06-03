/**
Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

**/

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  if(intervals === null || intervals.length === 0) return [newInterval];
  
  let output = [];
  if(newInterval[1] < intervals[0][0]) {
    intervals.unshift(newInterval);
    return intervals;
  }
  
  if(newInterval[0] > intervals[intervals.length - 1][1]){
    intervals.push(newInterval);
    return intervals;
  }
  
  let merg = false;
  let newiv = [];
  
  for(let i = 0; i < intervals.length; i++){
    if(!merg && (newInterval[0] > intervals[i][1])) {
      output.push(intervals[i]);
      continue;
    }
    
    if(!merg){
      if(newInterval[1] < intervals[i][0]){
        output.push(newInterval);
        output = output.concat(intervals.slice(i));
        return output;
      }
      newiv[0] = Math.min(newInterval[0], intervals[i][0]);
      newiv[1] = Math.max(newInterval[1], intervals[i][1]);
      merg = true;
      continue;
    }
    
    //merg === true
    
    if(intervals[i][0] > newInterval[1]){
      output.push(newiv);
      output = output.concat(intervals.slice(i));
      merg = false;
      break;;
    }
    
    else{
      newiv[1] = Math.max(newInterval[1], intervals[i][1]);
    }
  }
  
  if(merg) output.push(newiv);
  
  return output;
};

//console.log(insert([[1,3],[6,9]], [2,5])); //[[1,5],[6,9]]
//console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8])); //[[1,2],[3,10],[12,16]]
//console.log(insert([], [5,7])); //[[5,7]]
//console.log(insert([[1,5]], [2,3])); //[[1,5]]
//console.log(insert([[1,5]], [6,8])); //[[1,5], [6,8]]
//console.log(insert([[2,4],[5,7],[8,10],[11,13]], [3,6])); //[[2,7],[8,10],[11,13]]
console.log(insert([[3,5],[12,15]], [6,6])); //[[3,5],[6,6],[12,15]]