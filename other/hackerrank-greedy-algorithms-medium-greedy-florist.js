/**
A group of friends want to buy a bouquet of flowers. The florist wants to maximize his number of new customers and the money he makes. To do this, he decides he'll multiply the price of each flower by the number of that customer's previously purchased flowers plus . The first flower will be original price, , the next will be  and so on.

Given the size of the group of friends, the number of flowers they want to purchase and the original prices of the flowers, determine the minimum cost to purchase all of the flowers.

For example, if there are  friends that want to buy  flowers that cost  each will buy one of the flowers priced  at the original price. Having each purchased  flower, the first flower in the list, , will now cost . The total cost will be .

Function Description

Complete the getMinimumCost function in the editor below. It should return the minimum cost to purchase all of the flowers.

getMinimumCost has the following parameter(s):

c: an array of integers representing the original price of each flower
k: an integer, the number of friends
Input Format

The first line contains two space-separated integers  and , the number of flowers and the number of friends.
The second line contains  space-separated positive integers , the original price of each flower.

Constraints

Output Format

Print the minimum cost to buy all  flowers.

Sample Input 0

3 3
2 5 6
Sample Output 0

13
Explanation 0

There are  flowers with costs  and  people in the group. If each person buys one flower, the total cost of prices paid is  dollars. Thus, we print  as our answer.

Sample Input 1

3 2
2 5 6
Sample Output 1

15
Explanation 1

There are  flowers with costs  and  people in the group. We can minimize the total purchase cost like so:

The first person purchases  flowers in order of decreasing price; this means they buy the more expensive flower () first at price  dollars and the less expensive flower () second at price  dollars.
The second person buys the most expensive flower at price  dollars.
We then print the sum of these purchases, which is , as our answer.

Sample Input 2

5 3
1 3 5 7 9
Sample Output 2

29
Explanation 2

The friends buy flowers for ,  and ,  and  for a cost of .
*

function getMinimumCost(k, c) {
  if(!c || c.length === 0) return 0;
  
  c.sort((a, b) => b - a);
  let pur = new Array(k).fill(0);
  
  let len = c.length;
  let sum = 0;
  for(let i = 0; i < len; i++){
    sum += c[i] * (pur[i%k] + 1);
    pur[i%k]++;
  }
  
  console.log(pur)
  
  return sum;
  
}

let flowers = [ 2, 5, 6];

//console.log(getMinimumCost(3, flowers)); //13
//console.log(getMinimumCost(2, flowers)); //15
let flowers1 = [ 1, 3, 5, 7, 9 ];
//console.log(getMinimumCost(3, flowers1)); //29

let flowers2 = [390225, 426456, 688267, 800389, 990107, 439248, 240638, 15991, 874479, 568754, 729927, 980985, 132244, 488186, 5037, 721765, 251885, 28458, 23710, 281490, 30935, 897665, 768945, 337228, 533277, 959855, 927447, 941485, 24242, 684459, 312855, 716170, 512600, 608266, 779912, 950103, 211756, 665028, 642996, 262173, 789020, 932421, 390745, 433434, 350262, 463568, 668809, 305781, 815771, 550800];
console.log(getMinimumCost(3, flowers2)); //163578911
