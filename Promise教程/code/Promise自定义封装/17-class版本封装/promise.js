class Promise{
    //构造方法
    constructor(executor){
       //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //声明属性
    this.callbacks = [];
    //保存实例对象的this 的值
    const self = this;//self _this that
    function resolve(data){
        if(self.PromiseState !== 'pending')return;
        //1 修改对象的状态(PromiseState)
        self.PromiseState = 'fulfilled';
        //2 设置对象结果值(PromiseResult)
        self.PromiseResult = data;
        //调用成功的回调函数
        setTimeout(()=>{
            self.callbacks.forEach(item =>{
                item.onResolved(data);
            })
        });

    }
    function reject(data){
        if(self.PromiseState !== 'pending')return;
        //1 修改对象的状态(PromiseState)
        self.PromiseState = 'rejected';

        //2 设置对象结果值(PromiseResult)
        self.PromiseResult = data;
        //执行失败的回调函数
        setTimeout(()=>{
            self.callbacks.forEach(item =>{
                item.onRejected(data);
            });
        })
    }
    //同步调用 [执行器函数]
    try{
        executor(resolve, reject);

    }catch(e){
        //修改promise 对象状态为失败
        reject(e);
    } 
    }

    //then方法封装
    then(onResolved, onRejected){
        const self = this;
    //判断回调函数参数
    if(typeof onRejected !== 'function'){
        onRejected = reason =>{
            throw reason;
        }
    }
    if(typeof onResolved !== 'function'){
        onResolved = value => value;
    }
    return new Promise((resolve, reject)=>{
        function callback(type){
            try{
                //执行成功的回调函数
                let result = type(self.PromiseResult);
                if(result instanceof Promise){
                    result.then(v =>{
                        resolve(v);
                    },r=>{
                        reject(r);
                    })
                }else{
                    resolve(result);              
                }
                }catch(e){
                    reject(e);      
                }
        }
        //调用回调函数
    if(this.PromiseState === 'fulfilled'){
        setTimeout(()=>{
            callback(onResolved);
        });
    }
    if(this.PromiseState === 'rejected'){
        setTimeout(()=>{
            callback(onRejected);
        });
    }
    //判断pending状态
    if(this.PromiseState === 'pending'){
        //保存回调函数
        this.callbacks.push ({
            onResolved: function(){
                callback(onResolved);
            },
            onRejected: function(){
                callback(onRejected);
            }
        });
        }
    })
    }

    //catch方法
    catch(onRejected){
        return this.then(undefined, onRejected);

    }
    //resolve方法
    static resolve(value){
        return new Promise((resolve, reject)=>{
            if(value instanceof Promise){
                value.then(v=>{
                    resolve(v);
                }, r=>{
                    reject(r);
                });
            }else{
                //状态设置为成功
                resolve(value);
            }
        })
    }
    //reject方法
    static reject(reason){
        //返回一个Promise对象
        return new Promise((resolve, reject)=>{
        reject(reason);  
});
    }
    //添加all方法
    static all(promises){
        //返回的结果为promises对象
        return new Promise((resolve, reject)=>{
        //声明变量
        let count = 0;
        let arr = [];
        //遍历
        for(let i = 0; i < promises.length; i++){
            //
            promises[i].then(v =>{
                //得知对象的状态是成功
                //每个promise对象 都成功
                count++;
                //将当前promises对象成功的结果存入到数组当中
                arr[i] = v;
                //判断
                if(count === promises.length){
                    //修改状态
                    resolve(arr);
                }
            },r => {
                reject(r);
            });
        }
    });
    }
    //添加race方法
    static race(promises){
        return new Promise((resolve, reject)=>{
            for(let i = 0; i < promises.length; i++){
                promises[i].then(v=>{
                    //修改返回对象的状态为成功
                    resolve(v);
                },r=>{
                    //修改返回对象的状态为失败
                    reject(r);
                })
            }
        
        });
    }
}
