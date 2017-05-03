/**
 * tdb.js
 *
 * Created by jrootham on 03/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var db = require('../db.js')

    var connect = db.connect()

    console.log('connected')

    var getData = function(err, thing) {
        console.log('In callback')
        if (err) {
            console.log('Errror:', err)
        }
        else {
            console.log('thing', thing)
        }
    }

    var sql = 'SELECT * FROM person'
    console.log(connect.query(sql, getData))

    console.log('after')
})()