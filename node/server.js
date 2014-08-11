/**
 * Created by jrootham on 01/08/14.
 */

(function(){
    "use strict"

    var formidable = require('formidable')
    var config = require("./config")
    var defs = require("../common/defs")

    var router = function(depends, request, response, data) {
        var tablePointer = depends.routeTable
        if (!tablePointer) depends.fail( response, {error: "No routing table"}, {})

        var pathList = request.url.split('/')

        if (pathList.length === 0) depends.fail( response, {error: "Empty routing input"}, {})

        if (pathList[0] === "") pathList.shift()

        var found = tablePointer
        var searched = ""

        while (pathList.length > 0) {
            var current = pathList.shift()
            searched += "/" + current

            found = tablePointer[current]

            if (found) {
                tablePointer = found
            }
            else {
                break
            }
        }

        if (found && found[request.method]) {
            found[request.method](depends, request, response, data)
        }
        else {
            response.writeHead(404, "")
            response.end()
        }
    }

    var sendHeaders = function(response, headers) {
        var sendHeaders = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        }

        Object.keys(headers).forEach(function(key) {
            sendHeaders[key] = headers[key]
        })

        response.writeHead(200, sendHeaders)
    }

    var success = function(response, resultObject, headers) {
        sendHeaders(response, headers)
        resultObject.success = true
        response.end(JSON.stringify(resultObject))
    }

    var fail = function(response, error, headers) {
        sendHeaders(response, headers)
        error.success = false
        response.end(JSON.stringify(error))
    }

    var server = function(depends) {
        depends.http.createServer(function (request, response) {
            depends.success = success
            depends.fail = fail

            if (request.method.toUpperCase() === 'POST') {
                var form = new formidable.IncomingForm()

                form.parse(request, function(error, data) {
                    if (error) {
                        fail(response, {error: error.description})
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
