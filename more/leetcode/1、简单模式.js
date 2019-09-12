// 1、两数之和

// 自己的解法：
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var twoSum = function(nums, target) {
//     let res = [];
//     nums.forEach((data, index) => {
//         let $index = nums.indexOf(target - data);
//         if ($index !== -1 && $index !== index) {
//             res = [index, $index];
//         }
//     });
//     return res;
// };

// leetcode上大佬的思路：
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var twoSum = function(nums, target) {
//     let res = {}
//
//     for(let i = 0; i < nums.length; i++) {
//         if(res[nums[i]] !== undefined)
//             return [res[nums[i]], i]
//         else
//             res[target - nums[i]] = i
//     }
// }

// 要点：
// 1、边界取值和异常情况的考虑很重要

// 2、罗马数字转整数
// 自己的解法
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const map = new Map([
        ['I', () => { return 1; }],
        ['V', () => { return 5; }],
        ['X', () => { return 10; }],
        ['L', () => { return 50; }],
        ['C', () => { return 100; }],
        ['D', () => { return 500; }],
        ['M', () => { return 1000; }],
        ['IV', () => { return 4; }],
        ['IX', () => { return 9; }],
        ['XL', () => { return 40; }],
        ['XC', () => { return 90; }],
        ['CD', () => { return 400; }],
        ['CM', () => { return 900; }],
    ]);
    let res = [];
    for (let i = 0; i< s.length; i+=2) {
        try {
            const str = s[i] + s[i+1];
            res.push(map.get(str)());
        } catch {
            res.push(map.get(s[i])());
            i--;
        }
    }
    let data = res.reduce((curr, sum) => {
        return curr + sum;
    }, 0);
    return data;
};

// console.log(romanToInt('III'));
// console.log(romanToInt('IV'));
// console.log(romanToInt('IX'));
// console.log(romanToInt('LVIII'));
// console.log(romanToInt('MCMXCIV'));


