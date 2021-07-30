const supertest = require("supertest");
const assert = require('assert');
const chai = require('chai');
const should = chai.should();
const app = require("../index");
const {
    array
} = require("@hapi/joi");

describe('/api/tickets', function () {
    describe("POST", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .post("/api/tickets")

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied!')
        });

        it("it should has status code 422 when Input required", async () => {
            const result = await supertest(app)
                .post("/api/tickets")
                .set({
                    "Authorization": `123456789`
                })
                .send({})

            result.status.should.equal(422)
            result.text.should.be.equal('Input required')
        });

        it("it should has status code 422 when customerName required", async () => {
            const result = await supertest(app)
                .post("/api/tickets")
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "performanceTitle": "The Lord of the Rings",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-05T08:00:00"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"customerName\" is required')
        });

        it("it should has status code 422 when performanceTitle required", async () => {
            const result = await supertest(app)
                .post("/api/tickets")
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "customerName": "aditya 6",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-05T08:00:00"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"performanceTitle\" is required')
        });

        it("it should has status code 422 when performanceTime required", async () => {
            const result = await supertest(app)
                .post("/api/tickets")
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "customerName": "aditya 6",
                    "performanceTitle": "The Lord of the Rings",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-05T08:00:00"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"performanceTime\" is required')
        });

        it("it should has status code 422 when ticketPrice required", async () => {
            const result = await supertest(app)
                .post("/api/tickets")
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "customerName": "aditya 6",
                    "performanceTitle": "The Lord of the Rings",
                    "performanceTime": "60 mins",
                    "creationDate": "2021-07-05T08:00:00"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"ticketPrice\" is required')
        });

        it("it should has status code 422 when creationDate required", async () => {
            const result = await supertest(app)
                .post("/api/tickets")
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "customerName": "aditya 6",
                    "performanceTitle": "The Lord of the Rings",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"creationDate\" is required')
        });

        it("it should has status code 200 when ticket created successfully", async () => {
            const result = await supertest(app)
                .post("/api/tickets")
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "customerName": "aditya 6",
                    "performanceTitle": "The Lord of the Rings",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-05T08:00:00"
                })

            result.status.should.equal(200)
        });

        it("it should has status code 200 when multiple tickets created successfully", async () => {
            const result = await supertest(app)
                .post("/api/tickets")
                .set({ "Authorization": `123456789` })
                .send([{
                    "customerName": "aditya 6",
                    "performanceTitle": "The Lord of the Rings",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-05T08:00:00"
                }, {
                    "customerName": "aditya 7",
                    "performanceTitle": "The Lord of the Rings",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-05T08:00:00"
                }])

            result.status.should.equal(200)                
        });
    });

    describe("GET", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .get("/api/tickets")

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied!')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .get("/api/tickets")
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(200)
        });
    });
});

