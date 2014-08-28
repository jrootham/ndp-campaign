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
    var common = require("../js/common")
    var EnterRecruit = require("./recruitCommonJSX").EnterRecruit

    var fieldArray = recruitFns.fieldArray

    var localDepends

    var Enter = React.createClass({
        getInitialState: function(){
            return ({status: " ", sent:false})
        },

        submit: function() {
            if (!this.state.sent) {
                this.setState({status:"Sending", sent:true})
                var pathArray = ['campaign','admin','enter']
                var result = localDepends.message.postHTTP(pathArray, common.makeDataObject(fieldArray))
                result.then(common.makeGoodStatus(this, fieldArray), common.makeErrorStatus(this))
            }
        },

        render: function() {
            return (
                <div>
                    <EnterRecruit />
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

    var render = function(value) {
        React.renderComponent(<Enter />, document.getElementById('body'))
    }

    var main = function(depends) {
        localDepends = depends
        render()
    }
    exports.main = main
})()