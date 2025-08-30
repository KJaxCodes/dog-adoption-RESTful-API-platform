const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const should = require('chai').should();

const app = require('../app');
chai.use(chaiHttp);

// Test the home page

describe('GET / (Home Page)', () => {
    it('expect the home page to render with welcome message and status 200', (done) => {
        console.log(process.env.NODE_ENV);
        console.log("Test running");
        chai.request(app)
            .get('/')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('Welcome');
                res.should.have.status(200)
                done();
            });
    });
});

// Test the sign up and log in pages

describe('GET / (Sign Up Page)', () => {
    it('sign up page should render form and status 200', (done) => {
        console.log("sign up status 200 test running");
        chai.request(app)
            .get('/signup')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200)
                expect(res.text).to.include('<form');
                done();
            });
    });
});

describe('GET / (Log In Page)', () => {
    it('log in page should render button and status 200', (done) => {
        console.log("log in status 200 test running");
        chai.request(app)
            .get('/login')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200)
                expect(res.text).to.include('button');
                done();
            });
    });
});