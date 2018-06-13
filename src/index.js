/*
Project: Adapter
Author: WuWanQiang
 */
import Adapter from './core/Adapter';

class _DataAdapter extends Adapter {
    constructor(data, rules) {
        super(data);

        rules && this.dealRules(rules);
        return this.response;
    }
    dealRules(rules) {
        for (let fnName in rules) {
            this['_' + fnName](rules[fnName]);
        }
    }
}


export * from './core/PromiseAdapter';
export const DataAdapter = _DataAdapter;
