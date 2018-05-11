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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

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
            value: function value(newValue, callback, correspond) {
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

                    if (callback) {
                        obj[prop] = callback(obj[prop], index);
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
        function Adapter() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            _classCallCheck(this, Adapter);

            this.response = {};

            this.response = this._deepClone(data);
        }

        _createClass(Adapter, [{
            key: '_remove',
            value: function _remove() {
                var _this5 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                list.forEach(function (path) {
                    new PathObject(_this5.response, path).remove();
                });
            }
        }, {
            key: '_index',
            value: function _index() {
                var _this6 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                list.forEach(function (_ref) {
                    var toPath = _ref.toPath,
                        to = _ref.to,
                        fromPath = _ref.fromPath,
                        from = _ref.from,
                        _ref$move = _ref.move,
                        move = _ref$move === undefined ? false : _ref$move,
                        _ref$correspond = _ref.correspond,
                        correspond = _ref$correspond === undefined ? true : _ref$correspond;

                    new PathObject(_this6.response, toPath || to).index(new PathObject(_this6.response, fromPath || from).pathList, move, correspond);
                });
            }
        }, {
            key: '_value',
            value: function _value() {
                var _this7 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                list.forEach(function (_ref2) {
                    var path = _ref2.path,
                        to = _ref2.to,
                        value = _ref2.value,
                        _ref2$callback = _ref2.callback,
                        callback = _ref2$callback === undefined ? null : _ref2$callback,
                        _ref2$correspond = _ref2.correspond,
                        correspond = _ref2$correspond === undefined ? true : _ref2$correspond;

                    new PathObject(_this7.response, path || to).value(value, callback, correspond);
                });
            }
        }, {
            key: '_deepClone',
            value: function _deepClone(obj) {
                return JSON.parse(JSON.stringify(obj));
            }
        }]);

        return Adapter;
    }();

    var _DataAdapter = function (_Adapter) {
        _inherits(_DataAdapter, _Adapter);

        function _DataAdapter(data, rules) {
            var _ret2;

            _classCallCheck(this, _DataAdapter);

            var _this8 = _possibleConstructorReturn(this, (_DataAdapter.__proto__ || Object.getPrototypeOf(_DataAdapter)).call(this, data));

            rules && _this8.dealRules(rules);
            return _ret2 = _this8.response, _possibleConstructorReturn(_this8, _ret2);
        }

        _createClass(_DataAdapter, [{
            key: 'dealRules',
            value: function dealRules(rules) {
                for (var fnName in rules) {
                    this['_' + fnName](rules[fnName]);
                }
            }
        }]);

        return _DataAdapter;
    }(Adapter);

    var _PromiseAdapter = function () {
        function _PromiseAdapter(promise) {
            var _this9 = this;

            _classCallCheck(this, _PromiseAdapter);

            this.taskQueue = [];
            this.response = {};

            if (promise instanceof Promise) {
                promise.then(function (data) {
                    _this9.response = data;
                    _this9._execTask();
                }).catch(function (error) {
                    if (_this9.catchcallback) {
                        _this9.catchcallback(error);
                    } else {
                        throw error;
                    }
                });
            } else {
                Promise.all(Object.values(promise)).then(function (res) {
                    Object.keys(promise).forEach(function (key, index) {
                        _this9.response[key] = res[index];
                    });
                    _this9._execTask();
                }).catch(function (error) {
                    if (_this9.catchcallback) {
                        _this9.catchcallback(error);
                    } else {
                        throw error;
                    }
                });
            }
        }

        _createClass(_PromiseAdapter, [{
            key: '_remove',
            value: function _remove() {
                var _this10 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                list.forEach(function (path) {
                    new PathObject(_this10.response, path).remove();
                });
            }
        }, {
            key: '_index',
            value: function _index() {
                var _this11 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                list.forEach(function (_ref3) {
                    var toPath = _ref3.toPath,
                        to = _ref3.to,
                        fromPath = _ref3.fromPath,
                        from = _ref3.from,
                        _ref3$move = _ref3.move,
                        move = _ref3$move === undefined ? false : _ref3$move,
                        _ref3$correspond = _ref3.correspond,
                        correspond = _ref3$correspond === undefined ? true : _ref3$correspond;

                    new PathObject(_this11.response, toPath || to).index(new PathObject(_this11.response, fromPath || from).pathList, move, correspond);
                });
            }
        }, {
            key: '_value',
            value: function _value() {
                var _this12 = this;

                var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                list.forEach(function (_ref4) {
                    var path = _ref4.path,
                        to = _ref4.to,
                        value = _ref4.value,
                        _ref4$callback = _ref4.callback,
                        callback = _ref4$callback === undefined ? null : _ref4$callback,
                        _ref4$correspond = _ref4.correspond,
                        correspond = _ref4$correspond === undefined ? true : _ref4$correspond;

                    new PathObject(_this12.response, path || to).value(value, callback, correspond);
                });
            }
        }, {
            key: '_deepClone',
            value: function _deepClone(obj) {
                return JSON.parse(JSON.stringify(obj));
            }
        }, {
            key: '_execTask',
            value: function _execTask() {
                var _this13 = this;

                this.taskQueue.forEach(function (_ref5) {
                    var taskName = _ref5.taskName,
                        argument = _ref5.argument;

                    _this13[taskName].apply(_this13, Array.prototype.slice.apply(argument));
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
            key: 'index',
            value: function index() {
                return this._setTask('_index', arguments);
            }
        }, {
            key: 'value',
            value: function value() {
                return this._setTask('_value', arguments);
            }
        }, {
            key: '_then',
            value: function _then(callback) {
                callback(this._deepClone(this.response));
            }
        }, {
            key: 'then',
            value: function then() {
                return this._setTask('_then', arguments);
            }
        }, {
            key: 'catch',
            value: function _catch(callback) {
                this.catchcallback = callback;
            }
        }]);

        return _PromiseAdapter;
    }();

    exports.default = _PromiseAdapter;
    var DataAdapter = exports.DataAdapter = _DataAdapter;
});
//# sourceMappingURL=index.js.map