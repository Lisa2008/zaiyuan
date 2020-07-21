/**
Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.
For example,
Given [[0, 30],[5, 10],[15, 20]],
return 2.
*/

function minMeetingRooms(intervals){
  if(intervals.length <=1 ) return intervals.length;
  
  intervals = intervals.sort((a,b) => a[0] - b[0]);
  
  let map = new Map();
  let index = 0;
  map.set(index, intervals[0][1]);
  let found = false;
  
  for(let i = 1; i < intervals.length; i++){
    found = false;
    for(let v of map){
      if(intervals[i][0] >= v[1]){
        found = true;
        map.set(v[0], intervals[i][1]);
        break;
      }
    }
    if(!found){
      index++;
      map.set(index, intervals[i][1]);
    }
  }

  return map.size;
}

//console.log(minMeetingRooms([[0, 30],[5, 10],[15, 20]]));
console.log(minMeetingRooms([[0, 30],[5, 10],[10,20],[15, 20]]));