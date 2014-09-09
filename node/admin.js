/**
 * Created by jrootham on 07/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var recruitFns = require("../common/recruitFns")

    var copyDataObject = function(fieldArray, source) {
        var result = {}
        fieldArray.forEach(function(field) {
            if (source[field.name]) {
                result[field.name] = source[field.name]
            }
        })

        return result
    }

    var getOwner = function(depends, request, response) {
        var owner = depends.credential(depends, request, response)

        if (owner <= 0) {
            depends.fail(request, response, {error:"Device not signed up"}, {})
        }

        return owner
    }

    var enter = function(depends, request, response, pathArgs, query, data) {
        var owner = getOwner(depends, request, response)

        if (owner > 0) {
            if (depends.permissions.enter(depends, owner)) {
                var recruit = depends.dataAccess.buildRow(depends, recruitFns.fieldArray, data)

                if (recruit.lastName) {
                    var userId = recruitFns.save(depends, owner, recruit)

                    if (userId > 0) {
                        depends.success(request, response, {}, {})
                    }
                    else {
                        depends.fail(request, response, {error:"User save failed"}, {})
                    }
                }
                else {
                    depends.fail(request, response, {error:"Last name required"}, {})
                }
            }
            else {
                depends.fail(request, response, {error:"User not permitted to enter recruits"}, {})
            }
        }
    }

    var searchRecruits = function(depends, request, response, pathArgs, query, data) {
        var owner = getOwner(depends, request, response)

        if (owner > 0) {
            if (depends.permissions.searchRecruits(depends, owner)) {
                var searchValues = copyDataObject(recruitFns.fieldArray, query)
                var result = depends.dataAccess.searchRecruits(depends, searchValues)
                depends.success(request, response, result, {})
            }
            else {
                depends.fail(request, response, {error:"User not permitted to search for recruits"}, {})
            }
        }
    }

    var signupRecruit = function(depends, request, response, pathArgs, query, data) {
        var owner = getOwner(depends, request, response)

        if (owner > 0) {
            if (depends.permissions.signup(depends, owner)) {
                var recruitId = parseInt(pathArgs.recruitId, 10)
                var identifier = recruitFns.makeAndStoreIdentifier(depends, owner, recruitId)
                depends.success(request, response, {identifier:identifier}, {})
            }
            else {
                depends.fail(request, response, {error:"User not permitted to signup recruits"}, {})
            }
        }
        else {
            depends.fail(request, response, {error:"Device not signed up"}, {})
        }
    }

    var locationPermission = function(depends, request, response, pathArgs, query, data) {
        var owner = getOwner(depends, request, response)

        if (owner > 0) {
            if (depends.permissions.assign(depends, owner)) {

            }
            else {
                depends.fail(request, response, {error:"User not permitted to assign recruits"}, {})
            }
        }
    }

    var questionPermission = function(depends, request, response, pathArgs, query, data) {
        var owner = getOwner(depends, request, response)

        if (owner > 0) {

        }
    }

    var permissionOptions = function(depends, request, response, pathArgs, query, data) {
        var owner = getOwner(depends, request, response)

        if (owner > 0) {
            var optionArray = depends.dataAccess.getOptionArray(depends, owner)
        }
    }

    exports.enter = enter
    exports.signupRecruit = signupRecruit
    exports.searchRecruits = searchRecruits
    exports.locationPermission = locationPermission
    exports.questionPermission = questionPermission
    exports.permissionOptions = permissionOptions
})()