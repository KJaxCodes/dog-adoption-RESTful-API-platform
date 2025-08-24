
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { expect } = chai;
// const should = require('chai').should();

// const app = require('../app');
// chai.use(chaiHttp);

// // ensure no dogs in DB before testing
// before((done) => {
//     Dog.deleteMany({}, function(err) {});
//     done();
// });

// // ensure no dogs in DB after testing
// after((done) => {
//     Dog.deleteMany({}, function(err) {});
//     done();
// });



// describe('Authenticated Endpoints', () => {
//     let authToken;

//     before((done) => {
//         chai.request(app)
//             .post('/signup')
//             .send({ username: 'testuser', password: 'test123' })
//             .end((err, res) => {
//                 authToken = res.body.token;
//                 console.log(authToken);
//                 done();
//             });
//     });


    // it('should verify that the dogs page renders an object successfully', (done) => {
    //     chai.request(app)
    //         .get('/dogs')
    //         .end((err, res) => {
    //             // res.should.have.status(500);
    //             res.body.should.be.a('object');
    //             done();
    //         });
    // });
// });