/**
 * edit
 *
 * Created by jrootham on 08/09/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var message = require("../../js/message")
    var editJSX = require("../../adminDest/address/editJSX")

    var depends = {
        message: message
    }

    editJSX.main(depends)
})()