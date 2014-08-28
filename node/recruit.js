/**
 * Created by jrootham on 04/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
// Recruiting functions

(function () {
    "use strict"

    var recruitFns = require("../common/recruitFns")

    var signup = function(depends, request, response, pathArgs, query, data) {
        var dataAccess = depends.dataAccess
        var identifier = data.identifier

        var recruit = dataAccess.testAndRemoveIdentifier(identifier)

        if (recruit)
        {
            var token = recruitFns.makeAndStoreCookie(depends, recruit.owner, recruit.recruitId)
            if (token) {
                var cookies = new depends.Cookies(request, response)

                var options = {
                    "domain": depends.domain,
                    "maxAge":  (180 * 24 * 60 * 60 * 1000),
                    "httpOnly":false
                }
                cookies.set("token", token, options)

                depends.success(request, response, {}, {})
            }
            else {
                depends.fail(request, response, {error:"Internal error, recruit not found"}, {})
            }
        }
        else {
            depends.fail(request, response, {error:"Identifier not found"}, {})
        }
    }

    exports.signup = signup
})()