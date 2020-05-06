/*
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container and n is at least 2.
*/

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let len = height.length;
    if(len <= 1) return 0;
    if(len === 2) return 1 * Math.min(...height);
    
    let cur = 0;
    let start;
    while( height.length > 2 ){
      start = height.shift();
      cur = Math.max(cur,(height.length * Math.min(start, height[height.length -1])));
      for(let i = (height.length - 2); i >= 0; i--){
        if(height[i] < height[i + 1]) continue;
        cur = Math.max(cur, ((i + 1) * Math.min(start, height[i])));
      }
    }
  
  return cur;
  
};

