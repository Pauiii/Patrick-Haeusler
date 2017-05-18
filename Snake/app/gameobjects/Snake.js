var Snake = function (RASTER_SIZE, canvasWidth, canvasHeight, context, canvas) {
    this.snakeArray = [];
    this.collision = false;

    this.color = "yellow";

    this.RASTER_SIZE = RASTER_SIZE;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.context = context;
    this.canvas = canvas;
};

/*Sets the first three SnakeElements at snakeArray[0 - 2].
 *Used in privateStartGame of SnakeGame.
 */
Snake.prototype.createSnake = function () {
    for (var i = 0; i < 3; i++) {
        this.snakeArray[i] = new SnakeElements(this.snakeArray.length, this.RASTER_SIZE, this.canvasWidth, this.canvasHeight, this.context);
    }
};

/*Dynamic expansion of snakeArray every time an apple is eaten
 *by the snake.
 */
Snake.prototype.addSnakeElement = function () {
    this.snakeArray[this.snakeArray.length] = new SnakeElements(this.snakeArray.length + 1, this.RASTER_SIZE, this.canvasWidth, this.canvasHeight, this.context);
};

/*Draws the snake, apple and counter on the canvas.*/
Snake.prototype.draw = function (apple, counter) {
    apple.draw();
    counter.draw();
    for (var i = 0; i < this.snakeArray.length; i++) {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.snakeArray[i].XPos, this.snakeArray[i].YPos, this.RASTER_SIZE, this.RASTER_SIZE);
    }
};

/*Updating...*/
/*Gets a pressed key the current apple and counter and the
 *oldKey which was pressed befor key.
 *OldKey is only given if update is called the second time.
 */
Snake.prototype.update = function (key, apple, counter, oldKey) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    /*Checks if the snake turns by 180 degrees, and refuses
     *that action.
     */
    key = this.checkDirectionChange(key, oldKey);

    /*Checks if the snake is colliding with the border of the
     *canvas or is eating itself.
     */
    this.checkCollision(key, oldKey, counter);

    if (this.collision == true) {
        return this.collision;
    } else {
        var oldArray = [];

        /*Creates a deap copy of this.snakeArray.*/
        for (var i = 0; i < this.snakeArray.length; i++) {
            oldArray[i] = jQuery.extend(true, {}, this.snakeArray[i]);
        }

        this.updateElements(key, apple, counter, oldArray);

        this.draw(apple, counter);

        return key;
    }
};

/*Stops 180 degree turns of the snake*/
Snake.prototype.checkDirectionChange = function (key, oldKey) {
    /*If the key is the key with the opposite direction of
     *oldKey, key is going to be oldKey.
     *Returns the changed key, so that the snake can not do
     *a 180 degree turn.
     */
    if ((key == "w" && oldKey == "s") || (key == "ArrowUp" && oldKey == "ArrowDown") ||
        (key == "s" && oldKey == "w") || (key == "ArrowDown" && oldKey == "ArrowUp") ||
        (key == "a" && oldKey == "d") || (key == "ArrowLeft" && oldKey == "ArrowRight") ||
        (key == "d" && oldKey == "s") || (key == "ArrowRight" && oldKey == "ArrowLeft")) {
        key = oldKey;
    }

    return key;
}

/*Checks if the snake collides with itself or the border.*/
Snake.prototype.checkCollision = function (key, oldKey, counter) {
    /*Now checking collision with the border.*/
    if (this.snakeArray[0].XPos == -this.RASTER_SIZE || this.snakeArray[0].YPos == -this.RASTER_SIZE || this.snakeArray[0].XPos == this.canvasWidth || this.snakeArray[0].YPos == this.canvasHeight) {
        this.collision = true;
    }

    /*Now checking collision with itself.*/
    // Snake springt nicht in counter.endScreen() obwohl sich die SnakeElemente überlappen...
    for (var i = 0; i < this.snakeArray.length - 1; i++) {
        if (this.snakeArray[0] == this.snakeArray[i + 1]) {
            this.collision = true;
        }
    }
};

Snake.prototype.updateElements = function (key, apple, counter, oldArray) {
    /*Gets oldArray, which is a deap copy of this.snakeArray, 
     *befor it is changed, the current key, the apple and the
     *counter.
     *If a key is pressed, the cordinates of this.snakeArray[0]
     *will be changed in the direction the snake should move.
     */
    if (key == "w" || key == "ArrowUp") {
        this.snakeArray[0].YPos = oldArray[0].YPos - this.RASTER_SIZE;
    } else if (key == "a" || key == "ArrowLeft") {
        this.snakeArray[0].XPos = oldArray[0].XPos - this.RASTER_SIZE;
    } else if (key == "s" || key == "ArrowDown") {
        this.snakeArray[0].YPos = oldArray[0].YPos + this.RASTER_SIZE;
    } else if (key == "d" || key == "ArrowRight") {
        this.snakeArray[0].XPos = oldArray[0].XPos + this.RASTER_SIZE;
    }

    /*Now setting all the other SnakeElements of
     *this.snakeArray, except this.snakeArray[0] at the value
     *of the old this.snakeArray, called oldArray.
     */
    for (var j = 0; j < this.snakeArray.length - 1; j++) {
        this.snakeArray[j + 1] = oldArray[j];
    }

    /*Checks if the apple is eaten by the snake.*/
    var newSnakeElement = apple.update(key, this.snakeArray[0].XPos, this.snakeArray[0].YPos, apple.xPos, apple.yPos);

    /*If the apple is eaten an new SnakeElement will be added
     *to this.snakeArray and the score will be increased by 9.
     */
    if (newSnakeElement == true) {
        this.addSnakeElement();
        counter.update();
    }
};
