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
    var config = require("./config");
    var defs = require("../common/defs");

    var st = require('st')

    var setup = {
        path: config.path,
        url: '/',
        cache: {                                    // specify cache:false to turn off caching entirely
            fd: {
                max: 100,                           // number of fd's to hang on to
                maxAge: 1000 * 60 * 60              // amount of ms before fd's expire
            },

            stat: {
                max: 500,                          // number of stat objects to hang on to
                maxAge: 1000 * 60                  // number of ms that stats are good for
            },

            content: {
                max: 1024 * 512,                    // how much memory to use on caching contents
                maxAge: 1000 * config.maxAge,       // how long to cache contents for
                cacheControl: 'public, max-age=' + config.maxAge // to set an explicit cache-control
                // header value
            }
        },

        index: 'index.html',                    // use 'index.html' file as the index
        passthrough: false                      // returns a 404 when a file or an index is not found
    };

    var mount = st(setup)

    var depends = {
        dataAccess:     dataAccess,
        http:           http,
        routeTable:     routeTable.routeTable,
        credential:     recruitFns.credential,
        Cookies:        Cookies,
        permissions:    permissions,
        server:         config.server,
        port:           defs.port,
        mount:          mount
    };

    server.server(depends);
})()
