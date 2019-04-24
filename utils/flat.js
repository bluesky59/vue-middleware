let arr = [ 1, 2, 3, 4, 5, 6 ];

// 数组根据指定层级扁平化
const arrFlat = (arr, num = 1) => {
    switch (num){
        case 1: {
            return arr.reduce((prev, curr) => {
                return prev.concat(curr);
            }, []);
        }
        case 'infinite': {
            return arr.reduce((prev, curr) => {
                return prev.concat(Array.isArray(curr) ? arrFlat(curr, 'infinite') : curr);
            }, []);
        }
        default: {
            return arr.reduce((prev, curr) => {
                return prev.concat(Array.isArray(curr) ? arrFlat(curr, --num) : curr);
            }, []);
        }
    }
}

// console.log(arrFlat(arr, 1));
// console.log(arrFlat(arr, 2));
// console.log(arrFlat(arr, 'infinite'));

// 有序数组变成随机无序数组
const arrSort = (arr) => {
    return arr.sort(() => {
        return Math.random() - 0.5;
    })
}

// console.log(arrSort(arr));

// 防抖
const throttle = () =>{

}

// 去掉空格

// 时间格式化




