/** @jsx React.DOM */

/**
 * selectRecruitJSX
 *
 * Created by jrootham on 03/09/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var React = require("react")
    var recruitFns = require("../../common/recruitFns")
    var common = require("../../js/common")
    var recruitCommonJSX = require("./recruitCommonJSX")
    var EnterRecruit = recruitCommonJSX.EnterRecruit
    var ShowRecruit = recruitCommonJSX.ShowRecruit

    var localDepends

    var setDepends = function(depends) {
        localDepends = depends
    }

    var recruitId = 0

    var getRecruitId = function() {
        return recruitId
    }

    var setRecruitId = function(recruitArray, index) {
        if (recruitArray.length > 0 && index >= 0 && index < recruitArray.length) {
            recruitId = recruitArray[index].id
        }
        else {
            recruitId = 0
        }
    }

    var fieldArray = recruitFns.fieldArray

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
            setRecruitId(response, 0)
            that.setState({recruitArray: response, index: 0})
        }
    }

    var makeError = function(that) {
        return function (that, error) {
            common.showErrorStatus(that, error)
            that.setState({recruitArray: [], index: 0})
        }
    }

    var SelectRecruit = React.createClass({
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

        next: function() {
            if (this.state.index < this.state.recruitArray.length - 1) {
                this.setState({index: this.state.index + 1})
                setRecruitId(this.state.recruitArray, this.state.index)
            }
        },

        previous: function() {
            if (this.state.index > 0) {
                this.setState({index: this.state.index - 1})
                setRecruitId(this.state.recruitArray, this.state.index)
            }
        },

        render: function() {
            return (
                <div>
                    <div className='blockBox'>
                        <h3>Enter Search Criteria</h3>
                        <EnterRecruit />
                    </div>
                    <div className='blockBox'>
                        <div className='blockBuffer'>
                            Showing {Math.min(this.state.index + 1, this.state.recruitArray.length) + " "}
                            of {this.state.recruitArray.length}
                        </div>
                        <ShowRecruit recruit={getElement(this.state.recruitArray, this.state.index)} />
                        <div>
                            <div className="button" onClick={this.search}>Search</div>
                            <div className="button" onClick={this.previous}>Previous</div>
                            <div className="button" onClick={this.next}>Next</div>
                        </div>

                        <div  className="blockBuffer">
                            Search status: {this.state.status}
                        </div>
                    </div>
                </div>
            )
        }

    })

    exports.SelectRecruit = SelectRecruit
    exports.setDepends = setDepends
    exports.getRecruitId = getRecruitId
})()