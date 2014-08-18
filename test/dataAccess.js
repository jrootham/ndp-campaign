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

    var recruitArray = JSON.parse(fs.readFileSync(filenames.recruitList))
    var identifierArray = JSON.parse(fs.readFileSync(filenames.keys))

    var write = function() {
        fs.writeFileSync(filenames.recruitList, JSON.stringify(recruitArray))
        fs.writeFileSync(filenames.keys, JSON.stringify(identifierArray))
    }

    var createRecruit = function(ownerId, newRecruit) {
        newRecruit.id = recruitArray.length + 1
        newRecruit.owner = ownerId

        recruitArray.push(newRecruit)

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
        var found = identifierArray.find(function(current) {current.identifier === identifier  && current.valid})

        if (found) {
            found.valid = false
            return found.recruitID
        }
        else {
            return 0
        }
    }

    var findHashedToken = function(hashedToken) {
        var recruit = recruitArray.find(function(recruit){
           recruit.hashedToken ? hashedToken === recruit.hashedToken : false
        })

        return recruit ? recruit.id : 0
    }

    var saveHashedToken = function(recruitId, hashedToken) {
        var index = recruitArray.findIndex(function(recruit){return recruit.id === recruitId})
        recruitArray[index].hashedToken = hashedToken
    }

    var buildRow = function(columnArray, data) {
        var result = {}
        columnArray.forEach(function(column) {
            if (data[column.name]) {
                result[column.name] = ent.encode(data[column.name])
            }
        })

        return result
    }

    var searchRecruits = function(searchValues) {
        var result = []

        recruitArray.forEach(function(recruit) {
            if(true) {
                result.push(recruit)
            }
        })
        return result
    }

    exports.searchRecruits = searchRecruits
    exports.createRecruit = createRecruit
    exports.testAndRemoveIdentifier = testAndRemoveIdentifier
    exports.saveHashedToken = saveHashedToken
    exports.insertIdentifier = insertIdentifier
    exports.createRecruit = createRecruit
    exports.buildRow = buildRow


})()