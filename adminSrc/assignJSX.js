/** @jsx React.DOM */

/**
 * Created by jrootham on 06/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var React = require("react")
    var common = require("../js/commom")
    var permissions = require("./PermissionsJSX")

    var localDepends
    var Permissions = permissions.Permissions

    var Question = React.createClass({
        render: function() {
            return(
                <div>
                Question
                </div>
                )
        }
    })

    var Assign = React.createClass({
        render: function() {
            return (
                <div>
                    <div>
                        <Permission />
                    </div>
                    <div>
                        <Question />
                    </div>
                </div>
            )
        }
    })

    var render = function(value) {
        React.renderComponent(<Assign />, document.getElementById('body'))
    }

    var main = function(depends) {
        localDepends = depends
        permissions.getRootArray()
        render()
    }

    exports.main = main
})()