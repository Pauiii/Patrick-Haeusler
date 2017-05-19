/* Start the Snake game from here! */
window.onload = function () {
    var canvas = document.querySelector("#canvas");

    var snakeIMG = new Image();
    snakeIMG.src = "img/Regenbogen.jpg";

    var backgroundIMG = new Image();
    backgroundIMG.src = "img/Sternenhimmel.png";

    var appleIMG = new Image();
    appleIMG.src = "img/Stern.png";

    var meteorIMG = new Image();
    meteorIMG.src = "img/asteroid.png";

    game.init(canvas, snakeIMG, backgroundIMG, appleIMG, meteorIMG);
}
