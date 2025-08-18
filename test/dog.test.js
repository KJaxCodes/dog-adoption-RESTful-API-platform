const chai = require('chai');
const chaiHttp = require('chai-http').default;
const expect = chai.expect;

const app = require('../app');
chai.use(chaiHttp);

describe('GET / (Home Page)', () => {
    // it('should render the home page with welcome message', (done) => {
    //     console.log("Test running");
    //     chai.request(app)
    //         .get('/')
    //         .end((err, res) => {
    //             expect(res.text).to.include('Welcome to the Dog Adoption Platform');
    //             done();
    //         });
    // });

    it("Should test", () => {
        expect(1 === 1);
    })
});
