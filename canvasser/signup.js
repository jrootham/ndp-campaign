/**
 * Created by jrootham on 29/07/14.
 */
(function(){
    "use strict"

    var message = require("../js/message")
    var signup = require("../canvasserDest/signupJSX.js")

    var depends = {
        message: message
    }

    signup.main(depends)
})()