/**
 * Created by jrootham on 06/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var message = require("../js/message")
    var enterJSX = require("../adminDest/assignJSX")

    var depends = {
        message: message
    }

    enterJSX.main(depends)
})()