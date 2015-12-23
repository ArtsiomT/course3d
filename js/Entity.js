var Entity = Object.create(null);
(function(Entity){
    var Matrix = (function () {
        function Matrix(){
            this.matrix = [];
            for(var i = 0; i < 4; i++){
                this.matrix[i] = [];
                for (var j = 0; j < 4; j++){
                    if (i == j){
                        this.matrix[i][j] = 1;
                    } else {
                        this.matrix[i][j] = 0;
                    }
                }
            }
        }

        Matrix.prototype.multiply = function(anotherMatrix){
            var result = new Matrix();
            for(var i = 0; i < 4; i++){
                for (var j = 0; j < 4; j++){
                    var t = 0;
                    for (var k = 0; k < 4; k++){
                        t += this.matrix[i][k] * anotherMatrix.matrix[k][j];
                    }
                    result.matrix[i][j] = t;
                }
            }

            for(var i = 0; i < 4; i++){
                for(var j = 0; j < 4; j++){
                    this.matrix[i][j] = result.matrix[i][j];
                }
            }
        }

        Matrix.prototype.rotate = function(ax, ay, az){
            if (ax != 0){
                var rotX = new Matrix();
                var angleX = ax * Math.PI / 180;
                rotX.matrix[1][1] = Math.cos(angleX);
                rotX.matrix[2][1] = -Math.sin(angleX);
                rotX.matrix[1][2] = Math.sin(angleX);
                rotX.matrix[2][2] = Math.cos(angleX);
                this.multiply(rotX);
            }
            if (ay != 0){
                var rotY = new Matrix();
                var angleY = ay * Math.PI / 180;
                rotY.matrix[0][0] = Math.cos(angleY);
                rotY.matrix[0][2] = -Math.sin(angleY);
                rotY.matrix[2][0] = Math.sin(angleY);
                rotY.matrix[2][2] = Math.cos(angleY);
                this.multiply(rotY);
            }
            if (az != 0){
                var rotZ = new Matrix();
                var angleZ = az * Math.PI / 180;
                rotZ.matrix[0][0] = Math.cos(angleZ);
                rotZ.matrix[1][0] = -Math.sin(angleZ);
                rotZ.matrix[0][1] = Math.sin(angleZ);
                rotZ.matrix[1][1] = Math.cos(angleZ);
                this.multiply(rotZ);
            }
        }
        return Matrix;
    })();

    var Apex = (function(){
        function Apex(x, y, z){
            this.x = x;
            this.y = y;
            this.z = z;
        }

        Apex.prototype.clone = function(){
            var apex = new Apex(this.x, this.y, this.z);
            return apex;
        }

        Apex.prototype.move = function (dx, dy, dz) {
            this.x += Number(dx);
            this.y += Number(dy);
            this.z += Number(dz);
        }

        Apex.prototype.scale = function (delta) {
            this.x *= Number(delta);
            this.y *= Number(delta);
            this.z *= Number(delta);
        }

        Apex.prototype.rotate = function(ax, ay, az){
            var rotateMatrix = new Entity.Matrix();
            rotateMatrix.rotate(Number(ax), Number(ay), Number(az));
            this.multiply(rotateMatrix);
        }

        Apex.prototype.multiply = function(matrix){
            temp = new Apex(this.x * matrix.matrix[0][0] + this.y * matrix.matrix[0][1] + this.z * matrix.matrix[0][2] + 1 * matrix.matrix[0][3],
                            this.x * matrix.matrix[1][0] + this.y * matrix.matrix[1][1] + this.z * matrix.matrix[1][2] + 1 * matrix.matrix[1][3],
                            this.x * matrix.matrix[2][0] + this.y * matrix.matrix[2][1] + this.z * matrix.matrix[2][2] + 1 * matrix.matrix[2][3]);
            this.x = temp.x;
            this.y = temp.y;
            this.z = temp.z;
        }
        return Apex;
    })();

    var Cylinder = (function(){
        function Cylinder(r, h, q){
            this.radius = r;
            this.height = h;
            this.quality = q;
            this.generator = new Model.Generator();
            this.generator.generateEdgePoints(r, h, q);
            this.upEdgePoints = this.generator.upEdgePoints;
            this.downEdgePoints = this.generator.downEdgePoints;
        }
        
        Cylinder.prototype.clone = function () {
            var cylinder = new Cylinder(this.radius, this.height, this.quality);
            cylinder.radius = this.radius;
            cylinder.height = this.height;
            cylinder.quality = this.quality;
            for (var i = 0; i < this.upEdgePoints.length; i++){
                cylinder.upEdgePoints[i] = this.upEdgePoints[i].clone();
                cylinder.downEdgePoints[i] = this.downEdgePoints[i].clone();
            }
            return cylinder;
        }

        Cylinder.prototype.move = function (dx, dy, dz) {
            for(var i = 0; i < this.downEdgePoints.length; i++){
                this.downEdgePoints[i].move(dx, dy, dz);
                this.upEdgePoints[i].move(dx, dy, dz);
            }
        }

        Cylinder.prototype.scale = function(delta){
            for(var i = 0; i < this.downEdgePoints.length; i++){
                this.downEdgePoints[i].scale(delta);
                this.upEdgePoints[i].scale(delta);
            }
        }

        Cylinder.prototype.rotate = function(ax, ay, az){
            for(var i = 0; i < this.downEdgePoints.length; i++){
                this.downEdgePoints[i].rotate(ax, ay, az);
                this.upEdgePoints[i].rotate(ax, ay, az);
            }
        }
        return Cylinder;
    })();

    var Figure = (function () {
        function Figure(r1, r2, h, q){
            this.x = 0;
            this.y = 0;
            this.ax = 0;
            this.ay = 0;
            this.az = 0;
            this.sc = 100;
            this.r1 = r1;
            this.r2 = r2;
            this.h = h;
            this.q = q;
            this.cylinder1 = new Cylinder(this.r1, this.h, this.q);
            this.cylinder2 = new Cylinder(this.r2, this.h, this.q);
            if(r1 > r2){
                this.cylinder2.move(r1 - r2, 0, 0);
            } else {
                this.cylinder1.move(r2 - r1, 0, 0);
            }
        }

        Figure.prototype.clone = function(){
            var fig = new Figure(this.r1, this.r2, this.h, this.q);
            fig.x = this.x;
            fig.y = this.y;
            fig.ax = this.ax;
            fig.ay = this.ay;
            fig.az = this.az;
            fig.sc = this.sc;
            fig.cylinder1 = this.cylinder1.clone();
            fig.cylinder2 = this.cylinder2.clone();
            return fig;
        }

        Figure.prototype.move = function(dx, dy, dz){
            this.cylinder1.move(dx, dy, dz);
            this.cylinder2.move(dx, dy, dz);
            this.x += dx;
            this.y += dy;
            document.getElementById('x').value = this.x;
            document.getElementById('y').value = this.y;
        }

        Figure.prototype.scale = function (delta) {
            this.cylinder1.scale(delta);
            this.cylinder2.scale(delta);
            this.sc *= delta;
            document.getElementById('cfx').value = this.sc;
        }

        Figure.prototype.rotate = function (ax, ay, az){
            this.cylinder1.rotate(ax, ay, az);
            this.cylinder2.rotate(ax, ay, az);
            this.ax += ax;
            this.ay += ay;
            this.az += az;
            if (this.ax >= 360 || this.ax <= -360){
                if (this.ax >= 360){
                    this.ax = Number(this.ax) - 360;
                } else {
                    this.ax = Number(this.ax) + 360;
                }
            }
            document.getElementById('angleX').value = this.ax;
            document.getElementById('angleY').value = this.ay;
            document.getElementById('angleZ').value = this.az;

        }

        return Figure;
    })();
    Entity.Apex = Apex;
    Entity.Cylinder = Cylinder;
    Entity.Matrix = Matrix;
    Entity.Figure = Figure;
})(Entity || (Entity = Object.create(null)));
