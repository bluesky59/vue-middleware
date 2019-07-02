async function process(arr) {
    arr.forEach(async i => {
        await doSomeing(i);
    })
}

const doSomeing = data => {
    setTimeout(() => {
        console.log(data * 1);
    }, 1000);
}

// console.log(process([ 1, 2, 3, 4, 5 ]));

// 正则表达式命名捕获组
// const reDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})/,
//     match  = reDate.exec('2018-04-30'),
//     year = match[1],
//     mouth = match[2],
//     day = match[3];
// console.log(year, mouth, day);

const regDay = /(?<year>[0-9]{4})-(?<mouth>[0-9]{2})-(?<day>[0-9]{2})/,
    match = regDay.exec('2019-07-02'),
    year = match.groups.year,
    mouth = match.groups.mouth,
    day = match.groups.day;
// console.log(year, mouth, day);

const
    reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
    d      = '2019-07-02',
    usDate = d.replace(reDate, '$<month>-$<day>-$<year>');

// console.log(usDate);

// 断言
const reLookAhead = /\D(?=\d+)/,    // 正向断言
    res = reLookAhead.exec('$123.9');

console.log(res[0]);

const reLookBehind = /(?<=\D)\d+/,
    result = reLookBehind.exec('$123.89');  // 反向断言

console.log(result[0]);