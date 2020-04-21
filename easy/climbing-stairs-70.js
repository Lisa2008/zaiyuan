/*
You are climbing a stair case. It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Note: Given n will be a positive integer.

Example 1:

Input: 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
*/

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n === 1 || n=== 2) return n;
    let count = 1;
    
    let c1 = n%2;
    for(let i = 1; i <= n/2; i++){
        count += tempsteps(i, ((Math.floor(n/2) - i) * 2 + c1));
    }
    
    return count;
};

function tempsteps(n2,n1){
    return factorialize(n2 + n1) / (factorialize(n2) * factorialize(n1));
}

function factorialize(n){
    if(n < 0) return -1;
    else if (n === 0) return 1;
    else return (n * factorialize( (n - 1)));
}