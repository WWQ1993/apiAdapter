(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['../src/index', './data1.js', './data2.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(require('../src/index'), require('./data1.js'), require('./data2.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.index, global.data1, global.data2);
        global.index = mod.exports;
    }
})(this, function (_index, _data, _data3) {
    'use strict';

    var _index2 = _interopRequireDefault(_index);

    var _data2 = _interopRequireDefault(_data);

    var _data4 = _interopRequireDefault(_data3);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var promise1 = Promise.resolve(JSON.parse(_data2.default));
    var promise2 = Promise.resolve(JSON.parse(_data4.default));

    new _index.DataAdapter({
        a: JSON.parse(_data2.default),
        b: JSON.parse(_data4.default)
    }, {
        index: [{
            to: 'pathId',
            from: 'a.data.children.[].attributes.pathId',
            correspond: false // 可选：将多项目标数据拼成数组后赋值给源数据
        }, {
            toPath: 'a.data.children.[].pid',
            fromPath: 'a.data.children.[].attributes.pathId'
        }],
        value: [{
            to: 'testValue',
            value: 'dd'
        }]
    }).then(function (data) {
        console.log(JSON.stringify(data, null, 4));
    });

    new _index2.default({
        a: promise1,
        b: promise2
    }).index([{
        toPath: 'pathId',
        fromPath: 'a.data.children.[].attributes.pathId',
        correspond: false // 可选：将多项目标数据拼成数组后赋值给源数据
    }, {
        toPath: 'a.data.children.[].pid',
        fromPath: 'a.data.children.[].attributes.pathId'
    }]).remove(['a.message']).index([{
        toPath: 'a.testIndex',
        fromPath: 'b.data',
        move: true // 可选
    }]).value([{
        path: 'a.data.children.[].id', // 等长会一一对应
        value: ['ha', 'test', '99']
    }, {
        path: 'a.data.children.[].id',
        callback: function callback(value, index) {
            // 可选
            return value + index;
        }
    }]).then(function (data) {
        // console.log(JSON.stringify(data, null, 4));
    }).catch(function (e) {
        // console.log(e);
    });
});
//# sourceMappingURL=index.js.map