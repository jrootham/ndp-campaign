/** @jsx React.DOM */


/**
 * Created by jrootham on 31/07/14.
 */

(function() {
    "use strict"

    var React = require("react")
    var recruitFns = require("../common/recruitFns")
    var common = require("../js/common")
    var recruitCommonJSX = require("./recruitCommonJSX")
    var EnterRecruit = recruitCommonJSX.EnterRecruit
    var ShowRecruit = recruitCommonJSX.ShowRecruit

    var fieldArray = recruitFns.fieldArray

    var localDepends

    var getElement = function(array, index) {
        var result = {}

        if (index < array.length) {
            result = array[index]
        }

        return common.fillDataObject(fieldArray, result)
    }

    var makeFound = function(that) {
        return function (response) {
            common.showStatus(that, response, "Found")
            that.setState({recruitArray: response, index: 0})
        }
    }

    var makeSignup = function(that) {
        return function (response) {
            common.showStatus(that, response, "Signed up")
            that.setState({identifier: response.identifier})
        }
    }

    var makeError = function(that) {
        return function (that, error) {
            common.showErrorStatus(that, error)
            that.setState({recruitArray: [], index: 0})
        }
    }

    var SignupRecruit = React.createClass({
        getInitialState: function(){
            return ({
                recruitArray: [],
                index: 0,
                identifier: "",
                status: " ",
                sent:false})
        },

        search: function() {
            if (!this.state.sent) {
                this.setState({status:"Sending", sent:true})
                var pathArray = ["campaign", "admin", "searchRecruits"]
                var response = localDepends.message.getHTTP(pathArray, common.makeDataObject(fieldArray))
                response.then(makeFound(this), makeError(this))
            }
        },

        signup: function() {
            if (!this.state.sent && this.state.recruitArray.length != 0) {
                this.setState({status:"Sending", sent:true})
                var pathArray = [
                    "campaign",
                    "admin",
                    "signupRecruit",
                    this.state.recruitArray[this.state.index].id
                ]
                var response = localDepends.message.postHTTP(pathArray, {})
                response.then(makeSignup(this), common.makeErrorStatus(this))
            }
        },

        next: function() {
            if (this.state.index < this.state.recruitArray.length - 1) {
                this.setState({index: this.state.index + 1})
            }
        },

        previous: function() {
            if (this.state.index > 0) {
                this.setState({index: this.state.index - 1})
            }
        },

        render: function() {
            return (
                <div>
                    <EnterRecruit />
                    <div>
                        Showing {Math.min(this.state.index + 1, this.state.recruitArray.length) + " "}
                        of {this.state.recruitArray.length}
                    </div>
                    <ShowRecruit recruit={getElement(this.state.recruitArray, this.state.index)} />
                    <div>
                        <div className="button" onClick={this.search}>Search</div>
                        <div className="button" onClick={this.previous}>Previous</div>
                        <div className="button" onClick={this.next}>Next</div>
                        <div className="button" onClick={this.signup}>Signup</div>
                    </div>

                    <div>
                        {this.state.status}
                    </div>

                    <div>
                        {this.state.identifier}
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
        render()
    }

    exports.main = main
})()