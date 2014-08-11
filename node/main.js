/**
 * Created by jrootham on 26/07/14.
 */

(function(){
    "use strict"

    var dataAccess = require("../test/dataAccess")
    var http = require('http')
    var Cookies = require('cookies')
    var server = require("./server")
    var routeTable = require("./routeTable").routeTable
    var credential = require("../test/credentialOne")
    var permissions = require("../test/permissions")

    var depends = {
        dataAccess:     dataAccess,
        http:           http,
        routeTable:     routeTable,
        credential:     credential.credential,
        Cookies:        Cookies,
        permissions:    permissions
    }

    server.server(depends)
})()
