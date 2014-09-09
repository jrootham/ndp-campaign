/** @jsx React.DOM */

/**
 * AssignJSX
 *
 * Created by jrootham on 06/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var React = require("react")
    var common = require("../../js/common")
    var permissions = require("./../permissionsJSX")
    var selectRecruit = require("./../selectRecruitJSX")
    var SelectRecruit = selectRecruit.SelectRecruit
    var Permissions = permissions.Permissions

    var localDepends

    var Questions = React.createClass({
        render: function() {
            return(
                <div>
                Questions
                </div>
                )
        }
    })

    var Assign = React.createClass({
        render: function() {
            return (
                <div>
                    <SelectRecruit />
                    <div>
                        <Permissions />
                    </div>
                    <div>
                        <Questions />
                    </div>
                </div>
            )
        }
    })

    var render = function(value) {
        React.renderComponent(<Assign />, document.getElementById('body'))
    }

    var initialLoad = function() {

    }

    var main = function(depends) {
        localDepends = depends
        selectRecruit.setDepends(depends)
        initialLoad()
    }

    exports.main = main
})()