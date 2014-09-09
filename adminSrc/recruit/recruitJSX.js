/** @jsx React.DOM */


/**
 * Created by jrootham on 31/07/14.
 */

(function() {
    "use strict"

    var React = require("react")
    var recruitFns = require("../../common/recruitFns")
    var common = require("../../js/common")
    var selectRecruit = require("./../selectRecruitJSX")
    var SelectRecruit = selectRecruit.SelectRecruit

    var localDepends

    var makeSignup = function(that) {
        return function (response) {
            common.showStatus(that, response, "Signed up")
            that.setState({identifier: response.identifier})
        }
    }

    var SignupRecruit = React.createClass({
        getInitialState: function(){
            return ({status: ' ', sent:false, identifier: ' '})
        },

        signup: function() {
            var recruitId = selectRecruit.getRecruitId()

            if (recruitId != 0) {
                if (!this.state.sent) {
                    this.setState({status:"Sending", sent:true})
                    var pathArray = [
                        "campaign",
                        "admin",
                        "signupRecruit",
                        recruitId
                    ]
                    var response = localDepends.message.postHTTP(pathArray, {})
                    response.then(makeSignup(this), common.makeErrorStatus(this))
                }
            }
            else {
                this.setState({status:"Recruit not set"})
            }
        },

        render: function() {
            return (
                <div>
                    <SelectRecruit />
                    <div className="blockBox">
                        <div>
                            <div className="button" onClick={this.signup}>Signup</div>
                        </div>

                        <div className="blockBuffer">
                            Signup status: {this.state.status}
                        </div>

                        <div className="blockBuffer">
                            Identifier: {this.state.identifier}
                        </div>
                    </div>
                </div>
            )
        }

    })


    var render = function(value) {
        React.renderComponent(<SignupRecruit />, document.getElementById('body'))
    }

    var main = function(depends) {
        localDepends = depends
        selectRecruit.setDepends(depends)
        render()
    }

    exports.main = main
})()