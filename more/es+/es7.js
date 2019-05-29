// Array.prototype.includes() 用于判断数组是否包含一个特定的值，有返回true否则为false
// arr.includes(x) == arr.indexOf(x) >= 0

// 指数操作符
// 以下三种等价

const calculateExponent = (base, exponent) => {
    if (exponent === 1) {
        return base;
    } else {
        return base * calculateExponent(base, --exponent);
    }
}

console.log(calculateExponent(2, 10));
console.log(Math.pow(2, 10));
console.log(2**10);