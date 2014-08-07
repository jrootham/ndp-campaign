/**
 * Created by jrootham on 30/07/14.
 */

(function(){
    "use strict"

    var depends = {}

    depends.dataAccess = require("../js/dataAccess")

    var main = require("../js/bootstrap")

    main.main(depends)
})