/**
 * Created by jrootham on 29/07/14.
 */

(function() {
    "use strict"

    var message = require("../js/message")
    var assignJSX = require("../adminDest/recruitJSX")

    var depends = {
        message: message
    }

    recruitJSX.main(depends)
})()