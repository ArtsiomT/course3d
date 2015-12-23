(function (Entity){
    var Drawer = (function () {
        function Drawer(canvas){
            this.canvas = canvas;
            this.context = canvas.getContext('2d');
            this.oX = canvas.height / 2;
            this.oY = canvas.width / 2;
        }

        Drawer.prototype.drawLine = function (x1, y1, x2, y2) {
            this.context.beginPath();
            this.context.moveTo(x1, y1);
            this.context.lineTo(x2, y2);
            this.context.stroke();
            this.context.closePath();
        }

        Drawer.prototype.drawLine = function (apex1, apex2, color){
            var tempCol = this.context.strokeStyle;
            this.context.strokeStyle = color;
            this.context.beginPath();
            this.context.moveTo(apex1.x + this.oY, -apex1.y + this.oX);
            this.context.lineTo(apex2.x + this.oY, -apex2.y + this.oX);
            this.context.stroke();
            this.context.closePath();
            this.context.strokeStyle = tempCol;
        }

        Drawer.prototype.drawCylinder = function (cylinder) {
            this.drawAxes();
            for (var i = 0; i < cylinder.upEdgePoints.length - 1; i++){
                this.drawLine(cylinder.upEdgePoints[i], cylinder.upEdgePoints[i+1]);
                this.drawLine(cylinder.downEdgePoints[i], cylinder.downEdgePoints[i+1]);
                this.drawLine(cylinder.upEdgePoints[i], cylinder.downEdgePoints[i]);
            }
        }

        Drawer.prototype.drawFigure = function(figure){
            this.drawAxes();
            for (var i = 0; i < figure.q; i++){
                this.drawLine(figure.cylinder1.upEdgePoints[i], figure.cylinder1.upEdgePoints[i+1], "red");
                this.drawLine(figure.cylinder2.upEdgePoints[i], figure.cylinder2.upEdgePoints[i+1], "blue");
                this.drawLine(figure.cylinder1.downEdgePoints[i], figure.cylinder1.downEdgePoints[i+1], "red");
                this.drawLine(figure.cylinder2.downEdgePoints[i], figure.cylinder2.downEdgePoints[i+1], "blue");
                this.drawLine(figure.cylinder1.upEdgePoints[i], figure.cylinder1.downEdgePoints[i], "red");
                this.drawLine(figure.cylinder2.upEdgePoints[i], figure.cylinder2.downEdgePoints[i], "blue");
                this.drawLine(figure.cylinder1.upEdgePoints[i], figure.cylinder2.upEdgePoints[i], "blue");
                this.drawLine(figure.cylinder1.downEdgePoints[i], figure.cylinder2.downEdgePoints[i], "blue");


                    //this.fillRect(figure.cylinder1.upEdgePoints[i], figure.cylinder1.downEdgePoints[i],
                    //                figure.cylinder1.upEdgePoints[i+1], figure.cylinder1.downEdgePoints[i+1],
                    //                "red");
                    //this.fillRect(figure.cylinder2.upEdgePoints[i], figure.cylinder2.downEdgePoints[i],
                    //                figure.cylinder2.upEdgePoints[i+1], figure.cylinder2.downEdgePoints[i+1],
                    //                "blue");

                //this.fillRect(figure.cylinder1.upEdgePoints[i], figure.cylinder2.upEdgePoints[i],
                //    figure.cylinder1.upEdgePoints[i+1], figure.cylinder2.upEdgePoints[i+1],
                //    "green");
                //this.fillRect(figure.cylinder2.downEdgePoints[i], figure.cylinder1.downEdgePoints[i],
                //    figure.cylinder2.downEdgePoints[i+1], figure.cylinder1.downEdgePoints[i+1],
                //    "red");

            }
        }

        Drawer.prototype.fillRect = function (apex1, apex2, apex3, apex4, col) {
            var style = this.context.fillStyle;
            this.context.beginPath();
            this.context.fillStyle = col;
            this.context.moveTo(apex1.x + this.oY, -apex1.y + this.oX);
            this.context.lineTo(apex2.x + this.oY, -apex2.y + this.oX);
            this.context.lineTo(apex4.x + this.oY, -apex4.y + this.oX);
            this.context.lineTo(apex3.x + this.oY, -apex3.y + this.oX);
            this.context.lineTo(apex1.x + this.oY, -apex1.y + this.oX);
            this.context.stroke();
            this.context.fill();
            this.context.closePath();
            this.context.fillStyle = style;
        }

        Drawer.prototype.clear = function(){
            this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        }

        Drawer.prototype.drawAxes = function(){
            this.context.beginPath();
            this.context.moveTo(0, this.oX);
            this.context.lineTo(this.canvas.width, this.oX);
            this.context.moveTo(this.oY, 0);
            this.context.lineTo(this.oY, this.canvas.height);
            this.context.stroke();
            this.context.closePath();
            this.drawLine(0, this.oX, this.canvas.width, this.oX);
            this.drawLine(200, 0, 200, 400);
        }

        Drawer.prototype.drawFHP = function(figure){
            var profFigure = figure.clone();
            profFigure.rotate(0, 90, 0);

            var cyl1 = figure.cylinder1;
            var cyl2 = figure.cylinder2;
            var pcyl1 = profFigure.cylinder1;
            var pcyl2 = profFigure.cylinder2;
            for(var i = 0; i < cyl1.upEdgePoints.length - 1; i++){
                this.context.beginPath();
                //horizontal projection
                this.context.moveTo(cyl1.upEdgePoints[i].x + this.oY / 2, cyl1.upEdgePoints[i].z + this.oX / 2);
                this.context.lineTo(cyl1.upEdgePoints[i+1].x + this.oY / 2, cyl1.upEdgePoints[i+1].z + this.oX / 2);
                this.context.moveTo(cyl2.upEdgePoints[i].x + this.oY / 2, cyl2.upEdgePoints[i].z + this.oX / 2);
                this.context.lineTo(cyl2.upEdgePoints[i+1].x + this.oY / 2, cyl2.upEdgePoints[i+1].z + this.oX / 2);
                this.context.moveTo(cyl1.upEdgePoints[i].x + this.oY / 2, cyl1.upEdgePoints[i].z + this.oX / 2);
                this.context.lineTo(cyl2.upEdgePoints[i].x + this.oY / 2, cyl2.upEdgePoints[i].z + this.oX / 2);
                this.context.moveTo(cyl2.upEdgePoints[i].x + this.oY / 2, cyl2.upEdgePoints[i].z + this.oX / 2);
                this.context.lineTo(cyl2.downEdgePoints[i].x + this.oY / 2, cyl2.downEdgePoints[i].z + this.oX / 2);
                this.context.moveTo(cyl1.upEdgePoints[i].x + this.oY / 2, cyl1.upEdgePoints[i].z + this.oX / 2);
                this.context.lineTo(cyl1.downEdgePoints[i].x + this.oY / 2, cyl1.downEdgePoints[i].z + this.oX / 2);
                this.context.moveTo(cyl2.downEdgePoints[i].x + this.oY / 2, cyl2.downEdgePoints[i].z + this.oX / 2);
                this.context.lineTo(cyl2.downEdgePoints[i+1].x + this.oY / 2, cyl2.downEdgePoints[i+1].z + this.oX / 2);
                this.context.moveTo(cyl1.downEdgePoints[i].x + this.oY / 2, cyl1.downEdgePoints[i].z + this.oX / 2);
                this.context.lineTo(cyl1.downEdgePoints[i+1].x + this.oY / 2, cyl1.downEdgePoints[i+1].z + this.oX / 2);
                this.context.moveTo(cyl1.downEdgePoints[i].x + this.oY / 2, cyl1.downEdgePoints[i].z + this.oX / 2);
                this.context.lineTo(cyl2.downEdgePoints[i].x + this.oY / 2, cyl2.downEdgePoints[i].z + this.oX / 2);
                //profile projection
                this.context.moveTo(-pcyl1.upEdgePoints[i].x + 3 * this.oY / 2, -pcyl1.upEdgePoints[i].y + this.oX / 2);
                this.context.lineTo(-pcyl1.upEdgePoints[i + 1].x + 3 * this.oY / 2, -pcyl1.upEdgePoints[i + 1].y + this.oX / 2);
                this.context.moveTo(-pcyl1.upEdgePoints[i].x + 3 * this.oY / 2, -pcyl1.upEdgePoints[i].y + this.oX / 2);
                this.context.lineTo(-pcyl1.downEdgePoints[i].x + 3 * this.oY / 2, -pcyl1.downEdgePoints[i].y + this.oX / 2);
                this.context.moveTo(-pcyl1.downEdgePoints[i].x + 3 * this.oY / 2, -pcyl1.downEdgePoints[i].y + this.oX / 2);
                this.context.lineTo(-pcyl1.downEdgePoints[i + 1].x + 3 * this.oY / 2, -pcyl1.downEdgePoints[i + 1].y + this.oX / 2);
                this.context.moveTo(-pcyl2.upEdgePoints[i].x + 3 * this.oY / 2, -pcyl2.upEdgePoints[i].y + this.oX / 2);
                this.context.lineTo(-pcyl2.upEdgePoints[i + 1].x + 3 * this.oY / 2, -pcyl2.upEdgePoints[i + 1].y + this.oX / 2);
                this.context.moveTo(-pcyl2.upEdgePoints[i].x + 3 * this.oY / 2, -pcyl2.upEdgePoints[i].y + this.oX / 2);
                this.context.lineTo(-pcyl2.downEdgePoints[i].x + 3 * this.oY / 2, -pcyl2.downEdgePoints[i].y + this.oX / 2);
                this.context.moveTo(-pcyl2.downEdgePoints[i].x + 3 * this.oY / 2, -pcyl2.downEdgePoints[i].y + this.oX / 2);
                this.context.lineTo(-pcyl2.downEdgePoints[i + 1].x + 3 * this.oY / 2, -pcyl2.downEdgePoints[i + 1].y + this.oX / 2);

                this.context.stroke();
                this.context.closePath();
            }
        }

        return Drawer;
    })();
    Entity.Drawer = Drawer;
})(Entity);