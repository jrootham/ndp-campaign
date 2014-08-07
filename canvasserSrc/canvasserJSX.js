/** @jsx React.DOM */

/**
 * Created by jrootham on 29/06/14.
 */

(function() {
    "use strict"

    var React = require('react')
    var setFind = require("../js/find")
    var data = require("../js/fetchData")
    var keyFns = require("../js/keyFunctions.js")
    var serialize = require("../js/serialize")

    setFind.setFind()

    var questionArray = JSON.parse(localStorage.getItem("questionArray"))
    var poll = data.poll

    var Radio = React.createClass({
        getInitialState: function() {
            return {toggle : false}
        },

        handleClick: function(event){
            this.props.group.forEach(function(radio) {radio.clear()})
            this.setState({toggle: true})
        },

        clear: function() {
            this.setState({toggle: false})
        },

        getValue: function() {
            return this.props.label
        },

        getToggle: function() {
            return this.state.toggle
        },

        render: function(){
            var label = this.props.label
            this.props.group.push(this)

            return (
                <div className="radio" onClick={this.handleClick}>
                        <div className={"toggle" + (this.state.toggle ? "On" : "Off")}>&nbsp;</div>
                        <div className="label">{label}</div>
                </div>
            )
        }
    })

    var getValue = function(radioArray) {
        var radio = radioArray.find(function(radio) {return radio.getToggle()})
        return radio ? radio.getValue() : undefined
    }

    var contactCount = 0
    var sentCount = 0

    var Page = function()
    {
        this.stack = []
        this.URL = "/canvass.html"
    }

    Page.prototype.newPage = function(display, title){
        this.stack.push(display)
        window.history.pushState("", title, this.URL)
        this.render(display)
    }

    Page.prototype.samePage = function(display, title) {
        this.stack[this.stack.length - 1] = display
        window.history.replaceState('', title, this.URL)
        this.render(display)
    }

    Page.prototype.render = function (display) {
        React.renderComponent(<Header />, document.getElementById('header'))

        React.renderComponent(display, document.getElementById('body'))
    }

    Page.prototype.renderLast = function()
    {
        this.render(this.stack[this.stack.length - 1])
    }

    var page = new Page()

    window.onpopstate =
        (function(){
            return function(event) {
                page.stack.pop()
                if (page.stack.length > 0) {
                    page.renderLast()
                }
                else {
                    window.history.back()
                }
            }
        })()

    var residentFlag = function (resident) {
        return resident.contactArray.some(function (contact) {
            return contact.flag === true
        })
    }

    var addressFlag = function (address) {
        return address.residentArray.some(function (resident) {
            return residentFlag(resident)
        })
    }

    var streetFlag = function (street) {
        return street.addressArray.some(function (address) {
            return addressFlag(address)
        })
    }

    var pollFlag = function (poll) {
        return poll.streetArray.some(function (street) {
            return streetFlag(street)
        })
    }

    var Flag = React.createClass({
        render: function () {
            if (this.props.flag) {
                return (<div className="flag"> &nbsp; </div>)
            }
            else {
                return (<div></div>)
            }
        }
    })

    var Header = React.createClass({
        render: function () {
            return (
                <div>
                    <div>
                        <div className="headEntry"> Poll: {poll.poll}</div>
                        <div className="headEntry"> Contacts: {contactCount}</div>
                        <div className="headEntry"> Sent: {sentCount}</div>
                        <div className="flagContainer">
                            <Flag flag={pollFlag(poll)} />
                        </div>
                    </div>
                    <div>
                        <div className="button" onClick={canvass}>Canvass</div>
                        <div className="button" onClick={send}>Send</div>
                        <div className="button" onClick={notDone}>Other</div>
                    </div>
                </div>)
        }
    })

    var notDone = function () {
        alert("Not implemented")
    }

    var send = function () {
        sentCount = contactCount
        page.renderLast()
    }

    var Timestamp = React.createClass({
        render: function () {
            var timestamp = this.props.timestamp
            var day = timestamp.getDate()
            var month = timestamp.getMonth() + 1
            var year = timestamp.getYear() % 100
            var hours = timestamp.getHours()
            var minutes = timestamp.getMinutes()
            minutes = minutes < 10 ? "0" + minutes : minutes
            var ampm = hours < 12 ? "AM" : "PM"
            hours = hours % 12

            return <span>{day + "/" + month + "/" + year + " " + hours + ":" + minutes + ampm}</span>
        }
    })

    var Contact = React.createClass({
        render: function () {
            var contact = this.props.contact
            return (
                <div className="entry">
                    <Timestamp timestamp={contact.timestamp} />
                {" " + contact.type}

                {questionArray.reduce(function(result, current, index, array){
                    var value = contact[current.name]
                    if (value) {
                        result += " " + value
                    }
                    return result
                }, "")}

                {contact.mark ? " " + contact.mark : ""}
                    <div className="flagContainer">
                        <Flag flag={contact.flag} />
                    </div>
                {contact.comment ? <div> {contact.comment} </div> : "" }
                </div>
            )
        }
    })

    var Name = React.createClass({
        render: function () {
            var resident = this.props.resident
            return (<span> {resident.firstName + " " + resident.lastName} </span>)
        }
    })

    var PriorList = React.createClass({
        render: function () {
            var resident = this.props.resident
            var contactArray = resident.contactArray
            return (
                <div>
                    <div className="headContainer">
                        <Name resident={resident} />
                    </div>
                {contactArray.map(function (contact) {
                    return (<Contact contact={contact}/>)
                })}
                </div>
                )
        }
    })

    var showPriors = function (resident) {
        return function (event) {
            page.newPage(<PriorList resident={resident} />, "Priors")
        }
    }

    var DescriptionList = React.createClass({
        render: function () {
            var index = -1
            return (
                <div>
                {this.props.descriptionArray.map(function(description) {
                    index += 1
                    return (<p key={"p" + index}> {description} </p>)
                })}
                </div>
            )
        }
    })

    var loadContact = function(resident, contact) {
        var index = resident.contactArray.length
        var key = keyFns.contactKey(resident.streetIndex, resident.addressIndex, resident.residentIndex, index)
        localStorage.setItem(key, serialize.contact(contact))
    }

    var loadResident = function(resident) {
        var key = keyFns.residentKey(resident.streetIndex, resident.addressIndex, resident.residentIndex)
        localStorage.setItem(key, serialize.resident(resident))
    }

    var makeContact = function(resident){
        return {
            resident: resident.id,
            timestamp: new Date(),
            type: "canvass",
            current : true,
            sent: false
        }
    }

    var setContact = function (resident, contact) {
        var contactArray = resident.contactArray

        contactArray.push(contact)

        loadContact(resident, contact)
        loadResident(resident)
    }

    var NewContact = React.createClass({
        makeNewContact: function(name){
            var resident = this.props.resident
            var groupArrayObject = this.groupArrayObject

            return function (event) {
                var contact = makeContact(resident)

                contact.contact = true

                questionArray.forEach(function (question) {
                    var name = question.name
                    contact[name] = getValue(groupArrayObject[name])
                })

                setContact(resident, contact)

                contactCount += 1
                window.history.back()
            }
        },

        groupGroupArrayObject: {},

        render: function () {
            var resident = this.props.resident
            var name = this.props.name

            this.groupArrayObject = {}
            var groupArrayObject = this.groupArrayObject

            return (
                <div>
                    <div>
                        <Name resident={resident} />
                    </div>

                    <div>
                    {questionArray.map(function(question) {
                        {groupArrayObject[question.name] = []}

                        return (
                            <div>
                                <div className="questionTitle"> {question.title}</div>

                                <DescriptionList descriptionArray={question.descriptionArray} />

                                {question.choices.map(function(choice) {
                                    return (
                                        <div className="picker">
                                            <Radio key={choice} label={choice} group={groupArrayObject[question.name]} />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    </div>

                    <div className="newButtons">
                        <div
                                className="button"
                                onClick={this.makeNewContact(name)}>
                            Save
                        </div>
                    </div>
                </div>
            )
        }
    })

    var nextAddress = function (name, addressArray, index) {
        index += 1
        if (index < addressArray.length) {
            page.samePage(<Address name={name} addressArray={addressArray} index={index} />, "Address")
        }
        else {
            window.history.back()
            setTimeout(function() {window.history.back()}, 0)  // At least some phones don't double back
        }
    }

    var Resident = React.createClass({
        handleClick: function (resident, name) {
            return function (event) {
                page.newPage(
                    <NewContact resident={resident} name={name} />,
                    "New Contact"
                )
            }
        },

        render: function () {
            var name = this.props.name
            var resident = this.props.resident
            var contactArray = resident.contactArray

            return (
                <div className="entry">
                    <div className="resident">
                        <Name resident={resident}/>
                    </div>
                    <div className="residentButtons">
                        <div>
                            <div className="button" onClick={showPriors(resident)}>
                                Priors ( {contactArray.length} )
                            </div>
                            <div
                                    className="button"
                                    onClick={this.handleClick(resident, name)}>
                                New
                            </div>
                            <div className="flagContainer">
                                <Flag flag={residentFlag(resident)}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })

    var markNoContact = function(residentArray) {
        residentArray.forEach(function(resident) {
            var contactArray = resident.contactArray
            var length = contactArray.length
            var lastContact = length > 0 ? contactArray[length - 1] : {current:false}

            if (! lastContact.current) {
                var contact = makeContact(resident)
                contact.contact = false

                setContact(resident, contact)
            }
        })
    }

    var Address = React.createClass({
        makeNext: function(name, addressArray, index, residentArray){
            return function(event) {
                markNoContact(residentArray)
                nextAddress(name, addressArray, index)
            }
        },

        render: function () {
            var name = this.props.name
            var addressArray = this.props.addressArray
            var addressIndex = this.props.index
            var residentIndex = -1

            var address = addressArray[addressIndex]
            var residentArray = address.residentArray

            return (
                <div>
                    <div className = "entry">
                        <div className="address"> {address.address + " " + name} </div>
                        <div className="next" onClick={this.makeNext(name, addressArray, addressIndex, residentArray)}>
                        Next
                        </div>
                    </div>
                    <div> {
                        residentArray.map(function (resident) {
                            residentIndex += 1
                            return (
                                <div>
                                    <Resident
                                        key={"r" + residentIndex}
                                        resident = {resident}
                                        name={name}
                                        addressArray={addressArray}
                                        index={addressIndex} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    })

     var DisplayAddress = React.createClass({
        handleClick: function(name, addressArray, index) {
            return function(event) {
                page.newPage(
                    <Address name={name} addressArray={addressArray} index={index} />,
                    "Address"
                )
            }
        },

        render: function () {
            var name = this.props.name
            var index = this.props.index
            var addressArray = this.props.addressArray
            var address = addressArray[index]

            return <div className="entry" onClick={this.handleClick(name, addressArray, index)}>
                <div className="address"> {address.address + " " + name}</div>
                <div className="flagContainer">
                    <Flag flag={addressFlag(address)} />
                </div>
            </div>
        }
    })

    var Street = React.createClass({
        handleClick: function (id, name, up, addressArray) {
            var displayAddressArray = up ? addressArray : addressArray.slice(0).reverse()

            return function (event) {
                var displayAddressList =
                    <div>
                    {displayAddressArray.map(function (address, index, addressArray) {
                        return <DisplayAddress
                            key={"a" + index}
                            name={name}
                            addressArray={addressArray}
                            index={index} />
                    })}
                    </div>
                page.newPage(displayAddressList, "Street")
            }
        },

        render: function () {
            var street = this.props.street
            var up = this.props.up
            var start
            var end

            if (up) {
                start = street.addressArray[0].address
                end = street.addressArray[street.addressArray.length - 1].address
            }
            else {
                start = street.addressArray[street.addressArray.length - 1].address
                end = street.addressArray[0].address
            }

            return (
                <div
                className = "entry"
                onClick = {this.handleClick(street.id, street.name, up, street.addressArray)}>
                    <div className="container">
                        {street.name}
                        {street.even ? " even " : " odd "}
                        from
                        {" " + start + " "}
                        to
                        {" " + end}
                    </div>
                    <div className="flagContainer">
                        <Flag flag={streetFlag(street)} />
                    </div>
                </div>
                )
        }
    })

    var UpDown = React.createClass({
        render: function(){
            var street = this.props.street
            return (
                <div>
                    <Street street={street} up={true} />
                    <Street street={street} up={false} />
                </div>

            )
        }
    })

    var StreetList = React.createClass({
        render: function() {
            var streetArray = poll.streetArray
            var index = -1

            return (
                <div> {
                    streetArray.map(
                        function (street) {
                            index += 1
                            return (<UpDown key={"s" + index} street={street} />)
                        })
                    }
                </div>
            )
        }
    })


    var canvass = function () {
        page.newPage(<StreetList />, "Poll")
    }

    canvass()
})()