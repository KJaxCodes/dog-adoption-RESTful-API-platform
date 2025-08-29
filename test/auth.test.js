
const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const should = require('chai').should();

const app = require('../app');
chai.use(chaiHttp);

const User = require('../models/user');

describe("Auth tests", () => {
    let loginCookie = null;
    it("should successfully register a user", (done) => {
        chai.request(app)
            .post('/signup')
            .send({ email: "testuser1@mail.com", password: "password" })
            .end((err, res) => {
                if (err) return done(err);
                // console.log("sign up test");
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
        let newDog = {
            name: "Chewbarka",
            size: "large",
            age: 3,
            description: "Very hairy dog"
        };
        chai.request(app)
            .post('/registerDog')
            .set('Cookie', loginCookie) // Set the cookie for authentication
            .send(newDog)
            .end((err, res) => {
                if (err) return done(err);
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                done();
            });
    });

    it("should not allow the user to register a dog with missing fields", (done) => {
        let newDog = {
            size: "large",
            age: 3
        };
        chai.request(app)
            .post('/registerDog')
            .set('Cookie', loginCookie) // Set the cookie for authentication
            .send(newDog)
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

    after(async () => {

        // Remove dogs registered by the test user
        const user = await User.findOne({ email: "testuser1@mail.com" });
        if (user) {
            const userId = user._id;
            const Dog = require('../models/dog');
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

});