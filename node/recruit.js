/**
 * Created by jrootham on 04/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
// Recruiting functions

(function () {
    "use strict"

    var userFns = require("./userFns")

    var CookieHeader = function(depends, token) {
        var cookie = "token=" + token
        cookie += " Max-Age=" + (180 * 24 * 60 * 60)
        cookie += " HttpOnly"

        if (depends.isUsingHTTPS()) {
            cookie += " Secure"
        }

        var header ={}
        header["Set-Cookie"] = cookie

        return header
    }

    var signup = function(depends, request, response, data) {
        var dataAccess = depends.dataAccess
        var identifier = data.token

        var recruitId = dataAccess.testAndRemoveIdentifier(identifier)

        if (recruitId > 0)
        {
            var token = userFns.makeAndStoreCookie(depends, recruitId)
            var cookieHeader = CookieHeader(depends, token)
            depends.headers(response, cookieHeader)

            depends.success(response, {})
        }
        else {
            depends.headers(response)
            depends.fail(response, {error:"Identifier not found"})
        }
    }

    exports.signup = signup
})()