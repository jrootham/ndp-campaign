/**
 * editJSX
 *
 * Created by jrootham on 08/09/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var React = require("react")

    var localDepends

    var Edit = React.createClass({
        render: function() {
            return (
                <div>
                </div>
            )
        }
    })

    var render = function(value) {
        React.renderComponent(<Edit />, document.getElementById('body'))
    }

    var main = function(depends) {
        localDepends = depends
        render()
    }
    exports.main = main

})()