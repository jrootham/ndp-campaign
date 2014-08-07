/**
 * Created by jrootham on 30/07/14.
 */

(function(){
    "use strict"

    var fs = require("fs")

    var filenames = {
        users: "../data/recruits.json",
        keys: "../data/keys.json"
    }

    var recruitList = JSON.parse(fs.readFileSync(filenames.users))
    var keyList = JSON.parse(fs.readFileSync(filenames.keys))

    var write =- function() {
        fs.writeFileSync(filenames.users, JSON.stringify(recruitList))
        fs.writeFileSync(filenames.keys, JSON.stringify(keyList))
    }

    var createRecruit = function(ownerId, newRecruit) {
        newRecruit.id = recruitList.length + 1
        newRecruit.owner = ownerId

        recruitList.push(newRecruit)

        write()

        return newRecruit.id
    }

    var insertIdentifier = function(ownerId, recruitId, identifier) {
        var key = {
            timestamp: new Date(),
            ownerId: ownerId,
            recruitId: recruitId,
            identifier: identifier,
            valid: true
        }
    }

    var testAndRemoveIdentifier = function(identifier){
        var key = keyList.find(function() {key.identifier === identifier  && key.valid})

        if (key) {
            key.valid = false
            return key.recruitID
        }
        else {
            return 0
        }
    }

    var saveHashedToken = function(recruitId, hashedToken) {
        var index = recruitList.findIndex(function(recruit){return recruit.id === recruitId})
        recruitList[index].hashedToken = hashedToken
    }

    exports.createRecruit = createRecruit
    exports.testAndRemoveIdentifier = testAndRemoveIdentifier
    exports.saveHashedToken = saveHashedToken
    exports.insertIdentifier = insertIdentifier
    exports.createRecruit = createRecruit


})()