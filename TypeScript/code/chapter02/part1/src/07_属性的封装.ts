(function(){
    //定义一个表示人的类
    class Person{
        //TS可以在属性钱添加属性的修饰符
        /**
         * public 修饰的属性可以在任意位置访问(修改)默认值
         * private 私有属性,私有属性只能在类内部进行访问(修改)
         *      -通过在类中添加方法使得私有属性可以被外部访问
         * protected 受保护的属性,只能在当前类和当前类的子类中访问(修改)
         */
        private _name: string;
        private _age: number;
        constructor(name: string, age: number){
            this._name = name;
            this._age = age;
        }
        /**
         * getter方法用来读取属性
         * setter方法用来设置属性
         *      --它们被称为属性得存取器
         */
        // //定义方法,用来回去name属性
        // getName(){
        //     return this._name;
        // }
        // //定义方法,用来设置name属性
        // setName(value: string){
        //     this._name = value;
        // }
        // getAge(){
        //     return this._age;
        // }
        // setAge(value: number){
        //     if(value >= 0){
        //         this._age = value;
        //     }
        // }

        //TS中设置getter方法得方式
        get name(){
            // console.log('get name()执行了!!');
            return this._name;
        }
        set name(value: string){
            this._name = value;
        }
        get age(){
            return this._age;
        }
        set age(value: number){
            if(value >= 0){
                this._age = value;
            }
        }
    }

    const per = new Person('孙悟饭', 18);
    /**
     * 现在属性是在对象中设置的,属性可以任意的被修改
     *  属性可以被任意被修改将导致对象的数据变得非常安全
     */
    // per._name = '猪八戒';
    // per._age = -38;
    // console.log(per);

    // console.log(per.getName());
    // per.setName('猪八戒');
    // per.setAge(-33);
    // console.log(per);
    per.name = '猪八戒';
    per.age = -33;
    console.log(per.name);
    console.log(per);
    class A{
        protected num: number;
        constructor(num: number){
            this.num = num
        }
    }
    class B extends A{
        test(){
            console.log(this.num);
            
        }
    
    }
    const b = new B(123);
    //不能在类上去访问
    // B.num = 22;
    // class N{
    //     name: string;
    //     age: number;
    //     constructor( name:string,  age: number){
    //         this.name = name;
    //         this.age = age;
    //     }
    // }
    class C{
        // name: string;
        // age: number;
        constructor(public name:string, public age: number){

        }
    }
    const c = new C('xxx', 111);
    console.log(c);
    console.log(c.age);
    console.log(c.name);


    

})()