var Snake = function (SNAKE_IMG, METEOR_IMG, RASTER_SIZE, canvasWidth, canvasHeight, context) {
    this.snakeArray = [];
    this.meteorArray = [];

    this.collision = false;

    this.meteorCounter = 0;
    this.MAX_METEORS = 20;

    this.color = "black";
    this.lineWidth = 3;
    this.imgS = SNAKE_IMG;
    this.imgM = METEOR_IMG;

    this.RASTER_SIZE = RASTER_SIZE;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.context = context;
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
Snake.prototype.draw = function (apple, counter, level) {
    counter.drawBackground();

    if (level != "Level 1") {
        this.drawMeteors();
    } else if (level == "Level 5") {

    }

    counter.draw(level, this.meteorCounter);
    apple.draw();

    for (var i = 0; i < this.snakeArray.length; i++) {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.snakeArray[i].XPos, this.snakeArray[i].YPos, this.RASTER_SIZE, this.RASTER_SIZE);

        this.context.drawImage(this.imgS, this.snakeArray[i].XPos, this.snakeArray[i].YPos, this.RASTER_SIZE, this.RASTER_SIZE);
        if (i > 0) {
            this.context.strokeStyle = this.color;
            this.context.lineWidth = this.lineWidth;
            this.context.strokeRect(this.snakeArray[i].XPos, this.snakeArray[i].YPos, this.RASTER_SIZE, this.RASTER_SIZE);
        }
    }
};

/*Updating...*/
Snake.prototype.update = function (key, apple, counter, oldKey, level) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    var oldArray = [];

    /*Creates a deap copy of this.snakeArray.*/
    for (var i = 0; i < this.snakeArray.length; i++) {
        oldArray[i] = jQuery.extend(true, {}, this.snakeArray[i]);
    }

    key = this.checkDirectionChange(key, oldKey);

    this.checkCollision();

    if (this.collision == true) {
        return this.collision;
    } else {
        this.updateElements(key, apple, counter, oldArray, level);

        this.draw(apple, counter, level);

        return key;
    }
};

/*Stops 180 degree turns of the snake*/
Snake.prototype.checkDirectionChange = function (key, oldKey) {
    if ((key == "w" && oldKey == "s") || (key == "ArrowUp" && oldKey == "ArrowDown") ||
        (key == "s" && oldKey == "w") || (key == "ArrowDown" && oldKey == "ArrowUp") ||
        (key == "a" && oldKey == "d") || (key == "ArrowLeft" && oldKey == "ArrowRight") ||
        (key == "d" && oldKey == "s") || (key == "ArrowRight" && oldKey == "ArrowLeft")) {
        key = oldKey;
    }

    return key;
}

/*Checks if the snake collides with itself or the border.*/
Snake.prototype.checkCollision = function () {
    /*Now checking collision with the border.*/
    if (this.snakeArray[0].XPos == -this.RASTER_SIZE || this.snakeArray[0].YPos == -this.RASTER_SIZE || this.snakeArray[0].XPos == this.canvasWidth || this.snakeArray[0].YPos == this.canvasHeight) {
        this.collision = true;
    }

    /*Now checking collision with itself.*/
    var head = this.snakeArray[0];

    for (var i = 1; i < this.snakeArray.length; i++) {
        var testElement = this.snakeArray[i];
        if (head.XPos == testElement.XPos && head.YPos == testElement.YPos) {
            this.collision = true;
        }
    }

    /*Now checking collision with meteors*/
    for (var j = 0; j < this.meteorArray.length; j++) {
        var meteor = this.meteorArray[j];
        if (head.XPos == meteor.XPos && head.YPos == meteor.YPos) {
            this.collision = true;
        }
    }
};

/*Updating all the Elements*/
Snake.prototype.updateElements = function (key, apple, counter, oldArray, level) {
    if (key == "w" || key == "ArrowUp") {
        this.snakeArray[0].YPos = oldArray[0].YPos - this.RASTER_SIZE;
    } else if (key == "a" || key == "ArrowLeft") {
        this.snakeArray[0].XPos = oldArray[0].XPos - this.RASTER_SIZE;
    } else if (key == "s" || key == "ArrowDown") {
        this.snakeArray[0].YPos = oldArray[0].YPos + this.RASTER_SIZE;
    } else if (key == "d" || key == "ArrowRight") {
        this.snakeArray[0].XPos = oldArray[0].XPos + this.RASTER_SIZE;
    }

    for (var i = 0; i < this.snakeArray.length - 1; i++) {
        this.snakeArray[i + 1] = oldArray[i];
    }

    var newSnakeElement = apple.update(this.snakeArray);

    if (newSnakeElement == true) {
        if (level == "Level 2" && this.meteorCounter < this.MAX_METEORS) {
            this.addMeteors();
            this.meteorCounter++;
        }

        this.addSnakeElement();
        counter.update();
    }
};

/*Draws the Meteors*/
Snake.prototype.drawMeteors = function () {
    if (this.meteorArray.length != undefined) {
        for (var i = 0; i < this.meteorArray.length; i++) {
            this.context.drawImage(this.imgM, this.meteorArray[i].XPos, this.meteorArray[i].YPos, this.RASTER_SIZE, this.RASTER_SIZE);
        }
    }
};

/*Creates the Meteors*/
Snake.prototype.addMeteors = function () {
    if (this.meteorArray.length == undefined) {
        this.meteorArray[0] = new Meteor(this.RASTER_SIZE, this.canvasWidth, this.canvasHeight, this.context);
    } else {
        this.meteorArray[this.meteorArray.length] = new Meteor(this.RASTER_SIZE, this.canvasWidth, this.canvasHeight, this.context);
    }
};

Snake.prototype.getMeteorCount = function () {
    return this.meteorCounter;
};
