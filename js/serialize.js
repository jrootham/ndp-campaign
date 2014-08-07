/**
 * Created by jrootham on 25/07/14.
 */
(function() {
    "use strict"

    exports.poll = function(poll) {
        return JSON.stringify({
            id: poll.id,
            poll: poll.poll,
            streetCount : poll.streetArray.length
        })
    }

    exports.street = function(street){
        return JSON.stringify( {
            id: street.id,
            even:street.even,
            name: street.name,
            addressCount: street.addressArray.length
        })
    }

    exports.address = function(address) {
        return JSON.stringify({
            id: address.id,
            address: address.address,
            residentCount: address.residentArray.length
        })
    }

    exports.resident = function(resident) {
        return JSON.stringify( {
            id: resident.id,
            firstName: resident.firstName,
            lastName: resident.lastName,
            contactCount: resident.contactArray.length
        })
    }

    exports.contact = function(contact) {
        return JSON.stringify(contact)
    }

})()