/** @jsx React.DOM */

/**
 * Created by jrootham on 24/06/14.
 */
(function() {
    "use strict"

    var React = require('react')
    var canvassData = require("../test/canvassData")
    var keyFns = require("../js/keyFunctions")
    var serialize = require("../js/serialize")

    var loadContactArray = function(contactArray, streetIndex, addressIndex, residentIndex) {
        var contactIndex = 0
        contactArray.forEach(function(contact) {

            contactIndex += 1
            var key = keyFns.contactKey(streetIndex, addressIndex, residentIndex, contactIndex)
            localStorage.setItem(key, serialize.contact(contact))
        })
    }

    var loadResidentArray = function(residentArray, streetIndex, addressIndex) {
        var residentIndex  = 0

        residentArray.forEach(function(resident) {

            residentIndex += 1
            var key = keyFns.residentKey(streetIndex, addressIndex, residentIndex)
            localStorage.setItem(key, serialize.resident(resident))

            loadContactArray(resident.contactArray, streetIndex, addressIndex, residentIndex)
        })
    }

    var loadAddressArray = function(addressArray, streetIndex) {
        var addressIndex = 0
        addressArray.forEach (function(address){

            addressIndex += 1
            var key = keyFns.addressKey( streetIndex, addressIndex)
            localStorage.setItem(key, serialize.address(address))

            loadResidentArray(address.residentArray, streetIndex, addressIndex)
        })
    }

    var loadStreetArray = function(streetArray) {
        var streetIndex = 0
        streetArray.forEach((function (street) {

            streetIndex += 1
            var key = keyFns.streetKey(streetIndex)
            localStorage.setItem(key, serialize.street(street))

            loadAddressArray(street.addressArray, streetIndex)
        }))
    }

    var loadPoll = function(poll)
    {
        localStorage.setItem(keyFns.pollKey(), serialize.poll(poll))

        loadStreetArray(poll.streetArray)
    }

    var load = function() {
        localStorage.setItem("questionArray", JSON.stringify(canvassData.questionArray))
        loadPoll(canvassData.poll)
    }

    var setCleared = function() {}

    var setupCleared = function(that) {
        setCleared = function() {
            that.setState({loaded:false})
        }
    }

    var Poll = React.createClass({
        getInitialState: function() {
            return({loaded: false})
        },

        load: function(event) {
            load()
            this.setState({loaded: true})
            setupCleared(this)
            setFilled()
        },

        render: function () {
            return (
                <div className="line">
                    <div className="button" onClick={this.load}>
                    Load Poll
                    </div>
                    <div className="state">
                        {this.state.loaded ? "Loaded" : ""}
                    </div>
                </div>
            )
        }
    })

    var setFilled = function() {}

    var setupFilled = function(that) {
        setFilled = function() {
            that.setState({cleared:false})
        }
    }

    var Clear = React.createClass({
        getInitialState: function() {
            return({cleared: false})
        },

        clearAll: function(event) {
            localStorage.clear()
            this.setState({cleared: true})
            setupFilled(this)
            setCleared()
        },

        render: function() {
            return (
                <div className="line">
                    <div className="button" onClick={this.clearAll}>
                        Clear
                    </div>
                    <div className="state">
                        {this.state.cleared ? "Cleared" : ""}
                    </div>
                </div>
            )
        }
    })

    var Load = React.createClass({
        render: function() {
            return (
                <div>
                    <Token />
                    <Poll />
                    <Clear />
                </div>
            )
        }
    })

    var render = function(value) {
        React.renderComponent(<Load />, document.getElementById('body'))
    }

    render()

    var displayError = function(err) {
        if (err.message != undefined) {
            render(err.message)
        }
        else {
            render("Unknown")
        }

    }


// var promise = message.getJSON("data/canvass.json")
// promise.then(store, displayError)

})()

