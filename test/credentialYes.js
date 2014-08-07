/**
 * Created by jrootham on 06/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var credentialYes = function (request)
    {
        console.log(request.headers)
        return true
    }

    exports = credentialYes
})()