var Snake = function (RASTER_SIZE, canvasWidth, canvasHeight, context, canvas) {
    this.snakeArray = [];

    this.color = "yellow";

    this.RASTER_SIZE = RASTER_SIZE;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.context = context;
    this.canvas = canvas;
};

Snake.prototype.createSnake = function () {
    for (var i = 0; i < 3; i++) {
        this.snakeArray[i] = new SnakeElements(this.snakeArray.length, this.RASTER_SIZE, this.canvasWidth, this.canvasHeight, this.context);
    }
};

Snake.prototype.addSnakeElement = function () {
    this.snakeArray[this.snakeArray.length] = new SnakeElements(this.snakeArray.length + 1, this.RASTER_SIZE, this.canvasWidth, this.canvasHeight, this.context);
};

Snake.prototype.draw = function (apple, counter) {
    for (var i = 0; i < this.snakeArray.length; i++) {
        apple.draw();
        counter.draw(0);
        this.context.fillStyle = this.color;
        this.context.fillRect(this.snakeArray[i].XPos, this.snakeArray[i].YPos, this.RASTER_SIZE, this.RASTER_SIZE);
    }
};

Snake.prototype.update = function (key, apple, counter, oldKey) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    key = this.checkDirectionChange(key, oldKey);
    this.checkCollision(key, oldKey, counter);

    var oldArray = [];

    for (var i = 0; i < this.snakeArray.length; i++) {
        oldArray[i] = jQuery.extend(true, {}, this.snakeArray[i]);
    }

    if (key == "w" || key == "ArrowUp") {
        this.snakeArray[0].YPos = oldArray[0].YPos - this.RASTER_SIZE;

        this.updateElements(key, apple, counter, oldArray);
    } else if (key == "a" || key == "ArrowLeft") {
        this.snakeArray[0].XPos = oldArray[0].XPos - this.RASTER_SIZE;

        this.updateElements(key, apple, counter, oldArray);
    } else if (key == "s" || key == "ArrowDown") {
        this.snakeArray[0].YPos = oldArray[0].YPos + this.RASTER_SIZE;

        this.updateElements(key, apple, counter, oldArray);
    } else if (key == "d" || key == "ArrowRight") {
        this.snakeArray[0].XPos = oldArray[0].XPos + this.RASTER_SIZE;

        this.updateElements(key, apple, counter, oldArray);
    }
    
    this.draw(apple, counter);
    
    return key;
};

Snake.prototype.checkDirectionChange = function (key, oldKey) {
    if ((key == "w" && oldKey == "s") || (key == "ArrowUp" && oldKey == "ArrowDown") ||
        (key == "s" && oldKey == "w") || (key == "ArrowDown" && oldKey == "ArrowUp") ||
        (key == "a" && oldKey == "d") || (key == "ArrowLeft" && oldKey == "ArrowRight") ||
        (key == "d" && oldKey == "s") || (key == "ArrowRight" && oldKey == "ArrowLeft")) {
        key = oldKey;
    }
    
    return key;
}

Snake.prototype.checkCollision = function (key, oldKey, counter) {
    if (this.snakeArray[0].XPos == 0 || this.snakeArray[0].YPos == 0 || this.snakeArray[0].XPos == this.canvasWidth || this.snakeArray[0].YPos >= this.canvasHeight) {
        alert("End");
    }
    
    //... Alert wird nicht aufgerufen wenn zwei Elemente überlappen...
    for (var i = 0; i < this.snakeArray.length - 1; i++) {
        if (this.snakeArray[0] == this.snakeArray[i + 1]) {
            alert("End");
        }
    }
};

Snake.prototype.updateElements = function (key, apple, counter, oldArray) {
    for (var j = 0; j < this.snakeArray.length - 1; j++) {
        this.snakeArray[j + 1] = oldArray[j];
    }

    var newSnakeElement = apple.update(key, this.snakeArray[0].XPos, this.snakeArray[0].YPos, apple.xPos, apple.yPos);
    var newCounterElement = counter.update();

    if (newSnakeElement == true) {
        this.addSnakeElement();
    }
};
