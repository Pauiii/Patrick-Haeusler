var Counter = function(canvasWidth, canvasHeigth, context) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeigth;
    
    this.context = context;
    
    this.color = "white";
    this.font = "15px Arial";
    
    this.XPos = this.createXPos();
    this.YPos = this.createYPos();
};


Counter.prototype.createXPos = function () {
    return (this.canvasWidth / 2) - 25;
};

Counter.prototype.createYPos = function () {
    return 20;
};

Counter.prototype.draw = function (score) {
    var string = "Score: " + score;
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(string, this.XPos, this.YPos);
};

Counter.prototype.update = function () {
    this.draw(0);
};