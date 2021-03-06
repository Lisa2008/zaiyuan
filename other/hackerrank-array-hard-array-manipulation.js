/**

Starting with a 1-indexed array of zeros and a list of operations, for each operation add a value to each of the array element between two given indices, inclusive. Once all operations have been performed, return the maximum value in your array.

For example, the length of your array of zeros . Your list of queries is as follows:

    a b k
    1 5 3
    4 8 7
    6 9 1
Add the values of  between the indices  and  inclusive:

index->	 1 2 3  4  5 6 7 8 9 10
	[0,0,0, 0, 0,0,0,0,0, 0]
	[3,3,3, 3, 3,0,0,0,0, 0]
	[3,3,3,10,10,7,7,7,0, 0]
	[3,3,3,10,10,8,8,8,1, 0]
The largest value is  after all operations are performed.

Function Description

Complete the function arrayManipulation in the editor below. It must return an integer, the maximum value in the resulting array.

arrayManipulation has the following parameters:

n - the number of elements in your array
queries - a two dimensional array of queries where each queries[i] contains three integers, a, b, and k.
Input Format

The first line contains two space-separated integers  and , the size of the array and the number of operations.
Each of the next  lines contains three space-separated integers ,  and , the left index, right index and summand.

Constraints

Output Format

Return the integer maximum value in the finished array.

Sample Input

5 3
1 2 100
2 5 100
3 4 100
Sample Output

200
Explanation

After the first update list will be 100 100 0 0 0.
After the second update list will be 100 200 100 100 100.
After the third update list will be 100 200 200 200 100.
The required answer will be 200.

*/

//timeout
function arrayManipulation(n, queries) {
  if(n === 0 || !queries || queries.length === 0) return 0;
  
  let arr = new Array(n).fill(0);
  let max = null;
  
  for(let item of queries){
    for(let i = item[0] - 1;  i < item[1]; i++){
      arr[i] += item[2];
      if(!max) max = arr[i];
      else max = arr[i] > max ? arr[i]: max;
    }
  }
  
  return max;
}

console.log(arrayManipulation(5, [ [ 1, 2, 100 ], [ 2, 5, 100 ], [ 3, 4, 100 ] ]));

//timeout
function arrayManipulation(n, queries) {
  if(n === 0 || !queries || queries.length === 0) return 0;
  
  let max = queries[0][2];
  let map = new Map();
  let sum;
  
  for(let item of queries){
    for(let i = item[0] -1; i < item[1]; i++){
      sum = (map.get(i) || 0) + item[2];
      max = sum > max? sum: max;
      map.set(i, sum);
    }
  }
  
  return max;
}

//final version
function arrayManipulation(n, queries) {
  if(n === 0 || !queries || queries.length === 0) return 0;
  
  let arr = new Array(n + 1).fill(0);
  
  for(let item of queries){
    arr[item[0] -1] += item[2];
    arr[item[1]] += -item[2];
  }
  
  let max = null;
  let sum;
  for(let i of arr){
    if(!max) {
      max = i;
      sum = i;
    }
    else{
      sum += i;
      max = max > sum? max: sum;
    }
    
  }
  return max;
}