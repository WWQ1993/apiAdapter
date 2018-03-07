#ApiAdapter

## 功能
* 重索引
* 重赋值
* 并发请求

## 使用
### 创建adapter实例

1. 单一请求

<pre><code>
let adapter = new Adapter(promise);
</code></pre>
2. 并行请求

<pre><code>
let adapter = new Adapter({
    name1: promise1,
    name2: promise2
});
</code></pre>

### 移除索引
<pre><code>
adapter.remove(pathArray)
</code></pre>
pathArray:参见pathArray

### 重新索引
<pre><code>
adapter.index([
    {
        targetPath: path,
        srcPath: path,
        move: true  // 可选
    }
])
</code></pre>

targetPath: 目标path

srcPath： 源path

move: 是否删除源path

### 修改/创建值
<pre><code>
adapter.value([
   {
       path: path,
       value: newValue
   },
   {
       path: path,
       callBack(oldValue) {   // 可选
           return newValue;
       }
   }
])
</code></pre>

path: 值的path
value: 新值
callBack：修改值时可选的回调函数，参数为原值，返回新值

### pathArray
pathArray:Array, path数组

### path
path:String, 对象键名以.连接而成， 例如：
<pre><code>
{
    a: {
        b: [
            c: 1234
        ]
    }
}
</code></pre>
c的path为：a.b.0.c