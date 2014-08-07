/**
 * Created by jrootham on 23/07/14.
 */
(function() {
    "use strict"

    var keyFns = require("./keyFunctions")

    var fetchContactArray = function(residentCount, streetIndex, addressIndex, residentIndex) {
        var result = []
        for (var index = 1 ; index <= residentCount ; index += 1) {
            var key = keyFns.contactKey(streetIndex, addressIndex, residentIndex, index)
            var contactData = JSON.parse(localStorage.getItem(key))
            var contact = {}

            for (var field in contactData) {
                if (contactData.hasOwnProperty(field)) {
                    if (field === "timestamp") {
                        contact.timestamp = new Date(contactData.timestamp)
                    }
                    else {
                        contact[field] = contactData[field]
                    }
                }
            }
            result.push(contact)
        }
        return result
    }

    var fetchResidentArray = function(residentCount, streetIndex, addressIndex) {
        var result = []
        for (var index = 1 ; index <= residentCount ; index += 1) {
            var key = keyFns.residentKey(streetIndex, addressIndex, index)
            var residentData = JSON.parse(localStorage.getItem(key))
            var resident = {
                id: residentData.id,
                firstName: residentData.firstName,
                lastName: residentData.lastName,
                streetIndex: streetIndex,               // Need the indices to create new contact key
                addressIndex: addressIndex,
                residentIndex: index,
                contactArray: fetchContactArray(residentData.contactCount, streetIndex, addressIndex, index)
            }

            result.push(resident)
        }

        return result
    }

    var fetchAddressArray = function(addressCount, streetIndex) {
        var result = []
        for (var index = 1 ; index <= addressCount ; index += 1) {
            var key = keyFns.addressKey(streetIndex, index)
            var addressData = JSON.parse(localStorage.getItem(key))
            var address = {
                id: addressData.id,
                address: addressData.address,
                residentArray: fetchResidentArray(addressData.residentCount, streetIndex, index)
            }

            result.push(address)
        }

        return result
    }

    var fetchStreetArray = function(streetCount) {
        var result = []
        for (var index = 1 ; index <= streetCount ; index += 1) {
            var key = keyFns.streetKey(index)
            var streetData = JSON.parse(localStorage.getItem(key))
            var street = {
                id: streetData.id,
                even: streetData.even,
                name: streetData.name,
                addressArray: fetchAddressArray(streetData.addressCount, index)
            }

            result.push(street)
        }

        return result
    }

    var fetchPoll = function() {
        var key = keyFns.pollKey()
        var pollData = JSON.parse(localStorage.getItem(key))

        return {
            id: pollData.id,
            poll: pollData.poll,
            streetArray: fetchStreetArray(pollData.streetCount)
        }
    }

    var poll= fetchPoll()
    exports.poll = poll
})()
