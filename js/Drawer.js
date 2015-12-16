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

        Drawer.prototype.drawLine = function (apex1, apex2){
            this.context.beginPath();
            this.context.moveTo(apex1.x + this.oY, -apex1.y + this.oX);
            this.context.lineTo(apex2.x + this.oY, -apex2.y + this.oX);
            this.context.stroke();
            this.context.closePath();
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
                this.drawLine(figure.cylinder1.upEdgePoints[i], figure.cylinder1.upEdgePoints[i+1]);
                this.drawLine(figure.cylinder2.upEdgePoints[i], figure.cylinder2.upEdgePoints[i+1]);
                this.drawLine(figure.cylinder1.downEdgePoints[i], figure.cylinder1.downEdgePoints[i+1]);
                this.drawLine(figure.cylinder2.downEdgePoints[i], figure.cylinder2.downEdgePoints[i+1]);
                this.drawLine(figure.cylinder1.upEdgePoints[i], figure.cylinder1.downEdgePoints[i]);
                this.drawLine(figure.cylinder2.upEdgePoints[i], figure.cylinder2.downEdgePoints[i]);
                this.drawLine(figure.cylinder1.upEdgePoints[i], figure.cylinder2.upEdgePoints[i]);
                this.drawLine(figure.cylinder1.downEdgePoints[i], figure.cylinder2.downEdgePoints[i]);


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

        return Drawer;
    })();
    Entity.Drawer = Drawer;
})(Entity);