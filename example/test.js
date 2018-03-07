// test
import Adapter from "./src/adapter";
import data1 from './data1.js';
import data2 from './data1.js';

let promise1 = Promise.resolve(JSON.parse(data1));
let promise2 = Promise.resolve(JSON.parse(data2));

setTimeout(() => {
    new Adapter({
        a: promise1,
        b: promise2
    })
        .index([
            {
                targetPath: 'pathId',
                srcPath: 'a.data.children.+.attributes.pathId',
                correspond: false // 可选：将多项目标数据拼成数组后赋值给源数据
            },
            {
                targetPath: 'a.data.children.+.pid',
                srcPath: 'a.data.children.+.attributes.pathId'
            }
        ])
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
                path: 'a.data.children.+.id',   // 等长会一一对应
                value: ['ha', 'test', '99']
            },
            {
                path: 'a.data.children.+.id',
                callBack(value, index) {   // 可选
                    return value + index;
                }
            }
        ])
        .then(data => {
            console.log(data);
        });
}, 1000);