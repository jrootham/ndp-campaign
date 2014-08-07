/** @jsx React.DOM */

/**
 * Created by jrootham on 06/08/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var React = require("react")

    var localDepends

    var Enter = React.createClass({

        render: function() {
            return (<div>
                <div>
                    <div className="enterLabel">First name</div>
                    <div className="enterInput">
                        <input type="text" id="firstName" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Last name</div>
                    <div className="enterInput">
                        <input type="text" id="lastName" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Address</div>
                    <div className="enterInput">
                        <input type="text" id="address" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Street</div>
                    <div className="enterInput">
                        <input type="text" id="street" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Apartment</div>
                    <div className="enterInput">
                        <input type="text" id="apartment" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Postal code</div>
                    <div className="enterInput">
                        <input type="text" id="postalCode" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Home phone</div>
                    <div className="enterInput">
                        <input type="text" id="homePhone" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Cell phone</div>
                    <div className="enterInput">
                        <input type="text" id="cellPhone" />
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Email</div>
                    <div className="enterInput">
                        <input type="text" id="email" />
                    </div>
                </div>

                <div>
                    <div className="button" onClick={this.submit}>Submit</div>
                </div>

            </div>)
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