/*
Project: Adapter
Author: WuWanQiang
 */

class PathObject {
    constructor(obj, path) {
        this.srcObj = obj;
        this.pathList = [];
        this._spreadPath(path.split('.'), this.srcObj);
    }

    remove() {
        this.pathList.forEach(path => {
            let {obj, prop} = this._splitPath(path);
            delete obj[prop];
        });
    }
    value(newValue, callBack, correspond) {
        this.pathList.forEach((path, index) => {
            let {obj, prop} = this._splitPath(path);
            let val = newValue;

            // 传入相同长度数组则一一对应
            if (correspond && Array.isArray(newValue) && newValue.length === this.pathList.length) {
                val = newValue[index];
            }

            if (callBack) {
                obj[prop] = callBack(obj[prop], index);
            } else {
                obj[prop] = val;
            }
        });
    }
    index(fromPathList, move, correspond) {
        // 一一对应
        if (correspond && fromPathList.length === this.pathList.length) {
            this.pathList.forEach((toPath, index) => {
                let src = this._splitPath(fromPathList[index]);
                let target = this._splitPath(toPath);
                target.obj[target.prop] = this._deepClone(src.obj[src.prop]);

                if (move) {
                    delete src.obj[src.prop];
                }
            });
        } else {
            this.pathList.forEach(toPath => {
                let newVal = [];
                fromPathList.forEach(path => {
                    let src = this._splitPath(path);
                    newVal.push(src.obj[src.prop]);
                    if (move) {
                        delete src.obj[src.prop];
                    }
                });
                newVal = newVal.length > 1 ? newVal : newVal[0];

                let target = this._splitPath(toPath);
                target.obj[target.prop] = this._deepClone(newVal);
            });
        }
    }

    _deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    _splitPath(path) {
        let arr = path.split('.');
        let prop = arr.pop();
        let obj = this.srcObj;

        arr.forEach(key => {
            obj = obj[key];
        });
        // console.log(obj, prop);
        return {
            obj,
            prop
        };
    }
    _spreadPath(arr, obj) {
        if (arr.indexOf('[]') === -1) {
            this.pathList.push(arr.join('.'));
        } else {
            for (let i = 0; i < arr.length; i++) {
                let key = arr[i];
                if (key !== '[]') {
                    obj = obj[key];
                } else {
                    obj.forEach((val, _index) => {
                        let newArr = arr.slice();
                        newArr[i] = _index;
                        this._spreadPath(newArr, this.srcObj);
                    });
                    break;
                }
            }
        }
    }
}

class Adapter {
    constructor(promise) {
        this.taskQueue = [];

        this.response = {};
        if (promise instanceof Promise) {
            promise.then(data => {
                this.response = data;
                this._execTask();
            }).catch((error) => {
                if (this.catchCallback) {
                    this.catchCallback(error);
                } else {
                    throw error;
                }
            });
        } else {
            Promise.all(Object.values(promise)).then(res => {
                Object.keys(promise).forEach((key, index) => {
                    this.response[key] = res[index];
                });
                this._execTask();
            }).catch((error) => {
                if (this.catchCallback) {
                    this.catchCallback(error);
                } else {
                    throw error;
                }
            });
        }
    };

    _execTask() {
        // console.log(this._deepClone(this.response));
        // console.log('-------------');
        this.taskQueue.forEach(({taskName, argument}) => {
            this[taskName].apply(this, Array.prototype.slice.apply(argument));
        });
    }

    _setTask(taskName, argument) {
        this.taskQueue.push({
            taskName,
            argument
        });
        return this;
    }

    remove() {
        return this._setTask('_remove', arguments);
    }

    _remove(list = []) {
        list.forEach(path => {
            new PathObject(this.response, path).remove();
        });
    }

    index() {
        return this._setTask('_index', arguments);
    }
    _index(list = []) {
        list.forEach(({ toPath, fromPath, move = false, correspond = true }) => {
            new PathObject(this.response, toPath).index(new PathObject(this.response, fromPath).pathList, move, correspond);
        });
    }

    value() {
        return this._setTask('_value', arguments);
    }
    _value(list = []) {
        list.forEach(({ path, value, callBack = null, correspond = true }) => {
            new PathObject(this.response, path).value(value, callBack, correspond);
        });
    }

    then() {
        return this._setTask('_then', arguments);
    }
    _then(callBack) {
        callBack(this._deepClone(this.response));
    }

    catch(callBack) {
        this.catchCallback = callBack;
    }
    _catch(error) {

    }

    _deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}

export default Adapter;
