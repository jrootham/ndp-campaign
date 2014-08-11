/**
 * Created by jrootham on 08/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var credentialZero = function (depends, request, response)
    {
        console.log(request.headers)
        return 0
    }

    exports.credential = credentialZero
})()