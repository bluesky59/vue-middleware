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

var reverse = function(x) {
    // 自己的解法
    // let str = x.toString(), res = 0;
    // if (str[0] === '+' || str[0] === '-') {
    //     res = str.substr(0, 1) + [...str.substr(1)].reverse().join('');
    // } else {
    //     res = [...str].reverse().join('');
    // }
    // res = res < (-2)**31 || res > (2**31)-1 ? 0 : res;
    // return parseInt(res);

    // 别人的解法
    let re=x>=0 ? Number.parseInt(x.toString().split('').reverse().join('')) : Number.parseInt('-'+x.toString().split('').reverse().join('').slice(0))
    re=re<(-2)**31 || re>(2**31)-1 ? 0 : re
    return re;
};

// 要点： 先计算出结果再考虑溢出！！！
// console.log(reverse(123));
// console.log(reverse(-123));
// console.log(reverse(120));
// console.log(reverse(Math.pow(2, 32)));
// console.log(reverse(1534236469));

const plusOne = function(digits) {
    for (let i = digits.length -1; i >= 0; i--){
        if (digits[i] !== 9) {
            digits[i] += 1;
            return digits;
        } else {
            digits[i] = 0;
        }
    }
    return [1].concat(digits);
};
// 原本自作聪明把数组转成整数+1再转换成数组处理，其实没有考虑溢出的问题，不如直接在数组上运算，从最后一位开始+1，全都为9的话考虑新建数组

// console.log(plusOne([1,2,3]));
// console.log(plusOne([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]));
// console.log(plusOne([9,9]));

var isPalindrome = function(x) {
    // 解法一
    // let str = x.toString();
    // let str1 = '';
    // for (let i = str.length -1; i >= 0; i--) {
    //     str1 += str[i];
    // }
    // return str === str1;
    // 解法二
    return x.toString() === [...x.toString()].reverse().join('');
};

// console.log(isPalindrome(121));
// console.log(isPalindrome(-121));
// console.log(isPalindrome(10));

var longestCommonPrefix = function(strs) {
    strs = strs.sort();
    let strFirst = strs[0], pubStr = '';
    switch (strs.length) {
        case 0: {
            return '';
        }
        case 1: {
            return strFirst;
        }
        default: {
            for (let i = 0; i < strFirst.length; i++) {
                for (let j =  1; j < strs.length; j++) {
                    if(strFirst[i] !== strs[j][i]){
                        return pubStr;
                    }
                }
                pubStr += strFirst[i];
            }
            return pubStr;
        }
    }
};

console.log(longestCommonPrefix(["flower","flow","flight"]));
console.log(longestCommonPrefix(["dog","racecar","car"]));




