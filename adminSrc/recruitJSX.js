/** @jsx React.DOM */


/**
 * Created by jrootham on 31/07/14.
 */

(function() {
    "use strict"

    var React = require("react")
    var recruitFns = require("../common/recruitFns")
    var common = require("../common/common")
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
    var SignupRecruit = React.createClass({
        getInitialState: function(){
            return ({
                recruitId: 0,
                recruitArray: [],
                index: 0,
                identifier: "",
                status: " ",
                sent:false})
        },

        found: function (response) {
            common.showStatus(this. response, "Found")
            this.setState({recruitArray: response})
        },

        search: function() {
            if (!this.state.sent) {
                this.setState({status:"Sending", sent:true})
                var response = localDepends.message.get("campaign/admin/searchRecruits",
                    common.makeDataObject(fieldArray))
                result.then(this.found(response), common.makeErrorStatus(this))
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
                        <div className="button" onClick={this.next}>Next</div>
                        <div className="button" onClick={this.signup}>Signup</div>
                    </div>

                    <div>
                        {this.state.status}
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