/** @jsx React.DOM */

/**
 * newJSX
 *
 * Created by jrootham on 08/09/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var React = require("react")
    var commonJSX = require("./commonJSX")
    var EnterPostalcode = commonJSX.EnterPostalcode

    var localDepends

    var New = React.createClass({
        render: function() {
            return (
                <div>
                    <EnterPostalcode />
                </div>
            )
        }
    })

    var render = function(value) {
        React.renderComponent(<New />, document.getElementById('body'))
    }

    var main = function(depends) {
        localDepends = depends
        render()
    }
    exports.main = main
})()