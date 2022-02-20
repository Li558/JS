class Dog{

    name: string;
    age: number;
    
    // constructor 被称为构造函数
    // 构造函数会在对象创建时调用
    constructor(name: string, age: number){
        //在实例方法中, this就表示当前的实例
        // 在构造函数中当前对象就是当前新建的哪个对象
        //可以通过this向新建的对象中添加属性
        this.name = name;
        this.age = age;
    }
    bark(){
        // alert('汪汪汪!');
        //在方法中可以通过this来表示当前调用方法的对象
        console.log(this.name);
        
    }
}

const dog  = new Dog('旺财', 14);
const dog2 = new Dog('共生', 15);
const dog3 = new Dog('旺财', 54);
const dog4 = new Dog('旺财', 43);


console.log(dog);
console.log(dog2);
console.log(dog3);
console.log(dog4);
dog.bark();
dog2.bark();
