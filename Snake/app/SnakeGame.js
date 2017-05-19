var game = (function () {

    var privateContext;
    var privateCanvas;

    /* Game Constants */
    var SNAKE_IMG;
    var BACKGROUND_IMG;
    var APPLE_IMG;
    var METEOR_IMG;
    var GAME_WIDTH;
    var GAME_HEIGHT;
    var RASTER_SIZE = 12.5; // i.e. size of snake elements and apples

    var snake;
    var apple;
    var counter;

    var key;
    var oldKey;

    var level = "Level 1";

    /* Variables and constants to control framerate */
    var FPS = 10; /* change this to change framerate in the game */
    var now;
    var then = Date.now();
    var interval = 1000 / FPS;
    var delta;

    // Draws the canvas
    function privateDraw() {
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);
            //console.log("Tick, now drawing with: " + FPS + "fps!");
            privateSetLevel();

            if (oldKey == true) {
                counter.endScreen(level, snake.getMeteorCount());
                document.addEventListener("keydown", privateGetESC);
            } else {
                document.addEventListener("keydown", privateGetKey);
                privateUpdate();
            }
        }
        window.requestAnimationFrame(privateDraw);
    }

    /*Increases the speed of the snake.*/
    function privateSetLevel() {
        if (counter.getScore() >= 50) {
            level = "Level 2";
        } else if (counter.getScore() >= 100) {
            level = "Level 3";
            interval = 400 / FPS;
        } else if (counter.getScore() >= 200) {
            level = "Level 4";
            interval = 200 / FPS;
        } else if (counter.getScore() >= 400) {
            level = "Level: 5";
        }
    }

    /*Gets ESC to reload the page.*/
    function privateGetESC(event) {
        if (event.key == "Escape") {
            location.reload();
        }
    }

    /*Gets the pressed key.*/
    function privateGetKey(event) {
        key = event.key;
    }

    /*Calls snake.update to change all the elements.*/
    function privateUpdate() {
        counter.startScreen(level, snake.getMeteorCount());
        if (key == "w" || key == "ArrowUp" ||
            key == "s" || key == "ArrowDown" ||
            key == "a" || key == "ArrowLeft" ||
            key == "d" || key == "ArrowRight") {
            oldKey = snake.update(key, apple, counter, oldKey, level);
        } else if (key == "p" || key == "Pause") {
            counter.startScreen(level, snake.getMeteorCount());
        }
    }

    // Setzt den Canvas und dessen Context als Variablen
    function privateSetContext(canvas) {
        privateCanvas = canvas;
        privateContext = canvas.getContext("2d");
    }

    function privateStartGame() {
        snake = new Snake(SNAKE_IMG, METEOR_IMG, RASTER_SIZE, GAME_WIDTH, GAME_HEIGHT, privateContext, privateCanvas);
        snake.createSnake();
        apple = new Apple(APPLE_IMG, RASTER_SIZE, GAME_WIDTH, GAME_HEIGHT, privateContext);
        counter = new Counter(BACKGROUND_IMG, GAME_WIDTH, GAME_HEIGHT, privateContext, privateCanvas);

        window.requestAnimationFrame(privateDraw);
    }

    function publicInit(canvas, snakeIMG, backgroundIMG, appleIMG, meteorIMG) {
        SNAKE_IMG = snakeIMG;
        BACKGROUND_IMG = backgroundIMG;
        APPLE_IMG = appleIMG;
        METEOR_IMG = meteorIMG;

        GAME_HEIGHT = canvas.height;
        GAME_WIDTH = canvas.width;
        privateSetContext(canvas);
        privateStartGame();
    }

    return {
        init: publicInit
    };
})();
