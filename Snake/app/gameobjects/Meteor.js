var Meteor = function (RASTER_SIZE, canvasWidth, canvasHeight, context) {
    this.RASTER_SIZE = RASTER_SIZE;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.context = context;

    this.XPos = this.createXPos();
    this.YPos = this.createYPos();
};

Meteor.prototype.update = function (apple, snakeArray) {
    this.XPos = this.createXPos();
    this.YPos = this.createYPos();

    for (var i = 1; i < snakeArray.length; i++) {
        if ((this.XPos == apple.XPos && this.YPos == apple.YPos) || (this.XPos == snakeArray[i].XPos && this.YPos == snakeArray[i].YPos)) {
            this.createXPos();
            this.createYPos();
            i = 1;
        }
    }
};

Meteor.prototype.createXPos = function () {
    return (Math.floor(Math.random() * (this.canvasWidth / this.RASTER_SIZE)) * this.RASTER_SIZE);
};

Meteor.prototype.createYPos = function () {
    return (Math.floor(Math.random() * (this.canvasHeight / this.RASTER_SIZE)) * this.RASTER_SIZE);
};
