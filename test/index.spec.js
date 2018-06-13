
import { DataAdapter } from '../src/index.js';
import obj from '../example/data';

describe('index', function() {
    it('test index from a to b', function() {
        let newData = new DataAdapter(obj, {
            index: [
                {
                    'from': 'attributes.id',
                    'to': 'id'
                }
            ]
        })
        assert(newData.id === obj.attributes.id);
    });
});

describe('index-foreach', function() {
    it('test index from [] to [].x', function() {
        let newData = new DataAdapter(obj, {
            index: [
                {
                    'from': 'children.[].attributes.id',
                    'to': 'children.[].id'
                }
            ]
        })
        
        let children = newData.children
        children.forEach((item,idx) => {
            assert(item.id === obj.children[idx].attributes.id)
        })

        assert(newData !== obj)
    });
});