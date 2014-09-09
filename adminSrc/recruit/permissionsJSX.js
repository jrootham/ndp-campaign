/** @jsx React.DOM */

/**
 * Created by jrootham on 28/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var React = require("react")
    var common = require("../../js/common")

    var PermissionList = React.createClass({

        render: function() {
            return (
                <div>
                </div>
            )
        }

    })

    var Permissions = React.createClass({
        getInitialState: function(){
            return ({rootArray:[], status:'', sent:false})
        },

        render: function() {
            return(
                <div>
                Permission
                    <PermissionList rootArrray={this.state.rootArray} />
                    <div>
                        {this.status}
                    </div>
                </div>
            )
        }
    })

    var setRootArray = function(response) {
        Permission.setState({rootArray:response})
    }

    var getPermissionsArray = function(depends) {
        var pathArray = ['campaign','admin','permission','location']
        return depends.message.getHTTP(pathArray, {})
        result.then(setRootArray, common.makeErrorStatus(this))
    }


    exports.Permissions = Permissions
 })()