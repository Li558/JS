function Promise(executor){

    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //保存实例对象的this 的值
    const self = this;//self _this that
    function resolve(data){
        //1 修改对象的状态(PromiseState)
        self.PromiseState = 'fulfilled';

        //2 设置对象结果值(PromiseResult)
        self.PromiseResult = data;
    
    }
    function reject(data){
        //1 修改对象的状态(PromiseState)
        self.PromiseState = 'rejected';

        //2 设置对象结果值(PromiseResult)
        self.PromiseResult = data;
    }
    //同步调用 [执行器函数]
    executor(resolve, reject);
}

//添加then方法
Promise.prototype.then = function(onResolved, onRejected){
    
}