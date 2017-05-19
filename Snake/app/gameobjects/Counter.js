var Counter = function (BACKGROUND_IMG, canvasWidth, canvasHeigth, context) {
    this.score = 0;
    this.collsionBoolean = false;

    this.color = "white";
    this.font = "15px Arial";
    this.img = BACKGROUND_IMG;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeigth;

    this.context = context;
    this.canvas = canvas;
};

/*Draws the counter on the canvas.*/
Counter.prototype.draw = function (level, meteorCounter) {
    var score = "Score: " + this.score;

    var scoreWidth = (this.canvasWidth / 2) - (this.context.measureText(score).width / 2);

    this.levelScreen(level);
    this.meteorScreen(meteorCounter);

    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(score, scoreWidth, 20);
};

Counter.prototype.drawBackground = function () {
    this.context.drawImage(this.img, 0, 0, this.canvasWidth, this.canvasHeight);
}

/*Updates the score.*/
Counter.prototype.update = function () {
    /*The score will be updated every time the X and Y
     *position from snake and apple equals.
     *Used in Snake.prototype.updateElements.
     */
    this.score += 9;
    this.draw();
};

/*Draws the start screen on the canvas.*/
Counter.prototype.startScreen = function (level, meteorCount) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    var score = "Score: 0";
    var instruction = "Please, press an arrow to start the game.";

    var scoreWidth = (this.canvasWidth / 2) - (this.context.measureText(score).width / 2);
    var instructionWidth = (this.canvasWidth / 2) - (this.context.measureText(instruction).width / 2);

    this.context.drawImage(this.img, 0, 0, this.canvasWidth, this.canvasHeight);

    this.levelScreen(level);
    this.meteorScreen(meteorCount)

    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(score, scoreWidth, 20);
    this.context.fillText(instruction, instructionWidth, 150);
};

/*Draws the end screen on the canvas.*/
Counter.prototype.endScreen = function (level, meteorCount) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    var score = "Score: " + this.score;
    var gameOver = "Game Over";
    var instruction = "If you want to try again, please press ESC.";

    var scoreWidth = (this.canvasWidth / 2) - (this.context.measureText(score).width / 2);
    var gameOverWidth = (this.canvasWidth / 2) - (this.context.measureText(gameOver).width / 2);
    var instrucionWidth = (this.canvasWidth / 2) - (this.context.measureText(instruction).width / 2);

    this.context.drawImage(this.img, 0, 0, this.canvasWidth, this.canvasHeight);

    this.levelScreen(level);
    this.meteorScreen(meteorCount);

    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(score, scoreWidth, 20);
    this.context.fillText(gameOver, gameOverWidth, 130);
    this.context.fillText(instruction, instrucionWidth, 150);
};

/*Draws the Text for amount of meteors*/
Counter.prototype.meteorScreen = function (meteorCount) {
    var meteors = "Meteors: " + meteorCount;

    var meteorsWidth = (this.canvasWidth) - (this.context.measureText(meteors).width + 10);

    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(meteors, meteorsWidth, 20)
};

/*Draws the text of the current level*/
Counter.prototype.levelScreen = function (level) {
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(level, 10, 20);
};

Counter.prototype.getScore = function () {
    return this.score;
};
