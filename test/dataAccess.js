/**
 * Created by jrootham on 30/07/14.
 */

(function(){
    "use strict"

    var fs = require("fs")
    var ent = require("ent")

    var filenames = {
        recruitList: "../data/recruits.json",
        keys: "../data/keys.json"
    }

    var recruitList = JSON.parse(fs.readFileSync(filenames.recruitList))
    var identifierList = JSON.parse(fs.readFileSync(filenames.keys))

    var write = function() {
        fs.writeFileSync(filenames.recruitList, JSON.stringify(recruitList))
        fs.writeFileSync(filenames.keys, JSON.stringify(identifierList))
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
        var found = identifierList.find(function(current) {current.identifier === identifier  && current.valid})

        if (found) {
            found.valid = false
            return found.recruitID
        }
        else {
            return 0
        }
    }

    var findHashedToken = function(hashedToken) {
        var recruit = recruitList.find(function(recruit){
           recruit.hashedToken ? hashedToken === recruit.hashedToken : false
        })

        return recruit ? recruit.id : 0
    }

    var saveHashedToken = function(recruitId, hashedToken) {
        var index = recruitList.findIndex(function(recruit){return recruit.id === recruitId})
        recruitList[index].hashedToken = hashedToken
    }

    var buildRow = function(columnArray, data) {
        var result = {}
        columnArray.forEach(function(column) {
            if (data[column]) {
                result[column] = ent.encode(data[column])
            }
        })

        return result
    }

    exports.createRecruit = createRecruit
    exports.testAndRemoveIdentifier = testAndRemoveIdentifier
    exports.saveHashedToken = saveHashedToken
    exports.insertIdentifier = insertIdentifier
    exports.createRecruit = createRecruit
    exports.buildRow = buildRow


})()