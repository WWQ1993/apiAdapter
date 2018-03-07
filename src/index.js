/*
adapter
 */
class Adapter {
    constructor(promise) {
        this.taskQueue = [];

        this.response = {};
        if (promise instanceof Promise) {
            promise.then(data => {
                this.response = data;
                this._execTask();
            });
        } else {
            Promise.all(Object.values(promise)).then(res => {
                Object.keys(promise).forEach((key, index) => {
                    this.response[key] = res[index];
                });
                this._execTask();
            });
        }
    };

    _execTask() {
        console.log('before exec', this._deepClone(this.response));
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
            let {obj, prop} = this._splitPath(this.response, path);
            delete obj[prop];
        });
    }

    index() {
        return this._setTask('_index', arguments);
    }
    _index(list = []) {
        list.forEach(({ targetPath, srcPath, move }) => {
            let src = this._splitPath(this.response, srcPath);
            let target = this._splitPath(this.response, targetPath);
            target.obj[target.prop] = this._deepClone(src.obj[src.prop]);

            if (move) {
                delete src.obj[src.prop];
            }
        });
    }

    value() {
        return this._setTask('_value', arguments);
    }
    _value(list = []) {
        list.forEach(({ path, value, callBack }) => {
            let {obj, prop} = this._splitPath(this.response, path);
            if (callBack) {
                obj[prop] = callBack(obj[prop]);
            } else {
                obj[prop] = value;
            }
        });
    }

    then() {
        return this._setTask('_then', arguments);
    }
    _then(callBack) {
        callBack(this._deepClone(this.response));
    }

    _deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    _splitPath(obj, str) {
        let arr = str.split('.');
        let prop = arr.pop();
        arr.forEach(key => {
            obj = obj[key];
        });
        return {
            obj,
            prop
        };
    }
}

export default Adapter;
