var Apple = function (RASTER_SIZE, canvasWidth, canvasHeight, context) {
    this.RASTER_SIZE = RASTER_SIZE;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.context = context;

    this.color = "red" //variabel

    this.xPos = this.createXPos();
    this.yPos = this.createYPos();
};

/*Draws the apple on the canvas.*/
Apple.prototype.draw = function () {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.xPos, this.yPos, this.RASTER_SIZE, this.RASTER_SIZE);
};

/*Compares apple and snake.*/
Apple.prototype.update = function (key, sXPos, sYPos, aXPos, aYPos) {

    var newSnakeElement = false;
    
    /*comparing the X and Y Position of snake and apple.
     *If X and Y position of apple and snake equals to each
     *other the function returns true.
     *In fact of that a new SnakeElement is going to be added
     *to the snakeArray by Snake.prototype.addSnakeElement.
     */
    if (sXPos == aXPos && sYPos == aYPos) {
        this.xPos = this.createXPos();
        this.yPos = this.createYPos();
        newSnakeElement = true;
    }

    return newSnakeElement;
};


/*creating random X and Y Positions, apple can only spawn every 10 px in each direction...*/
Apple.prototype.createXPos = function () {
    return (Math.floor(Math.random() * (this.canvasWidth / 10)) * 10);
};

Apple.prototype.createYPos = function () {
    return (Math.floor(Math.random() * (this.canvasHeight / 10)) * 10);
};
