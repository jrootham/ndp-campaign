/** @jsx React.DOM */

/**
 * Created by jrootham on 06/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var React = require("react")
    var recruitFns = require("../common/recruitFns")

    var fieldArray = recruitFns.fieldArray

    var localDepends

    var getValue = function(name) {
        return document.getElementById(name).value
    }

    var validate = function(name) {
        return getValue(name)
    }

    var empty = function(name) {
        document.getElementById(name).value = ""
    }

    var emptyInputs = function(){
        fieldArray.forEach(function(field){empty(field)})
    }

    var makeGoodStatus = function(that) {
        return function(response) {
            if (response.success){
                that.setState({status:"Sent: OK", sent:false})
                emptyInputs()
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
            that.setState({status:error.message, sent:false})
        }
    }


    var Enter = React.createClass({
        getInitialState: function(){
            return ({status: " ", sent:false})
        },

        submit: function() {
            if (!this.state.sent) {
                this.setState({status:"Sending", sent:true})
                var result = localDepends.message.post("campaign/admin/enter", data)
                result.then(makeGoodStatus(this), makeErrorStatus(this))
            }
        },

        render: function() {
            return (
                <div>
                    <Recruit />
                    <div>
                        <div className="button" onClick={this.submit}>Submit</div>
                    </div>

                    <div>
                        {this.state.status}
                    </div>

                </div>
            )
        }

    })

    var Recruit = React.createClass({

        render: function() {
            return (<div>
                <div>
                    <div className="enterLabel">First name</div>
                    <div className="enterInput">
                        <input type="text" id="firstName" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Last name</div>
                    <div className="enterInput">
                        <input type="text" id="lastName" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Address</div>
                    <div className="enterInput">
                        <input type="text" id="address" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Street</div>
                    <div className="enterInput">
                        <input type="text" id="street" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Apartment</div>
                    <div className="enterInput">
                        <input type="text" id="apartment" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Postal code</div>
                    <div className="enterInput">
                        <input type="text" id="postalCode" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Home phone</div>
                    <div className="enterInput">
                        <input type="text" id="homePhone" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Cell phone</div>
                    <div className="enterInput">
                        <input type="text" id="cellPhone" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Email</div>
                    <div className="enterInput">
                        <input type="text" id="email" />
                    </div>
                </div>

            </div>)
        }
    })

    var render = function(value) {
        React.renderComponent(<Enter />, document.getElementById('body'))
    }

    var main = function(depends) {
        localDepends = depends
        render()
    }
    exports.main = main
})()