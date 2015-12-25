/**
 * Created by artsiom.tserakhovich on 12.12.2015.
 */
var Model = Object.create(null);

(function (Model){
    var Generator = (function(){
        function Generator(){
            this.upEdgePoints = [];
            this.downEdgePoints = [];
        }
        Generator.prototype.generateEdgePoints = function (r, h, q) {
            var height = h;
            var quality = q;
            var radius = r;

            var x0 = r;
            var y0 = 0;
            var angleStep = 360 / quality;
            for (var i = 0; i <= quality; i++){
                var currAngle = i * angleStep * Math.PI / 180;
                var newX = x0 + Math.cos(currAngle) * radius - radius;
                var newY = y0 - height / 2;
                var newZ = y0 + Math.sin(currAngle) * radius;
                this.upEdgePoints.push(new Entity.Apex(newX, newY + height, newZ));
                this.downEdgePoints.push(new Entity.Apex(newX, newY, newZ));
            }
        }
        return Generator;
    })();
    Model.Generator = Generator;
})(Model || (Model = Object.create(null)));