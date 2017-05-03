/*
 *  find.js
 *
 *	Implement find for Arrays
 *
 * Copyright © 2014 Jim Rootham
 */

(function(){
    "use strict";

    exports.setFind = function(){
        if (typeof Array.prototype.findIndex != "function") {
            Array.prototype.findIndex = function (testFn) {
                var result = -1;

                for (var i = 0; i < this.length; i++) {
                    if (testFn(this[i], i, this)) {
                        result = i;
                        break
                    }
                }

                return result
            };

            Array.prototype.find = function(testFn) {
                var index = this.findIndex(testFn);
                return (index != -1) ? this[index] : undefined
            }
        }
    };

})();


