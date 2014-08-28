/**
 * Created by jrootham on 26/07/14.
 */

(function(){
    "use strict"

    var dataAccess = require("../test/dataAccess")
    var http = require('http')
    var Cookies = require('cookies')
    var server = require("./server")
    var routeTable = require("./routeTable")
    var recruitFns = require("../common/recruitFns")
    var permissions = require("../test/permissions")

    var depends = {
        dataAccess:     dataAccess,
        http:           http,
        routeTable:     routeTable.routeTable,
        credential:     recruitFns.credential,
        Cookies:        Cookies,
        permissions:    permissions
    }

    server.server(depends)
})()
