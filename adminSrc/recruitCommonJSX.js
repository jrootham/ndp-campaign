/** @jsx React.DOM */

/**
 * Created by jrootham on 14/08/14.
 */

(function(){
    var React = require("react")

    var EnterRecruit = React.createClass({

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

            </div>)
        }
    })

    var ShowRecruit = React.createClass({

        render: function() {
            return (<div>
                <div>
                    <div className="enterLabel">First name</div>
                    <div className="adminDisplay">
                       {this.props.recruit.firstName}
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Last name</div>
                    <div className="adminDisplay">
                       {this.props.recruit.lastName}
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Address</div>
                    <div className="adminDisplay">
                       {this.props.recruit.address}
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Street</div>
                    <div className="adminDisplay">
                       {this.props.recruit.street}
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Apartment</div>
                    <div className="adminDisplay">
                       {this.props.recruit.apartment}
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Postal code</div>
                    <div className="adminDisplay">
                       {this.props.recruit.postalCode}
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Home phone</div>
                    <div className="adminDisplay">
                       {this.props.recruit.homePhone}
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Cell phone</div>
                    <div className="adminDisplay">
                       {this.props.recruit.cellPhone}
                    </div>
                </div>
                <div>
                    <div className="enterLabel">Email</div>
                    <div className="adminDisplay">
                       {this.props.recruit.email}
                    </div>
                </div>

            </div>)
        }
    })

    exports.EnterRecruit = EnterRecruit
    exports.ShowRecruit = ShowRecruit
})()