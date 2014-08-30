/*
       _______  __   __  _______  _______  __    _  _______  _______ 
      |       ||  | |  ||       ||       ||  |  | ||       ||       |
      |    _  ||  | |  ||    ___||    ___||   |_| ||    ___||_     _|
      |   |_| ||  |_|  ||   |___ |   |___ |       ||   |___   |   |  
      |    ___||       ||    ___||    ___||  _    ||    ___|  |   |  
      |   |    |       ||   |    |   |    | | |   ||   |___   |   |  
      |___|    |_______||___|    |___|    |_|  |__||_______|  |___|  

    Network library for the puffball platform.

    Contains a peer.js-based p2p layer, a promise-based XHR implementation, 
    helper functions for accessing various server-based APIs, 
    and helper functions for handling puff distribution and acquisition.

*/
(function(){
    "use strict"

    var promise = require("es6-promise")
    var url = require("url")
    var defs = require("../common/defs")

    var xhr = function(method, pathArray, query, data) {
        //// very simple promise-based XHR implementation

        var target = url.format({
            protocol: window.location.protocol,
            hostname: window.location.hostname,
            port: defs.port,
            pathname: "/" + pathArray.join("/"),
            query: query


        })

        return new promise.Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(method, target);

//            Object.keys(options.headers || {}).forEach(function (key) {
//                req.setRequestHeader(key, options.headers[key]);
//            });

            req.withCredentials = 'true'
            req.setRequestHeader('Accept', 'application/json');
            req.responseType = 'json';


            var formdata = new FormData()
            Object.keys(data || {}).forEach(function (key) {
                var datum = typeof data[key] == 'object' ? JSON.stringify(data[key]) : data[key];
                formdata.append(key, datum);
            });

            req.onload = function() {
              if (req.status == 200) {
                  resolve(req.response)
              }// silly safari
              else {
                  reject(Error("Network Error " + req.statusText));
                }
            };

            req.onerror = function(error) {
                reject(Error("Network Error " + req.statusText));
            };

            req.send(formdata);
        });
    }

    var getHTTP = function(pathArray, query) {
         return xhr('GET', pathArray, query, {})
    }

    var postHTTP = function(pathArray, data) {
        return xhr('POST', pathArray, {}, data)
    }

    var putHTTP  = function(pathArray, data) {
        return xhr('PUT', pathArray, {}, data)
    }

    var patchHTTP = function(pathArray, data) {
        return xhr('PATCH', pathArray, {}, data)
    }

    var deleteHTTP = function(pathArray) {
        return xhr('DELETE', pathArray, {}, {})
    }

    exports.getHTTP = getHTTP
    exports.postHTTP = postHTTP
    exports.putHTTP = putHTTP
    exports.patchHTTP = patchHTTP
    exports.deleteHTTP = deleteHTTP
})()
