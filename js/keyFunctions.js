/**
 * Created by jrootham on 23/07/14.
 */

(function() {
    "use strict"

    exports.pollKey = function() {
        return "poll"
    }

    exports.streetKey = function(streetIndex) {
        return "street_" + streetIndex
    }

    exports.addressKey = function(streetIndex, addressIndex) {
        return "address_" + streetIndex + "_" + addressIndex
    }

    exports.residentKey = function(streetIndex, addressIndex, residentIndex) {
        return "resident_" + streetIndex + "_" + addressIndex + "_" + residentIndex
    }

    exports.contactKey = function(streetIndex, addressIndex, residentIndex, contactIndex) {
        return "contact_" + streetIndex + "_" + addressIndex + "_" + residentIndex + "_" + contactIndex
    }

})()
