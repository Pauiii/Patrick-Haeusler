var SnakeElements = function (snakeLength, RASTER_SIZE, canvasWidth, canvasHeight, context) {
    this.RASTER_SIZE = RASTER_SIZE;
    this.context = context;

    this.snakeLength = snakeLength;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.color = "yellow";

    this.XPos = this.createXPos();
    this.YPos = this.createYPos();
};

/*Creating the X and Y position of the first three
 *SnakeElements.
 */
SnakeElements.prototype.createXPos = function () {
    if (this.snakeLength < 3) {
        return (this.canvasWidth / 2);
    }
};

SnakeElements.prototype.createYPos = function () {
    if (this.snakeLength < 3) {
        return ((this.canvasHeight / 2) + (this.snakeLength * this.RASTER_SIZE));
    }
};
