/**
 * Created by jrootham on 04/08/14.
 *
 * Copyright ©  2014 Jim Rootham
 */

(function () {
    "use strict"

    var recruit = require("./recruit")
    var admin = require("./admin")

    var routeTable = {
        campaign: {
            signup: {
                POST: recruit.signup
            },
            admin: {
                enter: {
                    POST: admin.enter
                },
                signup: {
                    POST: admin.signup
                }

            }
        }
    }

    exports.routeTable = routeTable
})()