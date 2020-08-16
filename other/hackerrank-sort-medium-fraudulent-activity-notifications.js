function activityNotifications(expenditure, d) {
    if(!expenditure || expenditure.length === 0) return 0;
   
    let count = 0;
    let trail = expenditure.slice(0, d);
   
    trail.sort((a, b) => a - b);
    
    let len = expenditure.length;
    let avg;
    for(let i = d; i < len; i++){
      if(d%2 === 1) avg = trail[Math.floor(d/2)] * 2;
      else avg = (trail[d/2] + trail[d/2 -1]);
      
      if(expenditure[i] >= avg) count++;
      
      replaceEle(trail, expenditure[i - d], expenditure[i]);
    }
    return count;
  }
  
  function replaceEle(arr, removeNum, insertNum){
    let index = 0;
    let insterted = false;
    let removed = false;
    while(index < arr.length){
      if(!removed && arr[index] === removeNum){
        arr.splice(index, 1);
        removed = true;
      }else{
        if(!insterted){
          if(insertNum <= arr[index]) {
            arr.splice(index, 0, insertNum);
            insterted = true;
          }
        }
        if(removed && insterted) break;
        index++;
      }
    }
    
    if(!insterted) arr.push(insertNum);
    
  }
  