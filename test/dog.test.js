import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('GET / (Home Page)', () => {
    it('should render the home page with welcome message', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res.text).to.include('Welcome to the Dog Adoption Platform');
                done();
            });
    });
});