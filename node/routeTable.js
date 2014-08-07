/**
 * Created by jrootham on 04/08/14.
 *
 * Copyright ©  2014 Jim Rootham
 */

(function () {
    "use strict"

    var recruit = require("./recruit.js")

    var routeTable = {
        campaign: {
            signup: {
                POST: recruit.signup
            }
        }
    }

    exports.routeTable = routeTable
})()