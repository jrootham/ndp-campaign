/**
 * Created by jrootham on 30/07/14.
 */

(function(){
    "use strict"

    require("../common/find").setFind()             // Modify Array prototype
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

    var createRecruit = function(depends, ownerId, newRecruit) {
        newRecruit.id = recruitArray.length + 1
        newRecruit.owner = ownerId

        recruitArray.push(newRecruit)

        write()

        return newRecruit.id
    }

    var insertIdentifier = function(depends, ownerId, recruitId, identifier) {
        var key = {
            timestamp: new Date(),
            ownerId: ownerId,
            recruitId: recruitId,
            identifier: identifier
        }

        identifierArray.push(key)
        write()
    }

    var testAndRemoveIdentifier = function(depends, identifier){
        var index = identifierArray.findIndex(function(current) {
            return current.identifier === identifier
        })

        if (index != -1) {
            var found = identifierArray[index]
            identifierArray.splice(index, 1)
            write()
            return found
        }
        else {
            return false
        }
    }

    var findHashedToken = function(depends, hashedToken) {
        var recruit = recruitArray.find(function(recruit){
           return recruit.hashedToken ? hashedToken === recruit.hashedToken : false
        })

        return recruit ? recruit.id : 0
    }

    var saveHashedToken = function(depends, ownerId, recruitId, hashedToken) {
        var result = false
        var found = recruitArray.find(function(recruit){return recruit.id === recruitId})

        if (found) {
            found.hashedToken = hashedToken
            write()
            result = true
        }

        return result
    }

    var buildRow = function(depends, columnArray, data) {
        var result = {}
        columnArray.forEach(function(column) {
            if (data[column.name]) {
                result[column.name] = ent.encode(data[column.name])
            }
        })

        return result
    }

    var searchRecruits = function(depends, searchValues) {
        var result = []

        recruitArray.forEach(function(recruit) {
            var matched = Object.keys(searchValues).reduce(function(previous, key, index, keys) {
                return previous && searchValues[key] === recruit[key]
            }, true)

            if(matched) {
                result.push(recruit)
            }
        })
        return result
    }

    var getRecruit = function(depends, id) {
        var result = searchRecruits({id:id})
        return (result.length === 1) ? result[0] : false
    }

    exports.searchRecruits = searchRecruits
    exports.createRecruit = createRecruit
    exports.testAndRemoveIdentifier = testAndRemoveIdentifier
    exports.saveHashedToken = saveHashedToken
    exports.findHashedToken = findHashedToken
    exports.insertIdentifier = insertIdentifier
    exports.createRecruit = createRecruit
    exports.buildRow = buildRow


})()