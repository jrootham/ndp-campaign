/**
 * Created by jrootham on 06/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var credentialOne = function (depends, request, response)
    {
        var cookies = new depends.Cookies(request, response)
        var token = cookies.get("token")

        console.log(token)
        return 1
    }

    exports.credential = credentialOne
})()