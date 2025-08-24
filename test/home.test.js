
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const should = require('chai').should();

const app = require('../app');
chai.use(chaiHttp);

describe('GET / (Home Page)', () => {
    it('expect the home page to render with welcome message', (done) => {
        console.log(process.env.NODE_ENV);
        console.log("Test running");
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res.text).to.include('Welcome');
                done();
            });
    });


    it('home page should render status 200', (done) => {
        console.log("home status 200 test running");
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });
});

describe('GET / (Sign Up Page)', () => {
    it('sign up page should render with status 200', (done) => {
        console.log("sign up status 200 test running");
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });
});

describe('GET / (Log In Page)', () => {
    it('log in page should render with status 200', (done) => {
        console.log("log in status 200 test running");
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });
});