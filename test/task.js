let chai = require('chai');
let server = require('../server');
let chaiHttp = require('chai-http');


//Asertion Style
chai.should();

chai.use(chaiHttp);

describe('Test API', () => {
    /**
     * Test the get route
     */ 
    describe('Get /api/v1/tests', () => {
        it('It should GET all the tests', (done) => {
            chai.request(server)
            .get('/api/v1/tests')
            .end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eq(3);
                done();
            
        });
    });
});



});