/**
 * Created by jrootham on 06/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var message = require("../../js/message")
    var assignJSX = require("../../adminDest/assignJSX")

    var depends = {
        message: message
    }

    assignJSX.main(depends)
})()