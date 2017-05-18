var Counter = function (canvasWidth, canvasHeigth, context) {
    this.score = 0;
    this.collsionBoolean = false;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeigth;

    this.context = context;
    this.canvas = canvas;

    this.color = "white";
    this.font = "15px Arial";

    this.XPos = this.createXPos();
    this.YPos = this.createYPos();
};

/*Draws the counter on the canvas.*/
Counter.prototype.draw = function () {
    var string = "Score: " + this.score;
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(string, this.XPos, this.YPos);
};

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
Counter.prototype.startScreen = function () {
    var instruction = "Please, press an arrow to start the game.";
    var score = "Score: 0";
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(score, this.XPos, this.YPos);
    this.context.fillText(instruction, 20, 150);
};

/*Draws the end screen on the canvas.*/
Counter.prototype.endScreen = function () {
    //this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    var instruction = "If you want to try again, please press ESC.";
    var score = "Score: " + this.score;
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(score, this.XPos, this.YPos);
    this.context.fillText(instruction, 20, 150);
};

/*
Counter.prototype.restartGame = function () {
    var ESC = document.addEventListener("keydown", this.getESC);
    return ESC;
};

Counter.prototype.getESC = function (event) {
    return event.keyCode;
};*/

/*Createing the X and Y position of the score.*/
Counter.prototype.createXPos = function () {
    return (this.canvasWidth / 2) - 25;
};

Counter.prototype.createYPos = function () {
    return 20;
};