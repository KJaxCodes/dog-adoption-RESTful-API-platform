
const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const should = require('chai').should();

const app = require('../app');
chai.use(chaiHttp);


describe('Authenticated Endpoints', () => {

    it('should register + login a user + show any registered dogs', (done) => {

        //Register new user
        let user = {
            email: "test@google.com",
            password: "Test123"
        }
        chai.request(app)
            .post('/signup')
            .send(user)
            .end((err, res) => {

                // Asserts
                expect(res.status).to.be.equal(201);
                expect(res.body).to.be.a('object');
                console.log("user has signed up");

                //Log in the user
                chai.request(app)
                    .post('/login')
                    .send({
                        "email": "test@google.com",
                        "password": "Test123"
                    })
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        let token = res.body.data.token;

                        //Register new dog - name, size, age, description, registeredBy, adoptedBy
                        //let newDog = {
                        // }
                    });
            });
    });
});
