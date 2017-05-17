var Counter = function (canvasWidth, canvasHeigth, context) {
    this.score = 0;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeigth;

    this.context = context;
    this.canvas = canvas;

    this.color = "white";
    this.font = "15px Arial";

    this.XPos = this.createXPos();
    this.YPos = this.createYPos();
};

Counter.prototype.startScreen = function () {
    var instruction = "Please, press an arrow to start the game.";
    var score = "Score: 0";
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(score, this.XPos, this.YPos);
    this.context.fillText(instruction, 20, 150);
};

Counter.prototype.endScreen = function () {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    var instruction = "If you want to try again, please press ESC.";
    var score = "Score: " + this.score;
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(score, this.XPos, this.YPos);
    this.context.fillText(instruction, 20, 150);
    
    location.reload();
};

Counter.prototype.restartGame = function () {
    var ESC = document.addEventListener("keydown", this.getESC);
    return ESC;
};

Counter.prototype.getESC = function (event) {
    return event.keyCode;
};

Counter.prototype.createXPos = function () {
    return (this.canvasWidth / 2) - 25;
};

Counter.prototype.createYPos = function () {
    return 20;
};

Counter.prototype.draw = function () {
    var string = "Score: " + this.score;
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(string, this.XPos, this.YPos);
};

Counter.prototype.update = function () {
    this.score += 9;
    this.draw();
};
