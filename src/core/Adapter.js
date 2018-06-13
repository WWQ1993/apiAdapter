/**
 * input
 * output
 */
class Adapter {

    response = {};

    constructor(data = "") {
        this.response = this._deepClone(data);
    }

    _remove(list = []) {
        list.forEach(path => {
            new PathObject(this.response, path).remove();
        });
    }

    _index(list = []) {
        list.forEach(({ 
            toPath, 
            to, 
            fromPath, 
            from, 
            move = false, 
            correspond = true 
        }) => {
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
}