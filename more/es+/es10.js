// flat方法可以扁平化数组，同时可以去掉数组的空选项
let arr1 = [ 1, 2, 3, [4,5] ];
arr1.flat();

arr1.flatMap(data => [data * 2]);

