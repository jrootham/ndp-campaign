/**
 * Created by jrootham on 10/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var makeDataObject = function(fieldArray) {
        var valid = fieldArray.reduce(function(previous, field, index, array){
            return previous && field.validation(field.getValue())
        }. true)

        var result = {}
        if (valid) {
            fieldArray.forEach(function(field){result[field.name] = field.getValue()})
        }
        else {
            result = false
        }

        return result
    }

    exports.makeDataObject = makeDataObject
})()