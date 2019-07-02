const obj = {
    a: 1,
    b: 2,
    c: 3
}

const keys = Object.keys(obj);
const vals = Object.values(obj);
// console.log(keys);
// console.log(vals);

for(let [key, val] of Object.entries(obj)) {
    // console.log(`key: ${key} val: ${val}`);
}

// string padding 字符串填充，将原始字符串按照约定填充
console.log('9'.padStart(2, '0'));
// console.log('0.0'.padStart(20));
console.log('0.0'.padEnd(4, '0'));
// console.log('0.0'.padEnd(10, '1'));

const obj2 = {
    name: 'Jane',
    get age() {
        return 18;
    }
}
// console.log(Object.getOwnPropertyDescriptors(obj));  // 返回对象的所有自身属性的描述符
// console.log(Object.getOwnPropertyDescriptors(obj2));

