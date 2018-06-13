/**
 * input
 * output
 */
class PromiseAdapter {
    taskQueue = [];
    response = {};
    constructor(promise) {
        if (promise instanceof Promise) {
            promise.then(data => {
                this.response = data;
                this._execTask();
            }).catch(error => {
                if (this.catchcallback) {
                    this.catchcallback(error);
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
            }).catch(error => {
                if (this.catchcallback) {
                    this.catchcallback(error);
                } else {
                    throw error;
                }
            });
        }
    }

    _remove(list = []) {
        list.forEach(path => {
            new PathObject(this.response, path).remove();
        });
    }

    _index(list = []) {
        list.forEach(({ toPath, to, fromPath, from, move = false, correspond = true }) => {
            new PathObject(this.response, toPath || to).index(new PathObject(this.response, fromPath || from).pathList, move, correspond);
        });
    }

    _value(list = []) {
        list.forEach(({ path, to, value, callback = null, correspond = true }) => {
            new PathObject(this.response, path || to).value(value, callback, correspond);
        });
    }

    _deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    _execTask() {

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
    index() {
        return this._setTask('_index', arguments);
    }
    value() {
        return this._setTask('_value', arguments);
    }
    _then(callback) {
        callback(this._deepClone(this.response));
    }
    then() {
        return this._setTask('_then', arguments);
    }
    catch(callback) {
        this.catchcallback = callback;
    }
}

export default PromiseAdapter
