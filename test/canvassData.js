/**
 * Created by jrootham on 29/06/14.
 */

(function(){

    "use strict"

    var questionArray = [
        {
            name:"marks",
            title: "Marks",
            descriptionArray:[
                "These marks are for how the voter is planning to vote.",
                "Arbitrary second paragraph"
            ],
            choices: [
                "1",
                "2",
                "3",
                "4",
                "ABF"
            ],
            comments: true
        },
        {
            name: "status",
            title: "Voter Status",
            descriptionArray: [
                "These marks are for the status of the voter"
            ],
            choices: [
                "Deceased",
                "NV",
                "IV"
            ]
        }
    ]

    var poll = {
        id: 1,
        poll: 100,
        streetArray: [
            {
                id:     1,
                name: "Ryerson",
                even: false,
                addressArray: [
                    {
                        id: 1,
                        address: 1,
                        residentArray: []
                    },
                    {
                        id: 2,
                        address: 19,
                        residentArray: []
                    },
                    {
                        id: 3,
                        address: 21,
                        residentArray: []
                    },
                    {
                        id: 4,
                        address: 41,
                        residentArray: []
                    }
                ]
            },
            {
                id: 2,
                name: "Ryerson",
                even: true,
                addressArray: [
                    {
                        id: 5,
                        address: 2,
                        residentArray: []
                    },
                    {
                        id: 6,
                        address: 20,
                        residentArray: []
                    },
                    {
                        id: 7,
                        address: 22,
                        residentArray: []
                    },
                    {
                        id: 8,
                        address: 42,
                        residentArray: []
                    }
                ]
            },
            {
                id: 3,
                name: "Wolesley",
                even: false,
                addressArray: [
                    {
                        id: 9,
                        address: 19,
                        residentArray: []
                    },
                    {
                        id: 10,
                        address: 29,
                        residentArray: []
                    },
                    {
                        id: 11,
                        address: 31,
                        residentArray: []
                    },
                    {
                        id: 12,
                        address: 49,
                        residentArray: []
                    }
                ]
            },
            {
                id: 4,
                name: "Wolesley",
                even: true,
                addressArray: [
                    {
                        id: 13,
                        address : "12",
                        residentArray: []
                    },
                    {
                        id: 14,
                        address : "14",
                        residentArray : []
                    },
                    {
                        id: 15,
                        address : "16",
                        residentArray : []
                    },
                    {
                        id: 16,
                        address : "18",
                        residentArray : []
                    },
                    {
                        id: 17,
                        address : "20",
                        residentArray : []
                    },
                    {
                        id: 18,
                        address : "22",
                        residentArray : []
                    },
                    {
                        id: 19,
                        address : "24",
                        residentArray : []
                    },
                    {
                        id: 20,
                        address : "26",
                        residentArray : []
                    },
                    {
                        id: 21,
                        address : "28",
                        residentArray : []
                    },
                    {
                        id: 22,
                        address : "30",
                        residentArray : [
                            {
                                id: 1,
                                firstName: "John",
                                lastName: "Doe",
                                contactArray: [
                                    {
                                        id: 1,
                                        resident: 1,
                                        timestamp: new Date(2014, 6, 2, 20, 0),
                                        type: "phone",
                                        marks: "2"
                                    },
                                    {
                                        id: 2,
                                        resident: 1,
                                        timestamp: new Date(2014, 6, 3, 14, 0),
                                        type: "petition",
                                        comment: "interested in transit",
                                        flag: true
                                    }
                                ]
                            },
                            {
                                id: 2,
                                firstName: "Jane",
                                lastName: "Doe",
                                contactArray : []
                            }
                        ]

                    },
                    {
                        id: 23,
                        address: "32",
                        residentArray: [
                            {
                                id: 3,
                                firstName: "Jim",
                                lastName: "Smith",
                                contactArray : []
                            }
                        ]
                    },
                    {
                        address: 50,
                        id: 24,
                        residentArray: []
                    }
                ]
            }
        ]
    }

    module.exports.poll = poll
    module.exports.questionArray = questionArray
})()
