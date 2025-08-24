
const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const should = require('chai').should();

const app = require('../app');
chai.use(chaiHttp);

// ensure no dogs in DB before testing
before((done) => {
    dogs.deleteMany({}, function(err) {});
    done();
});


// ensure no dogs in DB after testing
after((done) => {
    dogs.deleteMany({}, function(err) {});
    done();
});



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
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');

                //Log in the user
                chai.request(app)
                    .post('/login')
                    .send({
                        "email": "test@google.com",
                        "password": "Test123"
                    })
                    .end((err, res) => {
                        expect(res.status).to.be.equal(201);
                        let token = res.body.data.token;

                        //Register new dog - name, size, age, description
                        let newDog = {
                            name: "Test Doggo",
                            size: "small",
                            age: 2,
                            description: "A very cute dog",
                        };

                        chai.request(app)
                            .get('/dogs')
                            .end((err, res) => {
                                if (err) return done(err);
                                res.should.have.status(201)
                                res.body.should.be.a('object');
                                done();
                            });
                    });
            });
    });
});


// let authToken;

// before((done) => {
//     chai.request(app)
//         .post('/signup')
//         .send({ username: 'testuser', password: 'test123' })
//         .end((err, res) => {
//             authToken = res.body.token;
//             console.log(authToken);
//             done();
//         });
// });


// it('should verify that the dogs page renders an object successfully', (done) => {
//     chai.request(app)
//         .get('/dogs')
//         .end((err, res) => {
//             // res.should.have.status(500);
//             res.body.should.be.a('object');
//             done();
//         });
// 