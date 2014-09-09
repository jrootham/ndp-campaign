/**
 * new
 *
 * Created by jrootham on 08/09/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var message = require("../../js/message")
    var newJSX = require("../../adminDest/address/newJSX")

    var depends = {
        message: message
    }

    newJSX.main(depends)

})()