
const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const should = require('chai').should();

const app = require('../app');
chai.use(chaiHttp);

const User = require('../models/user');
const Dog = require('../models/dog');


describe("Auth tests", () => {
    // Variable to store the login cookie
    let loginCookie = null;
    // Sample dog data for registration
    let newDog = {
        name: "Chewbarka",
        size: "large",
        age: 3,
        description: "Very hairy dog"
    };
    let dogIdToAdopt = null; // Variable to store the dog ID for adoption tests

    it("should successfully register a user", (done) => {
        chai.request(app)
            .post('/signup')
            .send({ email: "testuser1@mail.com", password: "password" })
            .end((err, res) => {
                if (err) return done(err);
                // console.log("Cookies: ", res.headers['set-cookie']);
                loginCookie = res.headers['set-cookie'][0];
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('user');
                done();
            });
    });

    it("should work with a protected route", (done) => {
        chai.request(app)
            .get('/dogs')
            .set('Cookie', loginCookie) // Set the cookie for authentication
            .end((err, res) => {
                // console.log("Res status", res.statusCode);
                expect(res).to.have.status(200);
                done();
            });
    });

    it("should allow logged in user to register a dog", (done) => {

        chai.request(app)
            .post('/registerDog')
            .set('Cookie', loginCookie) // Set the cookie for authentication
            .send(newDog)
            .end((err, res) => {
               dogIdToAdopt = res.body.dog; // Store the dog ID for adoption tests
                if (err) return done(err);
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                done();
            });
    });

    it("should not allow the user to register a dog with missing fields", (done) => {
        let newDog2 = {
            size: "large",
            age: 3
        };
        chai.request(app)
            .post('/registerDog')
            .set('Cookie', loginCookie) // Set the cookie for authentication
            .send(newDog2)
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('errors');
                expect(res.body.errors).to.have.property('name');
                expect(res.body.errors).to.have.property('description');
                done();
            });
    });

    it("should not allow a user to adopt a dog they registered", (done) => {

        // Adopt the dog registered by the test user
        chai.request(app)
            .post(`/adopt/${dogIdToAdopt}`)
            .set('Cookie', loginCookie) // Set the cookie for authentication
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});

after(async () => {

    // Remove dogs registered by the test user
    const user = await User.findOne({ email: "testuser1@mail.com" });
    if (user) {
        const userId = user._id;
        try {
            await Dog.deleteMany({ registeredBy: userId });
        } catch (err) {
            console.log("Error from deleting dogs: ", err);
            process.exit(1);
        }
    }

    // Clean up the test user from the database
    try {
        await User.deleteOne({ email: "testuser1@mail.com" });
    } catch (err) {
        console.log("Error from deleting user: ", err);
        process.exit(1);
    }
});

