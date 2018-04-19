import Adapter, {DataAdapter} from "../src/index";
import data1 from './data1.js';
import data2 from './data2.js';

let promise1 = Promise.resolve(JSON.parse(data1));
let promise2 = Promise.resolve(JSON.parse(data2));

new DataAdapter(
    {
        a: JSON.parse(data1),
        b: JSON.parse(data2)
    },
    {
        index: [
            {
                toPath: 'pathId',
                fromPath: 'a.data.children.[].attributes.pathId',
                correspond: false // 可选：将多项目标数据拼成数组后赋值给源数据
            },
            {
                toPath: 'a.data.children.[].pid',
                fromPath: 'a.data.children.[].attributes.pathId'
            }
        ]
    }
).then(data => {
    console.log(JSON.stringify(data, null, 4));
});

new Adapter({
    a: promise1,
    b: promise2
})
.index([
    {
        toPath: 'pathId',
        fromPath: 'a.data.children.[].attributes.pathId',
        correspond: false // 可选：将多项目标数据拼成数组后赋值给源数据
    },
    {
        toPath: 'a.data.children.[].pid',
        fromPath: 'a.data.children.[].attributes.pathId'
    }
])
.remove(['a.message'])
.index([
    {
        toPath: 'a.testIndex',
        fromPath: 'b.data',
        move: true  // 可选
    }
])
.value([
    {
        path: 'a.data.children.[].id',   // 等长会一一对应
        value: ['ha', 'test', '99']
    },
    {
        path: 'a.data.children.[].id',
        callback(value, index) {   // 可选
            return value + index;
        }
    }
])
.then(data => {
    // console.log(JSON.stringify(data, null, 4));
}).catch((e) => {
    // console.log(e);
});
