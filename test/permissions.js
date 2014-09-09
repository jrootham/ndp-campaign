/**
 * Created by jrootham on 08/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var enter = function(depends, userId) {
        return true
    }

    var signup = function(depends, userId) {
        return true
    }

    var searchRecruits = function(depends, userId) {
        return true
    }

    var assign = function(depends, userId) {
        return false
    }

    exports.enter = enter
    exports.signup = signup
    exports.searchRecruits = searchRecruits
    exports.assign = assign
})()