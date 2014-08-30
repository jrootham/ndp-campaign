/**
 * Created by jrootham on 28/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    require("react")

    var PermissionList = React.createClass({

    })

    var Permissions = React.createClass({
        getInitialState: function(){
            return ({rootArray:[]})
        },

        render: function() {
            return(
                <div>
                Permission
                    <PermissionList rootArrray={this.state.rootArray} />
                </div>
                )
        }
    })

    var setRootArray = function(response) {
        Permission.setState({rootArray:response})
    }

    var getRootArray = function() {
        var pathArray = ['campaign','admin','permissionRoot']
        var result = localDepends.message.getHTTP(pathArray, {})
        result.then(setRoot, common.makeErrorStatus(this))
    }


    exports.Permissions = Permissions
    exports.getRootArray = getRootArray
})()