
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { expect } = chai;
// const should = require('chai').should();

// const app = require('../app');
// chai.use(chaiHttp);

//ensure no dogs in DB before testing
// before((done) => {
//     Dog.deleteMany({}, function(err) {});
//     done();
// });

//ensure no dogs in DB after testing
// after((done) => {
//     Dog.deleteMany({}, function(err) {});
//     done();
// });

// describe('GET / (Home Page)', () => {
// it('expect the home page to render with welcome message', (done) => {
//     console.log(process.env.NODE_ENV);
//     console.log("Test running");
//     chai.request(app)
//         .get('/')
//         .end((err, res) => {
//             expect(res.text).to.include('Welcome');
//             done();
//         });
// });


// it('home page should render status 200', (done) => {
//     console.log("should status 200 test running");
//     chai.request(app)
//         .get('/')
//         .end((err, res) => {
//             res.should.have.status(200)
//             done();
//         });
// });
// });


// describe('GET / (Dogs Page)', () => {
//     it('should verify that the dogs page renders an object successfully', (done) => {
//         chai.request(app)
//             .get('/dogs')
//             .end((err, res) => {
//                 // res.should.have.status(500);
//                 res.body.should.be.a('object');
//                 done();
//             });
//     });
// });