describe("/api/tickets/:id", () => {
    let ticketObj = {}
    it("it should create test ticket", async () => {
        const result = await supertest(app)
            .post("/api/tickets")
            .set({
                "Authorization": `123456789`
            })
            .send({
                "customerName": "test user",
                "performanceTitle": "test movie",
                "performanceTime": "60 mins",
                "ticketPrice": 150,
                "creationDate": "2021-07-27T08:00:00"
            })

        ticketObj = JSON.parse(JSON.parse(JSON.stringify(result)).text)
    });

    describe("GET", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .get(`/api/tickets/${ticketObj._id}`)

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied!')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .get(`/api/tickets/${ticketObj._id}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(200)
        });
    });

    describe("PUT", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .put(`/api/tickets/${ticketObj._id}`)

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied!')
        });

        it("it should has status code 422 when _id required", async () => {
            const result = await supertest(app)
                .put(`/api/tickets/${ticketObj._id}`)
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "customerName": "test user",
                    "performanceTitle": "test movie",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-27T08:00:00"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"_id\" is required')
        });

        it("it should has status code 422 when customerName required", async () => {
            const result = await supertest(app)
                .put(`/api/tickets/${ticketObj._id}`)
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "_id": ticketObj._id,
                    "performanceTitle": "test movie",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-27T08:00:00"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"customerName\" is required')
        });

        it("it should has status code 422 when performanceTitle required", async () => {
            const result = await supertest(app)
                .put(`/api/tickets/${ticketObj._id}`)
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "_id": ticketObj._id,
                    "customerName": "test user",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-27T08:00:00"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"performanceTitle\" is required')
        });

        it("it should has status code 422 when performanceTime required", async () => {
            const result = await supertest(app)
                .put(`/api/tickets/${ticketObj._id}`)
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "_id": ticketObj._id,
                    "customerName": "test user",
                    "performanceTitle": "test movie",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-27T08:00:00"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"performanceTime\" is required')
        });

        it("it should has status code 422 when ticketPrice required", async () => {
            const result = await supertest(app)
                .put(`/api/tickets/${ticketObj._id}`)
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "_id": ticketObj._id,
                    "customerName": "test user",
                    "performanceTitle": "test movie",
                    "performanceTime": "60 mins",
                    "creationDate": "2021-07-27T08:00:00"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"ticketPrice\" is required')
        });

        it("it should has status code 422 when creationDate required", async () => {
            const result = await supertest(app)
                .put(`/api/tickets/${ticketObj._id}`)
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "_id": ticketObj._id,
                    "customerName": "test user",
                    "performanceTitle": "test movie",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"creationDate\" is required')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .put(`/api/tickets/${ticketObj._id}`)
                .set({
                    "Authorization": `123456789`
                })
                .send({
                    "_id": ticketObj._id,
                    "customerName": "test user",
                    "performanceTitle": "test movie",
                    "performanceTime": "60 mins",
                    "ticketPrice": 150,
                    "creationDate": "2021-07-27T08:00:00"
                })

            result.status.should.equal(200)
        });
    });

    describe("Delete", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .delete(`/api/tickets/${ticketObj._id}`)

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied!')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .delete(`/api/tickets/${ticketObj._id}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(200)
        });
    });
});

describe("GET /api/analytics/earned", () => {
    const fromDate = '2021-07-01T00:00:00.000Z'
    const toDate = '2021-08-31T00:00:00.000Z'
    describe("method aggregation", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/earned?method=aggregation&fromDate=${fromDate}&toDate=${toDate}`)

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied!')
        });

        it("it should has status code 422 when method required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/earned?fromDate=${fromDate}&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"method\" is required')
        });

        it("it should has status code 422 when fromDate required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/earned?method=aggregation&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"fromDate\" is required')
        });

        it("it should has status code 422 when toDate required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/earned?method=aggregation&fromDate=${fromDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"toDate\" is required')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/earned?method=aggregation&fromDate=${fromDate}&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(200)
        });
    });

    describe("method algorithms", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/earned?method=algorithms&fromDate=${fromDate}&toDate=${toDate}`)

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied!')
        });

        it("it should has status code 422 when method required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/earned?fromDate=${fromDate}&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"method\" is required')
        });

        it("it should has status code 422 when fromDate required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/earned?method=algorithms&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"fromDate\" is required')
        });

        it("it should has status code 422 when toDate required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/earned?method=algorithms&fromDate=${fromDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"toDate\" is required')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/earned?method=algorithms&fromDate=${fromDate}&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(200)
        });
    });
});

describe("GET /api/analytics/visited", () => {
    const fromDate = '2021-07-01T00:00:00.000Z'
    const toDate = '2021-08-31T00:00:00.000Z'
    describe("method aggregation", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/visited?method=aggregation&fromDate=${fromDate}&toDate=${toDate}`)

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied!')
        });

        it("it should has status code 422 when method required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/visited?fromDate=${fromDate}&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"method\" is required')
        });

        it("it should has status code 422 when fromDate required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/visited?method=aggregation&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"fromDate\" is required')
        });

        it("it should has status code 422 when toDate required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/visited?method=aggregation&fromDate=${fromDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"toDate\" is required')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/visited?method=aggregation&fromDate=${fromDate}&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(200)
        });
    });

    describe("method algorithms", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/visited?method=algorithms&fromDate=${fromDate}&toDate=${toDate}`)

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied!')
        });

        it("it should has status code 422 when method required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/visited?fromDate=${fromDate}&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"method\" is required')
        });

        it("it should has status code 422 when fromDate required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/visited?method=algorithms&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"fromDate\" is required')
        });

        it("it should has status code 422 when toDate required", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/visited?method=algorithms&fromDate=${fromDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"toDate\" is required')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .get(`/api/analytics/visited?method=algorithms&fromDate=${fromDate}&toDate=${toDate}`)
                .set({
                    "Authorization": `123456789`
                })

            result.status.should.equal(200)
        });
    });
});