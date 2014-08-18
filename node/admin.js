/**
 * Created by jrootham on 07/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var recruitFns = require("../common/recruitFns")

    var enter = function(depends, request, response, data, query) {
        var owner = depends.credential(depends, request, response)

        if (owner > 0) {
            if (depends.permissions.enter(depends, owner)) {
                var recruit = depends.dataAccess.buildRow(recruitFns.fieldArray, data)

                if (recruit.lastName) {
                    var userId = recruitFns.save(depends, owner, recruit)

                    if (userId > 0) {
                        depends.success(response, {}, {})
                    }
                    else {
                        depends.fail(response, {error:"User save failed"}, {})
                    }
                }
                else {
                    depends.fail(response, {error:"Last name required"}, {})
                }
            }
            else {
                depends.fail(response, {error:"User not permitted to enter recruits"}, {})
            }
        }
        else {
            depends.fail(response, {error:"Device not signed up"}, {})
        }
    }

    var searchRecruits = function(depends, request, response, data, query) {
        var owner = depends.credential(depends, request, response)

        if (owner > 0) {
            if (depends.permissions.searchRecruits(depends, owner)) {
                var searchValues = common.makeDataObject(recruitFields, query)
                var result = depends.dataAccess.searchRecruits(searchValues)
            }
            else {
                depends.fail(response, {error:"User not permitted to search for recruits"}, {})
            }
        }
        else {
            depends.fail(response, {error:"Device not signed up"}, {})
        }
    }

    var signup = function(depends, request, response, data, query) {
        var owner = depends.credential(depends, request, response)

        if (owner > 0) {
            if (depends.permissions.signup(depends, owner)) {

            }
            else {
                depends.fail(response, {error:"User not permitted to signup recruits"}, {})
            }
        }
        else {
            depends.fail(response, {error:"Device not signed up"}, {})
        }
    }

    exports.enter = enter
    exports.signup = signup
    exports.searchRecruitss = searchRecruits
})()