var Apple = function (APPLE_IMG, RASTER_SIZE, canvasWidth, canvasHeight, context) {
    this.color = "red";
    this.img = APPLE_IMG;

    this.RASTER_SIZE = RASTER_SIZE;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.context = context;

    this.XPos = this.createXPos();
    this.YPos = this.createYPos();
};

/*Draws the apple on the canvas.*/
Apple.prototype.draw = function () {
    this.context.drawImage(this.img, this.XPos, this.YPos, this.RASTER_SIZE, this.RASTER_SIZE);
};

/*Compares apple and snake.*/
Apple.prototype.update = function (snakeArray) {

    var newSnakeElement = false;

    /*comparing the X and Y Position of snake and apple.
     *If X and Y position of apple and snake equals to each
     *other the function returns true.
     *In fact of that a new SnakeElement is going to be added
     *to the snakeArray by Snake.prototype.addSnakeElement.
     */
    if (snakeArray[0].XPos == this.XPos && snakeArray[0].YPos == this.YPos) {
        this.XPos = this.createXPos();
        this.YPos = this.createYPos();


        /*Checks if the apple is about to spawn at the
         *and calculates a new position.
         */
        for (var i = 1; i < snakeArray.length; i++) {
            if (snakeArray[i].XPos == this.XPos && snakeArray[i].YPos == this.YPos) {
                this.XPos = this.createXPos();
                this.YPos = this.createYPos();
                i = 1;
            }
        }

        newSnakeElement = true;
    }

    return newSnakeElement;
};


/*creating random X and Y Positions, apple can only spawn every 10 px in each direction...*/
Apple.prototype.createXPos = function () {
    return (Math.floor(Math.random() * (this.canvasWidth / this.RASTER_SIZE)) * this.RASTER_SIZE);
};

Apple.prototype.createYPos = function () {
    return (Math.floor(Math.random() * (this.canvasHeight / this.RASTER_SIZE)) * this.RASTER_SIZE);
};
