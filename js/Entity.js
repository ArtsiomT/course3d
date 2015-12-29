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

        Matrix.mult = function (A, B){
            var arr = [];
            for (var i = 0; i < A.length; i++){
                arr[i] = [];
                for (var j = 0; j < B[0].length; j++){
                    var tmp = 0;
                    for (var k = 0; k < B.length; k++){
                        tmp += A[i][k] * B[k][j];
                    }
                    arr[i][j] = tmp;
                }
            }
            return arr;
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

        Matrix.prototype.axon = function(fi, psi){
            var angleFi = Number(fi) * Math.PI / 180;
            var anglePsi = Number(psi) * Math.PI / 180;
            var axonometric = new Matrix();
            axonometric.matrix[0][0] = Math.cos(anglePsi); axonometric.matrix[1][0] = Math.sin(angleFi) * Math.sin(anglePsi); axonometric.matrix[2][0] = 0; axonometric.matrix[3][0] = 0;
            axonometric.matrix[0][1] = 0; axonometric.matrix[1][1] = Math.cos(angleFi);axonometric.matrix[2][1] = 0; axonometric.matrix[3][1] = 0;
            axonometric.matrix[0][2] = Math.sin(angleFi); axonometric.matrix[1][2] = Math.sin(angleFi) * Math.cos(anglePsi) * -1; axonometric.matrix[2][2] = 0; axonometric.matrix[3][2] = 0;
            axonometric.matrix[0][3] = 0; axonometric.matrix[1][3] = 0; axonometric.matrix[2][3] = 0; axonometric.matrix[3][3] = 1;
            //return axonometric;
            this.multiply(axonometric);
        }

        Matrix.prototype.oblique = function(alpha, L){
            var a = Number(alpha) * Math.PI / 180;
            var L = Number(L);
            var obl = new Matrix();
            obl.matrix[0][0] = 1; obl.matrix[1][0] = 0; obl.matrix[2][0] = 0; obl.matrix[3][0] = 0;
            obl.matrix[0][1] = 0; obl.matrix[1][1] = 1; obl.matrix[2][1] = 0; obl.matrix[3][1] = 0;
            obl.matrix[0][2] = L * Math.cos(a); obl.matrix[1][2] = L * Math.sin(a); obl.matrix[2][2] = 1; obl.matrix[3][2] = 0;
            obl.matrix[0][3] = 0; obl.matrix[1][3] = 0; obl.matrix[2][3] = 0; obl.matrix[3][3] = 1;
            this.multiply(obl);
        }

        Matrix.prototype.perspective = function(fi, theta, ro, d){
            var phi = Number(fi) * Math.PI / 180;
            var theta = Number(theta) * Math.PI / 180;
            var ro = Number(ro);
            var d = Number(d);
            var perspect = new Matrix();
            perspect.matrix[0][0] = Math.cos(theta); perspect.matrix[0][1] = -Math.cos(phi) * Math.sin(theta); perspect.matrix[0][2] = -Math.sin(phi) * Math.sin(theta) ; perspect.matrix[0][3] = 0;
            perspect.matrix[1][0] = Math.sin(theta); perspect.matrix[1][1] = Math.cos(phi) * Math.cos(theta); perspect.matrix[1][2] = Math.sin(phi) * Math.cos(theta); perspect.matrix[1][3] = 0;
            perspect.matrix[2][0] = 0; perspect.matrix[2][1] = Math.sin(phi); perspect.matrix[2][2] = -Math.cos(phi); perspect.matrix[2][3] = 0;
            perspect.matrix[3][0] = 0; perspect.matrix[3][1] = 0; perspect.matrix[3][2] = ro+0.001; perspect.matrix[3][3] = 1;
            this.multiply(perspect);
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

        Apex.prototype.scale = function (deltaX, deltaY, deltaZ) {
            this.x *= Number(deltaX);
            this.y *= Number(deltaY);
            this.z *= Number(deltaZ);
        }

        Apex.prototype.rotate = function(ax, ay, az){
            var rotateMatrix = new Entity.Matrix();
            rotateMatrix.rotate(Number(ax), Number(ay), Number(az));
            this.multiply(rotateMatrix);
        }

        Apex.prototype.axonometric = function(fi, psi){
            var axonMatrix = new Entity.Matrix();
            axonMatrix.axon(Number(fi), Number(psi));
            //axonMatrix = axonMatrix.axon(Number(fi), Number(psi));
            this.multiply(axonMatrix);
        }

        Apex.prototype.oblique = function(alpha, l){
            var obliqueMatrix = new Entity.Matrix();
            obliqueMatrix.oblique(alpha, l);
            this.multiply(obliqueMatrix);
        }

        Apex.prototype.perspective = function(fi, theta, ro, d){
            var perspectiveMatrix = new Entity.Matrix();
            perspectiveMatrix.perspective(fi, theta, ro);
            var tempArr = [];
            tempArr[0] = [];
            tempArr[0][0] = this.x;
            tempArr[0][1] = this.y;
            tempArr[0][2] = this.z;
            tempArr[0][3] = 1;
            var outM = Entity.Matrix.mult(tempArr, perspectiveMatrix.matrix);
            if (outM[0][2] == 0) {
                outM[0][2] == 1;
            }
            this.x = outM[0][0] * d / outM [0][2];
            this.y = outM[0][1] * d / outM [0][2];
            this.z = outM [0][2];
        }

        Apex.prototype.multiply = function(matrix){
            var temp = new Apex(this.x * matrix.matrix[0][0] + this.y * matrix.matrix[0][1] + this.z * matrix.matrix[0][2] + 1 * matrix.matrix[0][3],
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

        Cylinder.prototype.scale = function(deltaX, deltaY, deltaZ){
            for(var i = 0; i < this.downEdgePoints.length; i++){
                this.downEdgePoints[i].scale(deltaX, deltaY, deltaZ);
                this.upEdgePoints[i].scale(deltaX, deltaY, deltaZ);
            }
        }

        Cylinder.prototype.rotate = function(ax, ay, az){
            for(var i = 0; i < this.downEdgePoints.length; i++){
                this.downEdgePoints[i].rotate(ax, ay, az);
                this.upEdgePoints[i].rotate(ax, ay, az);
            }
        }

        Cylinder.prototype.axonometric = function(fi, psi){
            for(var i = 0; i < this.downEdgePoints.length; i++){
                this.downEdgePoints[i].axonometric(fi, psi);
                this.upEdgePoints[i].axonometric(fi, psi);
            }
        }

        Cylinder.prototype.oblique = function(alpha, l){
            for(var i = 0; i < this.downEdgePoints.length; i++){
                this.downEdgePoints[i].oblique(alpha, l);
                this.upEdgePoints[i].oblique(alpha, l);
            }
        }
        Cylinder.prototype.perspective = function(fi, theta, ro, d){
            for(var i = 0; i < this.downEdgePoints.length; i++){
                this.downEdgePoints[i].perspective(fi, theta, ro, d);
                this.upEdgePoints[i].perspective(fi, theta, ro, d);
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
            this.scX = 100;
            this.scY = 100;
            this.scZ = 100;
            this.r1 = r1;
            this.r2 = r2;
            this.h = h;
            this.q = q;
            this.cylinder1 = new Cylinder(this.r1, this.h, this.q);
            this.cylinder2 = new Cylinder(this.r2, this.h, this.q);
        }

        Figure.prototype.clone = function(){
            var fig = new Figure(this.r1, this.r2, this.h, this.q);
            fig.x = this.x;
            fig.y = this.y;
            fig.ax = this.ax;
            fig.ay = this.ay;
            fig.az = this.az;
            fig.scX = this.scX;
            fig.scY = this.scY;
            fig.scZ = this.scZ;
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

        Figure.prototype.scale = function (deltaX, deltaY, deltaZ) {
            this.cylinder1.scale(deltaX, deltaY, deltaZ);
            this.cylinder2.scale(deltaX, deltaY, deltaZ);
            this.scX *= deltaX;
            this.scY *= deltaY;
            this.scZ *= deltaZ;
            document.getElementById('cfx').value = this.scX;
            document.getElementById('cfy').value = this.scY;
            document.getElementById('cfz').value = this.scZ;
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

        Figure.prototype.axonometric = function(fi, psi){
            this.cylinder1.axonometric(fi, psi);
            this.cylinder2.axonometric(fi, psi);
        }

        Figure.prototype.oblique = function(alpha, l){
            this.cylinder1.oblique(alpha, l);
            this.cylinder2.oblique(alpha, l);
        }

        Figure.prototype.perspective = function(fi, theta, ro, d){
            this.cylinder1.perspective(fi,theta,ro, d);
            this.cylinder2.perspective(fi,theta,ro, d);
        }

        return Figure;
    })();
    Entity.Apex = Apex;
    Entity.Cylinder = Cylinder;
    Entity.Matrix = Matrix;
    Entity.Figure = Figure;
})(Entity || (Entity = Object.create(null)));
