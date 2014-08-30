/**
 * Created by jrootham on 04/08/14.
 *
 * Copyright ©  2014 Jim Rootham
 */

(function () {
    "use strict"

    var recruit = require("./recruit")
    var admin = require("./admin")

    var routeTable = [
        {
            name: "campaign",
            next: [
                {
                    name: "canvasser",
                    next: [
                        {
                            name: "signup",
                            POST: recruit.signup
                        }
                    ]

                },
                {
                    name: "admin",
                    next: [
                        {
                            name: "enter",
                            POST: admin.enter
                        },
                        {
                            name: "searchRecruits",
                            GET: admin.searchRecruits
                        },
                        {
                            name: "signupRecruit",
                            next: [
                                {
                                    name: "recruitId",
                                    match: {
                                        maxLength: 23,
                                        pattern: "\\d+"
                                    },
                                    POST: admin.signupRecruit
                                }
                            ]
                        },
                        {
                            name: "permissionRoot",
                            GET: admin.permissionRoot
                        }
                    ]
                }
            ]
        }
    ]

    exports.routeTable = routeTable
})()