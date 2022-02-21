//定义表示记分牌的类
class ScorePanel{
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    //设置一格变量限制等级
    maxLevel: number;
    //设置一格变量表示多少分时升级
    upScore: number;

    constructor(maxLevel:number, upScore: number ){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;

    }
    //设置一格加分的方法
    addScore(){
        //使份数自增
        this.scoreEle.innerHTML = ++this.score + '';
        if(this.score % this.upScore === 0){
            this.levelUp();
        }
    }
    //设置提升等级的方法
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level + '';
        }

    }
}
export default ScorePanel;


//测试代码
// const scorePanel = new ScorePanel(100, 2);
// for(let i = 0; i < 200; i++){

//     scorePanel.addScore();
// }
