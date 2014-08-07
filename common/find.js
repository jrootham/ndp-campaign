/*
 *	Implement find for Arrays
 */

(function(){
    "use strict"

    var setFind = function(){
        if (typeof Array.prototype.find != "function") {
            Array.prototype.find = function (testFn) {
                var result = undefined

                for (var i = 0; i < this.length; i++) {
                    if (testFn(this[i])) {
                        result = this[i]
                        break
                    }
                }

                return result
            }
        }
    }

    exports.setFind = setFind
})()


