var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var paddleHeight = 75;
var paddleWidth = 10;
var paddleY = (canvas.height-paddleHeight)/2;
var aiPaddleY = (canvas.height-paddleHeight)/2;

var upPressed = false;
var downPressed = false;

var userScore = 0;
var aiScore = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Down" || e.key == "ArrowDown") {
        upPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Down" || e.key == "ArrowDown") {
        upPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        downPressed = false;
    }
}

function drawCircle(){
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 80, 0, Math.PI*2);
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.closePath();
}

function resetBall(){
    x = canvas.width/2;
    y = canvas.height/2;
    dx = -dx;
}

function drawLine(){
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
}

function drawUserScore() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(userScore, 240, 80);
}

function drawAIScore(){
    ctx.font = "50px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(aiScore, 430, 80);
}

//Draw Playing Ball
function drawBall() {
    let x1 = x
    let y1 = y
    ctx.beginPath();
    ctx.arc(this.x1, this.y1, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

//User Paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(0,paddleY, paddleWidth,paddleHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

//AI paddle
function drawAIpaddle(){
    ctx.beginPath();
    ctx.rect(canvas.width-paddleWidth, aiPaddleY, paddleWidth,paddleHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
    console.log(this.x1)
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let ball = drawBall();
    
    drawUserScore();
    drawAIScore();
    drawPaddle();
    drawAIpaddle();
    
    if(x + dx > canvas.width-ballRadius) {
        //To be modified to cancel increasing the score when the AI paddle hits the ball
        if(y > aiPaddleY && y < aiPaddleY + paddleHeight){
            dx = -dx;
        }else{
            ++userScore;
            resetBall()
        }
    }else if(x + dx < ballRadius){
        if(y > paddleY && y < paddleY + paddleHeight) {
            dx = -dx;
        }
        else {
            ++aiScore;
            resetBall()
        }
    }

    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    if(upPressed) {
        paddleY += 7;
        if (paddleY + paddleHeight > canvas.height){
            paddleY = canvas.height - paddleHeight;
        }
    }
    else if(downPressed) {
        paddleY -= 7;
        if (paddleY < 0){
            paddleY = 0;
        }
    }

    //Move the AI Paddle
    let computerLevel = 0.1;
    aiPaddleY = (((y - (aiPaddleY + paddleHeight / 2))) * 0.5);
    
    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);