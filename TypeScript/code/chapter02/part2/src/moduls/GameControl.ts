//引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

//游戏控制器,控制其他的所有类
class GameControl{
    //定义三个属性
    //蛇
    snake: Snake;
    //食物
    food: Food;
    //记分牌
    scorePanel: ScorePanel;
    //创建一个属性来存储蛇的移动方向(也就是按键的方向)
    direction: string = '';
    //创建一个属性用来记录游戏是否结束
    islive = true;
    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(100,2);
        this.init();
    }
    //游戏的初始化方法,调用后游戏立即开始
    init(){
        //绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        
        //调用run方法 使蛇移动
        this.run();
    }
    /**
     * ArrowUp
     * ArrowDown
     * ArrowLeft
     * ArrowRight
     */

    //创建一格键盘按下的相应函数
    keydownHandler(event: KeyboardEvent){
        //需要 检查event.key的值是否合法（用户是否按了正确的按键）
        //修改direction的属性
        this.direction = event.key;

    }

    //创建一个控制蛇移动的方法
    run(){
        /**
         *      根据方向(this.direction)来使蛇的位置改变     
         *           向上top 减少
         *           向下top 增加
         *           向左left 减少
         *           向右left 增加   
        */
        //获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        //根据按键的方向 来修改
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                //向上移动top减少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                //向下移动top增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                //向左移动left减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                //向右移动left增加
                X += 10;
                break;
        }

        //检查蛇是否吃到了食物
        this.checkEat(X, Y);
            
        
        try{
            //修改X Y值
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e){
            //进入catch 说明出现了异常，游戏结束
            alert((e as Error).message + 'GameOver!');
            //将islive设置为false
            this.islive = false;
        }
        //开启一个定时调用
        this.islive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1)*30);
    
    }
    //定义一个方法，用来检查蛇能否吃到食物
    checkEat(X: number, Y: number){
        if (X === this.food.X && Y === this.food.Y){console.log('吃到食物');
        //食物的位置要进行重置
        this.food.change();
        //分数增加
        this.scorePanel.addScore();
        //蛇要增长一节
        this.snake.addBody();}
    }
}
export default GameControl;