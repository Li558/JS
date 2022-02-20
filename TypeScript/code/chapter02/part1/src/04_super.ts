(function(){
    class Animal{
        name: string;
        constructor(name: string){
            this.name = name;
        }
        sayHello(){
            console.log('动物在叫');
            
        }
    }
    class Dog extends Animal{
        age:number;
        constructor(name:string, age:number) {
            //如果在子类中写了构造函数,在子类的构造函数必须对父类的构造函数进行重写
            super(name);//调用父类的构造函数
            this.age = age;
        }
        sayHello(): void {
            //在类的方法中super就表示当前类的父类
            super.sayHello();
            console.log(`${this.name}在叫`);
            
        }
    }
    


    const dog = new Dog('旺财', 3);
    dog.sayHello();

})();