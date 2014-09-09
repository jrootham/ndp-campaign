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

    var EnterPostalcode = React.createClass({
        getInitialState: function(){
            return ({status: " ", sent:false})
        },

        keystroke: function (event) {
            var text = document.getElementById("enterPostalcode").value
            console.log("text", text)
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