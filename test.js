// test
import Adapter from "./adapter";
import data1 from './data1.js';
import data2 from './data1.js';

let promise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(JSON.parse(data1))
    }, 1000);
});
let promise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(JSON.parse(data2))
    }, 1000);
});

setTimeout(() => {
    new Adapter({
        a: promise1,
        b: promise2
    })
        .remove(['a.message'])
        .index([
            {
                targetPath: 'a.testIndex',
                srcPath: 'b.data',
                move: true  // 可选
            }
        ])
        .value([
            {
                path: 'a.data.children.0.pid',
                value: ['ha', 'test']
            },
            {
                path: 'a.testValue',
                value: ['ha', 'test']
            },
            {
                path: 'a.testValue',
                callBack(value) {   // 可选
                    return [value[0] + '?', value[1] + '？'];
                }
            }
        ])
        .then(data => {
            console.log(data);
        });
}, 1000);