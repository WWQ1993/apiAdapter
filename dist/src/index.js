(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var PathObject = function () {
        function PathObject(obj, path) {
            _classCallCheck(this, PathObject);

            this.srcObj = obj;
            this.pathList = [];
            this._spreadPath(path.split('.'), this.srcObj);
        }

        _createClass(PathObject, [{
            key: 'remove',
            value: function remove() {
                var _this = this;

                this.pathList.forEach(function (path) {
                    var _splitPath2 = _this._splitPath(path),
                        obj = _splitPath2.obj,
                        prop = _splitPath2.prop;

                    delete obj[prop];
                });
            }
        }, {
            key: 'value',
            value: function value(newValue, callBack, correspond) {
                var _this2 = this;

                this.pathList.forEach(function (path, index) {
                    var _splitPath3 = _this2._splitPath(path),
                        obj = _splitPath3.obj,
                        prop = _splitPath3.prop;

                    var val = newValue;

                    // 传入相同长度数组则一一对应
                    if (correspond && Array.isArray(newValue) && newValue.length === _this2.pathList.length) {
                        val = newValue[index];
                    }

                    if (callBack) {
                        obj[prop] = callBack(obj[prop], index);
                    } else {
                        obj[prop] = val;
                    }
                });
            }
        }, {
            key: 'index',
            value: function index(fromPathList, move, correspond) {
                var _this3 = this;

                // 一一对应
                if (correspond && fromPathList.length === this.pathList.length) {
                    this.pathList.forEach(function (toPath, index) {
                        var src = _this3._splitPath(fromPathList[index]);
                        var target = _this3._splitPath(toPath);
                        target.obj[target.prop] = _this3._deepClone(src.obj[src.prop]);

                        if (move) {
                            delete src.obj[src.prop];
                        }
                    });
                } else {
                    this.pathList.forEach(function (toPath) {
                        var newVal = [];
                        fromPathList.forEach(function (path) {
                            var src = _this3._splitPath(path);
                            newVal.push(src.obj[src.prop]);
                            if (move) {
                                delete src.obj[src.prop];
                            }
                        });
                        newVal = newVal.length > 1 ? newVal : newVal[0];

                        var target = _this3._splitPath(toPath);
                        target.obj[target.prop] = _this3._deepClone(newVal);
                    });
                }
            }
        }, {
            key: '_deepClone',
            value: function _deepClone(obj) {
                return JSON.parse(JSON.stringify(obj));
            }
        }, {
            key: '_splitPath',
            value: function _splitPath(path) {
                var arr = path.split('.');
                var prop = arr.pop();
                var obj = this.srcObj;

                arr.forEach(function (key) {
                    obj = obj[key];
                });
                // console.log(obj, prop);
                return {
                    obj: obj,
                    prop: prop
                };
            }
        }, {
            key: '_spreadPath',
            value: function _spreadPath(arr, obj) {
                var _this4 = this;

                if (arr.indexOf('[]') === -1) {
                    this.pathList.push(arr.join('.'));
                } else {
                    var _loop = function _loop(i) {
                        var key = arr[i];
                        if (key !== '[]') {
                            obj = obj[key];
                        } else {
                            obj.forEach(function (val, _index) {
                                var newArr = arr.slice();
                                newArr[i] = _index;
                                _this4._spreadPath(newArr, _this4.srcObj);
                            });
                            return 'break';
                        }
                    };

                    for (var i = 0; i < arr.length; i++) {
                        var _ret = _loop(i);

                        if (_ret === 'break') break;
                    }
                }
            }
        }]);

        return PathObject;
    }();

    var Adapter = function () {
        function Adapter(promise) {
            var _this5 = this;

            _classCallCheck(this, Adapter);

            this.taskQueue = [];

            this.response = {};
            if (promise instanceof Promise) {
                promise.then(function (data) {
                    _this5.response = data;
                    _this5._execTask();
                }).catch(function (error) {
                    if (_this5.catchCallback) {
                        _this5.catchCallback(error);
                    } else {
                        throw error;
                    }
                });
            } else {
                Promise.all(Object.values(promise)).then(function (res) {
                    Object.keys(promise).forEach(function (key, index) {
                        _this5.response[key] = res[index];
                    });
                    _this5._execTask();
                }).catch(function (error) {
                    if (_this5.catchCallback) {
                        _this5.catchCallback(error);
                    } else {
                        throw error;
                    }
                });
            }
        }

        _createClass(Adapter, [{
            key: '_execTask',
            value: function _execTask() {
                var _this6 = this;

                // console.log(this._deepClone(this.response));
                // console.log('-------------');
                this.taskQueue.forEach(function (_ref) {
                    var taskName = _ref.taskName,
                        argument = _ref.argument;

                    _this6[taskName].apply(_this6, Array.prototype.slice.apply(argument));
                });
            }
        }, {
            key: '_setTask',
            value: function _setTask(taskName, argument) {
                this.taskQueue.push({
                    taskName: taskName,
                    argument: argument
                });
                return this;
            }
        }, {
            key: 'remove',
            value: function remove() {
                return this._setTask('_remove', arguments);
            }
        }, {
            key: '_remove',
            value: function _remove() {
                var _this7 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                list.forEach(function (path) {
                    new PathObject(_this7.response, path).remove();
                });
            }
        }, {
            key: 'index',
            value: function index() {
                return this._setTask('_index', arguments);
            }
        }, {
            key: '_index',
            value: function _index() {
                var _this8 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                list.forEach(function (_ref2) {
                    var toPath = _ref2.toPath,
                        fromPath = _ref2.fromPath,
                        _ref2$move = _ref2.move,
                        move = _ref2$move === undefined ? false : _ref2$move,
                        _ref2$correspond = _ref2.correspond,
                        correspond = _ref2$correspond === undefined ? true : _ref2$correspond;

                    new PathObject(_this8.response, toPath).index(new PathObject(_this8.response, fromPath).pathList, move, correspond);
                });
            }
        }, {
            key: 'value',
            value: function value() {
                return this._setTask('_value', arguments);
            }
        }, {
            key: '_value',
            value: function _value() {
                var _this9 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                list.forEach(function (_ref3) {
                    var path = _ref3.path,
                        value = _ref3.value,
                        _ref3$callBack = _ref3.callBack,
                        callBack = _ref3$callBack === undefined ? null : _ref3$callBack,
                        _ref3$correspond = _ref3.correspond,
                        correspond = _ref3$correspond === undefined ? true : _ref3$correspond;

                    new PathObject(_this9.response, path).value(value, callBack, correspond);
                });
            }
        }, {
            key: 'then',
            value: function then() {
                return this._setTask('_then', arguments);
            }
        }, {
            key: '_then',
            value: function _then(callBack) {
                callBack(this._deepClone(this.response));
            }
        }, {
            key: 'catch',
            value: function _catch(callBack) {
                this.catchCallback = callBack;
            }
        }, {
            key: '_catch',
            value: function _catch(error) {}
        }, {
            key: '_deepClone',
            value: function _deepClone(obj) {
                return JSON.parse(JSON.stringify(obj));
            }
        }]);

        return Adapter;
    }();

    exports.default = Adapter;
});
//# sourceMappingURL=index.js.map