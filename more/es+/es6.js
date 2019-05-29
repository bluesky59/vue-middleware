// 类
class Animal {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    toString() {
        console.log(`name: ${this.name}, color: ${this.color}`);
    }
}

let animal = new Animal('dog', 'white');
// animal.toString();
// console.log(animal.hasOwnProperty('name'));
// console.log(animal.hasOwnProperty('toString'));
// console.log(animal.__proto__.hasOwnProperty('toString'));

// 箭头函数
// 1 解决this指向的问题，与外层函数指向同一个this，闭包
// 2 本质上并无this，是因为没有__proto__，这里又涉及到面向对象和函数式编程两种范式
// 3 与bind类似，每次被执行都返回一个新的函数引用，因此需要函数的引用去做一些别的事情时，比如卸载监听器，需要手动保存下这个引用

// 延展操作符  ---深拷贝
let json1 = {
    name: 'sky',
    age: 16,
    sex: 1,
    person: {
        name: 'sky1',
        age: 26,
        sex: 0,
    }
}

// let json2 = {...json1};
// json1.age = 20;
// console.log(json2);
// json2.name = 'bluesky';
// console.log(json1);
// console.log(json2);

let json2 = Object.assign(json1);
console.log(json2);
json1.age = 20;
console.log(json2);