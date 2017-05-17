var game = (function () {

    var privateContext;
    var privateCanvas;

    /* Game Constants */
    var GAME_WIDTH;
    var GAME_HEIGHT;
    var RASTER_SIZE = 10; // i.e. size of snake elements and apples

    var snake;
    var apple;
    var counter;

    var key;
    var oldKey;

    /* Variables and constants to control framerate */
    var FPS = 10; /* change this to change framerate in the game */
    var now;
    var then = Date.now();
    var interval = 1000 / FPS;
    var delta;

    // Draws the canvas
    function privateDraw() {
        window.requestAnimationFrame(privateDraw);

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);
            console.log("Tick, now drawing with: " + FPS + "fps!");
            // draw and check collisions here...
            
            //privateCanvas.setAttribute('tabindex', '0');
            //privateCanvas.focus();
            //privateCanvas.addEventListener("keydown", getKey, true);

            document.addEventListener("keydown", getKey);
            update();
        }
    }

    function getKey(event) {
        key = event.key;
    }

    function update() {
        oldKey = snake.update(key, apple, counter, oldKey);
    }

    // Setzt den Canvas und dessen Context als Variablen
    function privateSetContext(canvas) {
        privateCanvas = canvas;
        privateContext = canvas.getContext("2d");
    }

    /* Todo: Call this function only after player has pressed the start key */
    function privateStartGame() {
        /* Todo: initialize objects (i.e. apple, snake, counter) here */

        snake = new Snake(RASTER_SIZE, GAME_WIDTH, GAME_HEIGHT, privateContext, privateCanvas);
        snake.createSnake();
        apple = new Apple(RASTER_SIZE, GAME_WIDTH, GAME_HEIGHT, privateContext);
        counter = new Counter(GAME_WIDTH, GAME_HEIGHT, privateContext);

        window.requestAnimationFrame(privateDraw);
    }

    function publicInit(canvas) {
        GAME_HEIGHT = canvas.height;
        GAME_WIDTH = canvas.width;
        privateSetContext(canvas);
        privateStartGame();
    }

    return {
        init: publicInit
    };
})();
