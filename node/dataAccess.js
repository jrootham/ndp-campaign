/**
 * dataAccess
 *
 * Created by jrootham on 05/09/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var ent = require("ent")

    var createPostalcode = function(depends, postalCode) {

    }

    var editPostalcode = function(depends, id, postalCode) {

    }

    var getPostalcode = function(depends, id) {

    }

    var createStreet = function(depends, streetName) {

    }

    var linkPostalCodeStreet = function(depends, streetId, postalcodeId) {

    }

    var createAddress = function(depends, address, apartment, homephone, streetId) {

    }

    var editAddress = function(depends, id, address, apartment, homephone, streetId) {

    }

    var getAddress = function(depends, id) {

    }

    var createPerson = function(depends, firstName, lastName, addressId) {

    }

    var editPerson = function(depends, id, firstName, lastName, addressId) {

    }

    var createRecruit = function(depends, ownerId, newRecruit) {
    }

    var insertIdentifier = function(depends, ownerId, recruitId, identifier) {
        var key = {
            timestamp: new Date(),
            ownerId: ownerId,
            recruitId: recruitId,
            identifier: identifier
        }

    }

    var testAndRemoveIdentifier = function(depends, identifier){
    }

    var findHashedToken = function(depends, hashedToken) {
        return recruit ? recruit.id : 0
    }

    var saveHashedToken = function(depends, ownerId, recruitId, hashedToken) {
        var result = false
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