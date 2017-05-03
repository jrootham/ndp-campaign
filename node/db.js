/**
 * db.js
 *
 * Created by jrootham on 02/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict";

    var mysql = require('mysql2')
    var config = require('./config.js');

    var connect = function () {
        var options = {database: config.database, user: config.user, password:config.password};
        return mysql.createConnection(options);
    }

    exports.connect =  connect

})()