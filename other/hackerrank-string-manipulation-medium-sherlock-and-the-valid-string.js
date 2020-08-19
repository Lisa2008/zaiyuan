function isValid(s) {
  let map = new Map();
  
  let sum;
  for(let c of s) {
    sum = map.get(c) || 0;
    map.set(c, sum + 1);
  }
  
  let arr = Array.from(map.values());
//  console.log(arr);
  let map2 = new Map();
  
  for(let val of arr){
    sum = map2.get(val) || 0;
    map2.set(val, sum + 1);
  }
  
 // console.log(map2);
  
  if(map2.size === 1) return 'YES';
  if(map2.size > 2) return 'NO';
  
  let keys = Array.from(map2.keys());
  
  if((keys[0] === 1 && map2.get(keys[0]) === 1) || (keys[1] === 1 && map2.get(keys[1]) === 1)) return 'YES';
  
  if(Math.abs(keys[0] - keys[1]) > 1) return 'NO';
  
  let val0 = map2.get(keys[0]);
  let val1 = map2.get(keys[1]);
  
  if((keys[0] > keys[1] &&  val0 === 1) || (keys[1] > keys[0] &&  val1 === 1)) return 'YES';
  
   return 'NO';
}

console.log(isValid('aabbcd')); //NO
console.log(isValid('abcc')); //YES
console.log(isValid('abc')); //YES
console.log(isValid('aabbccddeefghi')); //NO
console.log(isValid('abcdefghhgfedecba')); //YES
console.log(isValid('aabbc')); //YES

let ss = 'ibfdgaeadiaefgbhbdghhhbgdfgeiccbiehhfcggchgghadhdhagfbahhddgghbdehidbibaeaagaeeigffcebfbaieggabcfbiiedcabfihchdfabifahcbhagccbdfifhghcadfiadeeaheeddddiecaicbgigccageicehfdhdgafaddhffadigfhhcaedcedecafeacbdacgfgfeeibgaiffdehigebhhehiaahfidibccdcdagifgaihacihadecgifihbebffebdfbchbgigeccahgihbcbcaggebaaafgfedbfgagfediddghdgbgehhhifhgcedechahidcbchebheihaadbbbiaiccededchdagfhccfdefigfibifabeiaccghcegfbcghaefifbachebaacbhbfgfddeceababbacgffbagidebeadfihaefefegbghgddbbgddeehgfbhafbccidebgehifafgbghafacgfdccgifdcbbbidfifhdaibgigebigaedeaaiadegfefbhacgddhchgcbgcaeaieiegiffchbgbebgbehbbfcebciiagacaiechdigbgbghefcahgbhfibhedaeeiffebdiabcifgccdefabccdghehfibfiifdaicfedagahhdcbhbicdgibgcedieihcichadgchgbdcdagaihebbabhibcihicadgadfcihdheefbhffiageddhgahaidfdhhdbgciiaciegchiiebfbcbhaeagccfhbfhaddagnfieihghfbaggiffbbfbecgaiiidccdceadbbdfgigibgcgchafccdchgifdeieicbaididhfcfdedbhaadedfageigfdehgcdaecaebebebfcieaecfagfdieaefdiedbcadchabhebgehiidfcgahcdhcdhgchhiiheffiifeegcfdgbdeffhgeghdfhbfbifgidcafbfcd';

console.log(isValid(ss)); //YES

console.log(isValid('aaaabbcc')); //NO


