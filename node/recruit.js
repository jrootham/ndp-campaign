/**
 * Created by jrootham on 04/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
// Recruiting functions

(function () {
    "use strict"

    var userFns = require("../common/recruitFns")

    var signup = function(depends, request, response, data) {
        var dataAccess = depends.dataAccess
        var identifier = data.identifier

        var recruitId = dataAccess.testAndRemoveIdentifier(identifier)

        if (recruitId > 0)
        {
            var token = recruitFns.makeAndStoreCookie(depends, recruitId)
            var cookies = new depends.Cookies(request, response)
            cookies.set("token", token, {"Max-Age":  (180 * 24 * 60 * 60)})

            depends.success(response, {}, {})
        }
        else {
            depends.fail(response, {error:"Identifier not found"}, {})
        }
    }

    exports.signup = signup
})()