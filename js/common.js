/**
 * Created by jrootham on 10/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    /*
     *      Field names must be the same as the object key and the id of the htmal input item
     */

    var emptyInputs = function(fieldArray){
        fieldArray.forEach(function(field){document.getElementById(field.name).value = ""})
    }

    var getValue = function(name) {
        return document.getElementById(name).value
    }

    var makeDataObject = function(fieldArray) {
        var valid = fieldArray.reduce(
            function(previous, field, index, array){
                return previous && field.validation(getValue(field.name))},
            true)

        var result = {}
        if (valid) {
            fieldArray.forEach(function(field){
                var value = getValue(field.name)
                if (value) {
                    result[field.name] = value
                }
            })
        }
        else {
            result = false
        }

        return result
    }

    var fillDataObject = function(fieldArray, source) {
        var result = {}
        fieldArray.forEach(function(field) {
            if (source[field.name]) {
                result[field.name] = source[field.name]
            }
            else {
                result[field.name] = ""
            }
        })

        return result
    }


    var makeErrorStatus = function(that) {
        return function(error) {
            that.setState({status:error.message, sent:false})
        }
    }

    var showStatus = function(that, response, statusMessage) {
        if (response.success){
            that.setState({status:statusMessage, sent:false})
        }
        else {
            that.setState({
                status:response.error,
                sent:false
            })
        }
    }

    var setSentStatus = function(response) {
        if (response.success){
            that.setState({status:"Sent", sent:false})
        }
        else {
            that.setState({
                status:response.error,
                sent:false
            })
        }
    }

    var makeErrorStatus = function(that) {
        return function(error) {
            showErrorStatus(that, error)
        }
    }

    var showErrorStatus = function(that, error) {
        that.setState({status:error.message, sent:false})
    }

    exports.fillDataObject = fillDataObject
    exports.showStatus = showStatus
    exports.makeDataObject = makeDataObject
    exports.emptyInputs = emptyInputs
    exports.makeSentStatus = makeSentStatus
    exports.makeErrorStatus = makeErrorStatus
})()