# api-adapt

## 功能
* 重索引
* 重赋值
* 并发请求

## 安装
<pre><code>
npm install api-adapt
</code></pre>


## 使用
### 创建adapter实例

1. 单一请求

<pre><code>
const adapter = new Adapter(promise);
</code></pre>
2. 并行请求

<pre><code>
const adapter = new Adapter({
    name1: promise1,
    name2: promise2
});
</code></pre>

promise1:Promise，promise实例

promise2:Promise，promise实例

### 移除索引
<pre><code>
adapter.remove(pathArray)
</code></pre>
pathArray:Array，参见pathArray

### 重新索引
<pre><code>
adapter.index([
    {
        toPath: path,
        fromPath: path,
        move: true  // 可选
    }
])
</code></pre>

toPath:path，目标path

fromPath:path，源path

move:Boolean， 是否删除源path

### 修改/创建值
<pre><code>
adapter.value([
   {
       path: path,
       value: newValue
   },
   {
       path: path,
       callback(oldValue) {   // 可选
           return newValue;
       }
   }
])
</code></pre>

path:path，值的path
value: 新值
callback:function，修改值时可选的回调函数，参数为原值，返回新值

### pathArray
pathArray:Array，path数组

path:path， 参见path

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

## 更新日志
* [2.1.2] Feature: DataAdapter
* [2.1.1] callback
* [2.1.0] 添加catch方法
* [2.0.1] 进行UMD封装
* [2.0.0] 修改调用方法名称
* [1.1.0] 添加数组处理
* [1.0.0] 初始化