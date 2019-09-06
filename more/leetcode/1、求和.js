// 1、两数之和

// 自己的解法：
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let res = [];
    nums.forEach((data, index) => {
        let $index = nums.indexOf(target - data);
        if ($index !== -1 && $index !== index) {
            res = [index, $index];
        }
    });
    return res;
};

// leetcode上大佬的思路：
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let res = {}

    for(let i = 0; i < nums.length; i++) {
        if(res[nums[i]] !== undefined)
            return [res[nums[i]], i]
        else
            res[target - nums[i]] = i
    }
}

// 要点：
// 1、边界取值和异常情况的考虑很重要