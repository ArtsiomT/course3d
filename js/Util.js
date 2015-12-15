/**
 * Created by artsiom.tserakhovich on 15.12.2015.
 */
var Util = Object.create(null);

(function(Util){
    var findActiveRadioButton = (function () {
        function findActiveRadioButton(buttons){
            for (var i = 0; i < buttons.length; i++){
                if(buttons[i].checked){
                    return buttons[i];
                } else {
                    return null;
                }
            }
        }
        return findActiveRadioButton;
    })();
    Util.findActiveRadioButton = findActiveRadioButton;
})(Util || (Util = Object.create(null)));