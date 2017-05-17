var Apple = function (RASTER_SIZE, canvasWidth, canvasHeight, context) {
    this.RASTER_SIZE = RASTER_SIZE;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.context = context;

    this.color = "red" //variabel

    this.xPos = this.createXPos();
    this.yPos = this.createYPos();
};

Apple.prototype.draw = function () {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.xPos, this.yPos, this.RASTER_SIZE, this.RASTER_SIZE);
};

Apple.prototype.update = function (key, sXPos, sYPos, aXPos, aYPos) {

    var newSnakeElement = false;

    if (sXPos == aXPos && sYPos == aYPos) {
        this.xPos = this.createXPos();
        this.yPos = this.createYPos();
        newSnakeElement = true;
    }

    this.draw();

    return newSnakeElement;
};

Apple.prototype.createXPos = function () {
    return (Math.floor(Math.random() * (this.canvasWidth / 10)) * 10);
};

Apple.prototype.createYPos = function () {
    return (Math.floor(Math.random() * (this.canvasHeight / 10)) * 10);
};
