var canvas = document.getElementById("myCanvas")
var Game = {
    ctx: canvas.getContext("2d"),

    ballRadius: 10,

    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 2,
    dy: -2,
    paddleHeight: 75,
    paddleWidth: 10,
    paddleY: (canvas.height - this.paddleHeight) / 2,
    aiPaddleY: (canvas.height - this.paddleHeight) / 2,

    upPressed: false,
    downPressed: false,

    userScore: 0,
    aiScore: 0,
    keyDownHandler: function (e) {
        if (e.key == "Down" || e.key == "ArrowDown") {
            this.upPressed = true;
        }
        else if (e.key == "Up" || e.key == "ArrowUp") {
            this.downPressed = true;
        }
    },

    keyUpHandler: function (e) {
        if (e.key == "Down" || e.key == "ArrowDown") {
            this.upPressed = false;
        }
        else if (e.key == "Up" || e.key == "ArrowUp") {
            this.downPressed = false;
        }
    },

    drawCircle: function () {
        this.ctx.beginPath();
        this.ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();
        this.ctx.closePath();
    },

    resetBall: function () {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.dx = -(this.dx);
    },
    drawUserScore: function () {
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText(this.userScore, 240, 80);
    },

    drawAIScore: function () {
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText(this.aiScore, 430, 80);
    },

    drawBall: function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();
        this.ctx.closePath();
    },
    drawPaddle: function () {
        this.ctx.beginPath();
        this.ctx.rect(0, this.paddleY, this.paddleWidth, this.paddleHeight);
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();
        this.ctx.closePath();
    },

    drawAIpaddle: function () {
        this.ctx.beginPath();
        this.ctx.rect(canvas.width - this.paddleWidth, this.aiPaddleY, this.paddleWidth, this.paddleHeight);
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();
        this.ctx.closePath();
    },

    draw: function () {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBall();
        this.drawUserScore();
        this.drawAIScore();
        this.drawPaddle();
        this.drawAIpaddle();

        if (this.x + this.dx > canvas.width - this.ballRadius) {
            //To be modified to cancel increasing the score when the AI paddle hits the ball
            if (this.y > this.aiPaddleY && this.y < this.aiPaddleY + this.paddleHeight) {
                this.dx = -(this.dx);
            } else {
                ++this.userScore;
                this.resetBall()
            }
        } else if (this.x + this.dx < this.ballRadius) {
            if (this.y > this.paddleY && this.y < this.paddleY + this.paddleHeight) {
                this.dx = -(this.dx);
            }
            else {
                ++this.aiScore;
                this.resetBall()
            }
        }

        if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
            this.dy = -(this.dy);
        }

        if (this.upPressed) {
            this.paddleY += 7;
            if (this.paddleY + this.paddleHeight > canvas.height) {
                this.paddleY = canvas.height - this.paddleHeight;
            }
        }
        else if (this.downPressed) {
            this.paddleY -= 7;
            if (this.paddleY < 0) {
                this.paddleY = 0;
            }
        }

        //Move the AI Paddle
        let computerLevel = 0.1;
        this.aiPaddleY = (((this.y - (this.aiPaddleY + this.paddleHeight / 2))) * 0.5);

        this.x += this.dx;
        this.y += this.dy;
    }

}


 (function(){
   ;document.addEventListener("keydown", Game.keyDownHandler, false);
    ;document.addEventListener("keyup", Game.keyUpHandler, false);
    ;var interval =  setInterval(Game.draw, 10);
 })();