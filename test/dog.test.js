const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

const app = require('../app');
chai.use(chaiHttp);

describe('GET / (Home Page)', () => {
    it('should render the home page with welcome message', (done) => {
        console.log(process.env.NODE_ENV);
        console.log("Test running");
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res.text).to.include('Welcome');
                done();
            });
    });

    it("Should test", () => {
        expect(1 === 1);
    })
});
