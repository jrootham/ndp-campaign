/** @jsx React.DOM */

/**
 * commonJSX
 *
 * Created by jrootham on 08/09/14.
 *
 * Copyright © 2014 Jim Rootham
 */

(function () {
    "use strict"

    var React = require("react")
    var common = require("../../js/common")

    var POSTALCODE_LENGTH

    var EnterPostalcode = React.createClass({
        getInitialState: function(){
            return ({status: " ", sent:false})
        },

        makeSetCode: function(){
            return function() {

                common.setSentStatus(response)
            }
        },

        keystroke: function (event) {
            var code = document.getElementById("enterPostalcode").value

            if (code.length == POSTALCODE_LENGTH) {
                if (!this.state.sent) {
                    this.setState({status:"Sending", sent:true})
                    var pathArray = ['campaign','admin','getPostalcode']
                    var result = localDepends.message.getHTTP(pathArray, {postalcode:code})
                    result.then(this.makeSetCode(), common.makeErrorStatus(this))
                }
            }
        },

        render: function() {
            return (
                <div className="blockBox">
                    <div className="enterLabel">Postal Code (AnA nAn)</div>
                    <div className="enterInput">
                        <input type="text" id="enterPostalcode" onKeyUp={this.keystroke} />
                    </div>
                    <div>
                        Status: {this.state.status}
                    </div>
                </div>
            )
        }
    })

    var SelectStreet = React.createClass({
        render: function() {
            return (
                <div className="blockBox">
                    <div className="enterLabel">Postal Code</div>
                    <div className="enterInput">
                        <input type="" id="enterPostalcode" onKeyUp={this.keystroke} />
                    </div>
                </div>
            )
        }
    })

    exports.EnterPostalcode = EnterPostalcode
})()