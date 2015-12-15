/**
 * Created by artsiom.tserakhovich on 12.12.2015.
 */
var drawer;
var figure;

window.onload = function () {
    var canvas = document.querySelector('canvas');
    drawer = new Entity.Drawer(canvas);
    figure = new Entity.Figure(30, 60, 150, 20);
    drawer.drawFigure(figure);
    canvas.onclick = function(e){

        console.log(e.clientX, e.pageX);
    }
}

function move() {
    var dx = document.getElementById("x").value;
    var dy = document.getElementById("y").value;
    var dz = 0;
    figure.move(dx, dy, dz);
    drawer.clear();
    drawer.drawFigure(figure);
}

function scale() {
    var delta = document.getElementById("cfx").value;
    figure.scale(delta);
    drawer.clear();
    drawer.drawFigure(figure);
}

function rotate() {
    var angleX = document.getElementById("angleX").value;
    var angleY = document.getElementById("angleY").value;
    var angleZ = document.getElementById("angleZ").value;
    figure.rotate(angleX, angleY, angleZ);
    drawer.clear();
    drawer.drawFigure(figure);
}


