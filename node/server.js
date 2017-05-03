/**
 *
 * server.js
 *
 * Created by jrootham on 01/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */

(function(){
    "use strict";

    require('../common/find').setFind();                   // Amends Array prototype
    var formidable = require('formidable');
    var url = require("url");

    var makeTestMatch = function (tablePointer) {
        return function (theKey) {
            var result = false;

            var match = tablePointer[theKey].match;
            if (match) {
                result = (current.length <= match.maxLength);
                if (result) {
                    result = (new RegExp(match.pattern)).test(current);
                }
            }

            return result;
        }
    }

    var findTablePointer = function(tablePointer, current, pathArgs) {
        var found = tablePointer[current];
        if (!found) {
            var key = Object.keys(tablePointer).find(makeTestMatch(tablePointer));

            if (key) {
                pathArgs[key] = current;
                found = tablePointer[key].next;
            }
            else {
                found = null;
            }
        }

        return found;
    };

    var router = function(depends, request, response, data) {
        var tablePointer = depends.routeTable;
        if (!tablePointer) depends.fail( response, {error: "No routing table"}, {});

        var pathURL = url.parse(request.url, true);        // gets pathname and query object

        var pathList = pathURL.pathname.split('/');

//        if (pathList.length === 0) depends.fail( response, {error: "Empty routing input"}, {})

        while (pathList.length > 0 && pathList[0] === "") {
            pathList.shift();
        }

        var found = tablePointer;
        var searched = "";
        var pathArgs = {};

        while (pathList.length > 0 && tablePointer) {
            var current = pathList.shift();
            searched += "/" + current;
            found = findTablePointer(tablePointer, current, pathArgs);

            if (!found) break;

            tablePointer = found;
        }

        if (found && found[request.method]) {
            found[request.method](depends, request, response, pathArgs, pathURL.query, data);
        }
        else {
            depends.mount(request, response)            // serve a static file
        }
    };

    var sendHeaders = function(request, response, code, headers) {
        var sendHeaders = {
            'Content-Type': 'application/json'
        };

        Object.keys(headers).forEach(function(key) {
            sendHeaders[key] = headers[key]
        });

        response.writeHead(code, sendHeaders);
    };

    var success = function(request, response, resultObject, headers) {
        sendHeaders(request, response, 200, headers);
        resultObject.success = true;
        response.end(JSON.stringify(resultObject));
    };

    var fail = function(request, response, error, headers) {
        sendHeaders(request, response, 200, headers);
        error.success = false;
        response.end(JSON.stringify(error));
    };

    var sendHTML = function (response, html) {

    };

    var server = function(depends) {
        depends.http.createServer(function (request, response) {
            depends.success = success;
            depends.fail = fail;
            depends.sendHTML = sendHTML

            var method = request.method.toUpperCase();
            if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
                var form = new formidable.IncomingForm();

                form.parse(request, function(error, data) {
                    if (error) {
                        fail(response, {error: "form parse failed" + error.description});
                    }

                    router(depends, request, response, data);
                });
            }
            else {
                router(depends, request, response, {});
            }
        }).listen(depends.port, depends.server);

        console.log('Server running at ' + depends.server + ':' + depends.port);
    };

    exports.server = server;
})();
