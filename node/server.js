/**
 * Created by jrootham on 01/08/14.
 */

(function(){
    "use strict"

    require('../common/find').setFind()                   // Amends Array prototype
    var formidable = require('formidable')
    var url = require("url")
    var config = require("./config")
    var defs = require("../common/defs")

    var router = function(depends, request, response, data) {
        var tablePointer = depends.routeTable
        if (!tablePointer) depends.fail( response, {error: "No routing table"}, {})

        var pathURL = url.parse(request.url, true)        // gets pathname and query object

        var hostURL  = url.parse(request.headers.origin)  // gets the protocol and hostname
        depends.domain = hostURL.hostname                 // hang the hostname on the dependency

        var pathList = pathURL.pathname.split('/')

//        if (pathList.length === 0) depends.fail( response, {error: "Empty routing input"}, {})

        while (pathList.length > 0 && pathList[0] === "") {
            pathList.shift()
        }

        var found = tablePointer
        var searched = ""
        var pathArgs = {}

        while (pathList.length > 0) {
            var current = pathList.shift()
            searched += "/" + current

            found = tablePointer[current]
            if (found) {
                tablePointer = found
            }
            else{
                var key = Object.keys(tablePointer).find(function (theKey) {
                    var result = false

                    var match = tablePointer[theKey].match
                    if (match) {
                        result = (current.length <= match.maxLength)
                        if (result) {
                            result = (new RegExp(match.pattern)).test(current)
                        }
                    }

                    return result
                })

                console.log("key", key)
                if (key) {
                    pathArgs[key] = current
                    found = tablePointer[key].next

                    console.log(found)
                }
                else {
                    break
                }
            }
        }

        if (found && found[request.method]) {
            found[request.method](depends, request, response, pathArgs, pathURL.query, data)
        }
        else {
            console.log("Searched:", searched)
            sendHeaders(request, response, 404, {})
            response.end()
        }
    }

    var sendHeaders = function(request, response, code, headers) {
        var sendHeaders = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type, application/json',
            'Access-Control-Allow-Origin' : request.headers.origin
        }

        Object.keys(headers).forEach(function(key) {
            sendHeaders[key] = headers[key]
        })

        response.writeHead(code, sendHeaders)
    }

    var success = function(request, response, resultObject, headers) {
        sendHeaders(request, response, 200, headers)
        resultObject.success = true
        response.end(JSON.stringify(resultObject))
    }

    var fail = function(request, response, error, headers) {
        sendHeaders(request, response, 200, headers)
        error.success = false
        response.end(JSON.stringify(error))
    }

    var server = function(depends) {
        depends.http.createServer(function (request, response) {
            depends.success = success
            depends.fail = fail

            var method = request.method.toUpperCase()
            if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
                var form = new formidable.IncomingForm()

                form.parse(request, function(error, data) {
                    if (error) {
                        fail(response, {error: "form parse failed" + error.description})
                    }

                    router(depends, request, response, data)
                })
            }
            else {
                router(depends, request, response, {})
            }
        }).listen(defs.port, config.server)

        console.log('Server running at ' + config.server + ':' + defs.port)

    }

    exports.server = server
})()
