/**
 * Created by jrootham on 30/07/14.
 */

(function() {
    "use strict"

    var crypto = require("crypto")

    var makeToken = function(size) {
        var buffSize = size * 2
        var buffer = crypto.randomBytes(buffSize)
        var prefix = ""
        var result = ""
        for (var i = 0 ; i < buffSize ; i += 2) {
            result += prefix + buffer.readUInt16LE(i).toString(10)
            prefix = "."
        }
        return result
    }


    var makeAndStoreCookie = function(depends, recruitId)
    {
        var plainToken = makeToken(4)
        var hashedToken =  crypto.createHash('sha256').update(plainToken).digest("hex")
        depends.dataAccess.saveHashedToken(recruitId, hashedToken)
        return plainToken
    }

    exports.makeToken = makeToken
    exports.makeAndStoreCookie = makeAndStoreCookie
/*
    var entry = {
        id: log.length + 1,
        type: "new user",
        timestamp: new Date(),
        user: newUser.id,
        parent: user.id
    }
*/

})()