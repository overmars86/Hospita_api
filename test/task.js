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

    /**
     * Test the GET (by id) route
     */
     describe("GET /api/tasks/:id", () => {
        it("It should GET a task by ID", (done) => {
            const testID = 1;
            chai.request(server)                
                .get("/api/v1/tests/" + testID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('completed');
                    res.body.should.have.property('id').eq(1);
                done();
                });
        });
     });


     /**
     * Test the POST route
     */
      describe("POST /api/tasks", () => {
        it("It should POST a new task", (done) => {
            const task = {
                name: "Task 4",
                completed: false
            };
            chai.request(server)                
                .post("/api/v1/tests")
                .send(task)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eq(4);
                    res.body.should.have.property('name').eq("Task 4");
                    res.body.should.have.property('completed').eq(false);
                done();
                });
        });
    });

