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

    var defs = require("../common/defs")

    var makeURL = function(path) {
        var protocol = window.location.protocol
        var hostname = window.location.hostname

        return (protocol + "//" + hostname + ":" + defs.port + "/" + path)
    }



    var xhr = function(path, options, data) {
        //// very simple promise-based XHR implementation

        var url = makeURL(path)
        return new promise.Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(options.method || 'GET', url);

            Object.keys(options.headers || {}).forEach(function (key) {
                req.setRequestHeader(key, options.headers[key]);
            });

            var formdata = new FormData()
            Object.keys(data || {}).forEach(function (key) {
                var datum = typeof data[key] == 'object' ? JSON.stringify(data[key]) : data[key];
                formdata.append(key, datum);
            });

            if(options && options.type)
                req.responseType = options.type;

            req.onload = function() {
              if (req.status == 200) {
                  resolve(JSON.parse(req.response))
              }// silly safari
              else {
                  reject(Error(req.statusText));
                }
            };

            req.onerror = function(error) {
                if(error) {
                    console.log("Error object")
                    for (var p in error) console.log(p)
                }
                else {
                    console.log("no error object")
                }

                reject(Error("Network Error"));
            };

            req.send(formdata);
        });
    }

    var get = function(url, params) {
        var options = { headers: { 'Accept': 'application/json' }
                      ,  method: 'GET'
                      ,    type: 'json'
                      }

        var params = params || {}
        var enc = encodeURIComponent
        var qstring = Object.keys(params).reduce(function(acc, key) {return acc + enc(key) +'='+ enc(params[key]) +'&'}, '?')

        return xhr(url + qstring, options)
    }

    var post = function(url, data) {
        var options = { headers: { 'Accept': 'application/json' }
                      ,  method: 'POST'
                      }

        return xhr(url, options, data)
    }

    exports.get = get
    exports.post = post
})()
