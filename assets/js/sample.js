const canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
let playerName1= document.getElementById("player1-name")
let playerName2= document.getElementById("player2-name")
let playerScore1 = document.getElementById("player1-score")
let playerScore2 = document.getElementById("player2-score")

let cx = canvas.width;
let cy = canvas.height;

// c.fillStyle = "green"
// c.fillRect(0,0,10,30)
var score1=0
var score2=0
displayScore()
function displayScore(){
    let s1
    let s2
    if(!localStorage.getItem("score1")&&!localStorage.getItem("score2")){
         s1 = 0
         s2 = 0
         localStorage.setItem("score1","0")
         localStorage.setItem("score2","0")
        console.log("empty storage")
    }
    else{
         s1 = parseInt(localStorage.getItem("score1"))
         s2 = parseInt(localStorage.getItem("score2"))
    }
    score1 = s1
    score2 = s2
    playerScore1.innerHTML = `${s1}`
    playerScore2.innerHTML = `${s2}`
}
function announceWinner(playerScore){
    if(playerScore == playerScore1 ){
        score1+=1
        console.log((Number(localStorage.getItem("score1"))+1))
        localStorage.setItem("score1",(Number(localStorage.getItem("score1"))+1))
        localStorage.setItem("score2",score2)
        score = score1
        alert("You Lost")
    }else{
        score2+=1
        localStorage.setItem("score2",(Number(localStorage.getItem("score2"))+1))
        localStorage.setItem("score1",score1)
        score = score2
        alert("You won")
    }
  
    
    // playerScore.innerHTML=`${score}`
    displayScore()
}

class Ball{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.color = "black"
        this.prevx =0;
        this.prevy = 0;
        this.dx = 2.5;
        this.dy = 2.5;
        this.draw()
    }
    isInTouchPlayer(player1){
        if((this.x>=player1.x && this.x<=player1.x+10)&&(this.y>=player1.y && this.y<=player1.y+30)){
             
            return true;
        }
        return false;
    }
    isInTouchBorder(){
        // if((this.x<=0||this.x>=cx-2.5||this.y<=0||this.y>=cy-2.5)){
        //     return true;
        // }
        // return false;

        if(this.x<=0){
            return "left"
        }else{
            if (this.x>=cx-2.5) {
                return "right"
            } else {
                if (this.y<=0) {
                    return "top"
                } else {
                    if (this.y>=cy-2.5) {
                        return "bottom"
                    } else {
                        return "normal"
                    }
                }
                
            }
        }
    }
    isGameOver(){
        if(this.x<=0){
            return -1
        }else{
            if (this.x>=cx-2.5) {
                return 1
            }
        }
        return 0
    }
    clear(){
        c.clearRect(this.x-5,this.y-5,10,10)
    }
    draw(){
    
        c.beginPath()
        c.arc(this.x, this.y, 2.5, 0, 2 * Math.PI,true);
        c.fillStyle="white";
        c.fill()
        c.stroke();
    }
    moveXY(){
        this.prevx = this.x;
        this.prevy = this.y;
        this.clear();
        if(this.x<=0||this.x>=cx-2.5) this.dx=-this.dx;
        if(this.y<=0||this.y>=cy-2.5) this.dy=-this.dy;

        if(this.isInTouchPlayer(green)) this.dx=-this.dx;
        if(this.isInTouchPlayer(red)) this.dx=-this.dx,this.y;
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
    }
    moveDeg(){
        var mySetInterval= setInterval(() => {
            if(this.isGameOver()==0){
                this.moveXY();
                red.draw();
                green.draw()
            }else{
                if(this.isGameOver()==-1){
                    clearInterval(mySetInterval)
                    
                    announceWinner(playerScore2)
                    
                }
                if(this.isGameOver()==1){
                    clearInterval(mySetInterval)
                    announceWinner(playerScore1)
                    
                }
            }
            
         }, 20);
        
         

    }
    startgame(){
        c.clearRect(0,0,cx,cy)
        this.x = Math.random()*(cx-300)+100
        this.y = Math.random()*(cy-300)+100
        
        
        this.moveDeg()
        
    }


}



class Rect{
    
    constructor(x,y,color,turf){
        this.turf = turf;
        this.x = x;
        this.y = y;
        this.color = color;
        this.draw()
    }
    clear(){
        c.clearRect(this.x,this.y,10,30)
    }
    draw(){
    c.fillStyle = this.color
    c.fillRect(this.x,this.y,10,30)
    }

    borderControl(){

        if(this.turf=="left"){
            if(this.x<0){
                this.x = 0;
            }
            else{
                if(this.x>cx/2-10){
                    this.x = cx/2-10;
                }
            }
            if(this.y<0){
                this.y = 0;
            }
            else{
                if(this.y>cy-100){
                    this.y = cy-100;
                }
            }
        }
        else{
            if(this.turf=="right"){
                if(this.x<cx/2){
                    this.x = cx/2;
                }
                else{
                    if(this.x>cx-10){
                        this.x = cx-10;
                    }
                }
                if(this.y<0){
                    this.y = 0;
                }
                else{
                    if(this.y>cy-100){
                        this.y = cy-100;
                    }
                }
            }

        }
    }


    moveLeft(){
        this.clear()
        this.x-=5
        this.borderControl()
        this.draw();        
    }
    moveRight(){
        this.clear()
        this.x+=5
        this.borderControl()
        this.draw();        
    }

    moveTop(){
        this.clear()
        this.y-=5
        this.borderControl()
        this.draw();        
    }
    moveBottom(){
        this.clear()
        this.y+=5
        this.borderControl()
        this.draw();        
    }
    moveTo(x,y){
        this.clear()
        this.x=x
        this.y=y
        this.borderControl()
        this.draw()
    }


}
function AI(){
  
    setInterval(() => {
        // red.x = ball.x;
        screenRefresh()
        red.clear()
        //TODO red.y = ball.y-5; TODO
        red.y = ball.y;
        red.borderControl()
        
        red.draw()

    },1000);
}

function screenRefresh(){
    c.clearRect(0,0,10,cy)
}

var green = new Rect(700-10,0,"blue","right")
var red = new Rect(0,0,"red","left")
var randx = Math.floor(Math.random()*2)+1

var ball = new Ball(0,0);

var selector = document.querySelector("select");



document.querySelector("#clearBtn").addEventListener(
    "click",()=>{
        localStorage.setItem("score1",0)
        localStorage.setItem("score2",0)
        displayScore()
    }
)


window.addEventListener("keydown",(e)=>{
    if(e.code=="Enter"||e.code=="Space"){
        
        
        AI()
        // AI()
        ball.startgame()
    }
    // console.log(e.code)
    switch (e.code) {
        case "ArrowRight":
        case "Numpad6":
            console.log("right clicked");
            green.moveRight()
            break;
        case "ArrowLeft":
        case "Numpad4":
            console.log("left clicked");
            green.moveLeft()
            break;
        case "ArrowDown":
        case "Numpad2":
            console.log("down clicked");
            green.moveBottom()
            break;
        case "ArrowUp":
        case "Numpad8":
            console.log("up clicked");
            green.moveTop()
            break;
        

        default:
            break;
    }
    
        
    
})

