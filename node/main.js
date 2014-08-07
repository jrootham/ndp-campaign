/**
 * Created by jrootham on 26/07/14.
 */

(function(){
    "use strict"

    var dataAccess = require("../test/dataAccess")
    var http = require('http')
    var server = require("./server")
    var routeTable = require("./routeTable").routeTable
    var isUsingHTTPS = function() {return false}

    var depends = {
        dataAccess: dataAccess,
        http: http,
        isUsingHTTPS: isUsingHTTPS,
        routeTable: routeTable
    }

    server.server(depends)
})()
