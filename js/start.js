/**
 * Created by artsiom.tserakhovich on 12.12.2015.
 */
var drawer;
var figure;
var canvas;
var r1 = 30;
var r2 = 60;
var h = 150;
var q = 20;
window.onload = function () {
    canvas = document.querySelector('canvas');

    resize();
    drawer = new Entity.Drawer(canvas);
    figure = new Entity.Figure(r1, r2, h, q);
    drawer.drawFigure(figure);
    canvas.addEventListener("wheel", onwheel);
    setMopt();
    document.getElementById("r1").value = r1;
    document.getElementById("r2").value = r2;
    document.getElementById("h").value = h;
    document.getElementById("q").value = q;

}

window.onresize = function(e){
    resize();
    drawer.oX = canvas.height / 2;
    drawer.oY = canvas.width / 2;

    drawer.drawFigure(figure);
}

function onwheel(e){
    e = e || window.event;
    var delta = e.deltaY || e.detail || e.wheelDelta;
    if (delta > 0){
        figure.scale(0.9);
        drawer.clear()
        drawer.drawFigure(figure);
    } else if (delta < 0){
        figure.scale(1.1);
        drawer.clear()
        drawer.drawFigure(figure);
    }
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

function resize(){
    canvas.height = window.innerHeight * 0.85;
    canvas.width = window.innerWidth * 0.80;
}
function build(){
    var r1 = Number(document.getElementById("r1").value);
    var r2 = Number(document.getElementById("r2").value);
    var h = Number(document.getElementById("h").value);
    var q = Number(document.getElementById("q").value);
    figure = new Entity.Figure(r1, r2, h, q);
    drawer.clear();
    drawer.drawFigure(figure);
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

function setMopt(){
    var radio = document.querySelector('input[name = "mopt"]:checked');
    if (radio.id == "none"){
        canvas.onmousedown = null;
        canvas.onmousemove = null;
        canvas.onmouseup = null;
    }
    if (radio.id == "move"){
        canvas.onmousedown = null;
        canvas.onmousemove = null;
        canvas.onmouseup = null;
        canvas.onmousedown = function(e){
            var x1 = e.clientX;
            var y1 = e.clientY;
            canvas.onmousemove = function(em){
                var x2 = em.clientX;
                var y2 = em.clientY;
                var dx = (x2 - x1);
                var dy = (y1 - y2);
                figure.move(dx, dy, 0);
                drawer.clear();
                drawer.drawFigure(figure);
                x1 = x2;
                y1 = y2;
            }
            canvas.onmouseup = function(eu){
                canvas.onmousemove = null;
            }
        }
    }
    if (radio.id == "mrotX"){
        canvas.onmousedown = null;
        canvas.onmousemove = null;
        canvas.onmouseup = null;
        canvas.onmousedown = function(e){
            var x1 = e.clientX;
            var y1 = e.clientY;
            canvas.onmousemove = function(em){
                var x2 = em.clientX;
                var y2 = em.clientY;
                var angle = (y1 - y2);
                figure.rotate(angle, 0, 0);
                drawer.clear();
                drawer.drawFigure(figure);
                x1 = x2;
                y1 = y2;
            }
            canvas.onmouseup = function(eu){
                canvas.onmousemove = null;
            }
        }
    }
    if (radio.id == "mrotY"){
        canvas.onmousedown = null;
        canvas.onmousemove = null;
        canvas.onmouseup = null;
        canvas.onmousedown = function(e){
            var x1 = e.clientX;
            var y1 = e.clientY;
            canvas.onmousemove = function(em){
                var x2 = em.clientX;
                var y2 = em.clientY;
                var angle = (x2 - x1);
                figure.rotate(0, angle, 0);
                drawer.clear();
                drawer.drawFigure(figure);
                x1 = x2;
                y1 = y2;
            }
            canvas.onmouseup = function(eu){
                canvas.onmousemove = null;
            }
        }
    }
    if (radio.id == "mrotZ"){
        canvas.onmousedown = null;
        canvas.onmousemove = null;
        canvas.onmouseup = null;
        canvas.onmousedown = function(e){
            var x1 = e.clientX;
            var y1 = e.clientY;
            canvas.onmousemove = function(em){
                var x2 = em.clientX;
                var y2 = em.clientY;
                var angle = (x2 - x1);
                figure.rotate(0, 0, angle);
                drawer.clear();
                drawer.drawFigure(figure);
                x1 = x2;
                y1 = y2;
            }
            canvas.onmouseup = function(eu){
                canvas.onmousemove = null;
            }
        }
    }
}


