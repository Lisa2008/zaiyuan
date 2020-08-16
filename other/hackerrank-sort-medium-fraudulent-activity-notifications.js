function activityNotifications(expenditure, d) {
    if(!expenditure || expenditure.length === 0) return 0;
   
    let count = 0;
    let feq = [];
    let len = expenditure.length;
    let tempn;
    let mid;
    let odd = false;
    if(d%2 === 1){
      odd = true;
      mid = Math.round(d/2);
    }else{
      mid = d/2;
    }

    for(let i = 0; i < len; i++){
      if(i >= d){
        if(expenditure[i] >= getMid(feq, mid, odd))  count++;

        tempn = feq[expenditure[i - d]];
        feq[expenditure[i - d]] = tempn - 1;
      }
      tempn = feq[expenditure[i]] || 0;
      feq[expenditure[i]] = tempn + 1;
    }

    return count;
   }
  
  function getMid(arr, mid, odd){
    let len = arr.length;
    let sum = 0;
    let part1 = null;
    for(let i = 0; i < len; i++){
      sum += (arr[i] || 0);
      if(odd){
        if(sum >= mid){
          return i * 2;
        }
        
      }else{
        if(part1 === null){
          if(sum === mid) part1 = i;
          if(sum > mid) return i*2;
        }else{
          if(sum > mid) return part1 + i;
        }
      }
    }
  }

let exp1 = [10,20,30,40,50];
//console.log(activityNotifications(exp1, 3));

let exp2 = [2, 3, 4, 2, 3, 6, 8, 4, 5];
console.log(activityNotifications(exp2, 5));