/** @jsx React.DOM */

/**
 * Created by jrootham on 29/07/14.
 */

(function(){
    "use strict"

    var React = require("react")
    var localDepends

    var makeGoodStatus = function(that) {
        return function(response) {
            if (response.success){
                that.setState({status:"Sent: OK"})
            }
            else {
                that.setState({
                    status:response.error,
                    sent:false
                })
            }
        }
    }

    var makeErrorStatus = function(that) {
        return function(error) {
            that.setState({status:error.message})
        }
    }
    var Token = React.createClass({
        getInitialState: function(){
            return ({status: " ", sent:false})
        },

        sendToken: function(event) {
            if (this.state.sent === false) {
                this.setState({status:"Sending", sent:true})
                var token = document.getElementById("token").value
                var result = localDepends.message.post("campaign/signup", {token: token})
                result.then(makeGoodStatus(this), makeErrorStatus(this))
            }
        },

        render: function () {
            return (
                <div>
                    <div className="line">
                        <div>
                            Identifier:
                            <input className="text" type="text" id="token" length="10" size="10"/>
                        </div>
                    </div>
                    <div className="line">
                        <div className="button" onClick={this.sendToken}>
                        Load Identifier
                        </div>
                    </div>
                    <div className="line" id="status">
                        {this.state.status}
                    </div>
                </div>
            )
        }
    })

    var Signup = React.createClass({
        render: function() {
            return (
                <div>
                    <Token />
                </div>
                )
        }
    })

    var render = function(value) {
        React.renderComponent(<Signup />, document.getElementById('body'))
    }

    var main = function(depends) {
        localDepends = depends
        render()
    }

    exports.main = main
})()