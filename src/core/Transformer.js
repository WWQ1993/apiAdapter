/**
 * input
 * output
 */
class Transformer {
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
    value(newValue, callback, correspond) {
        this.pathList.forEach((path, index) => {
            let {obj, prop} = this._splitPath(path);
            let val = newValue;

            // 传入相同长度数组则一一对应
            if (correspond && Array.isArray(newValue) && newValue.length === this.pathList.length) {
                val = newValue[index];
            }

            if (callback) {
                obj[prop] = callback(obj[prop], index);
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

export default Transformer