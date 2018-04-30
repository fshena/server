require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const models = require('../src/model/index');
const should = chai.should();

chai.use(chaiHttp);

const userRecord = {
    username: "Ara85",
    first_name: "Halvorson",
    last_name: "Waelchi",
    email: "Doug_Blick@hotmail.com",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/to_soham/128.jpg",
    password: "$2a$10$EPvyv8vJAyiH0m.xNpbzXetvGG9xweQWfHiJvYyvU6pt.8LpwwNuC",
    roleId: 0,
    isActive: 1
};

describe('User', () => {
    beforeEach(async () => {
        await models.User.sync({force: true});
        models.User.create(userRecord);
    });

    describe('GET /users', () => {
        it('it should return an array of User objects', done => {
            chai.request(server)
                .get('/users')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.length(1);
                    res.body[0].should.be.an('object');
                    done();
                });
        });

        it('it should return an array of User objects with fields: name, telephone', done => {
            chai.request(server)
                .get('/users?fields=firstName,email')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.be.an('object').that.has.all.keys('firstName', 'email');
                    done();
                });
        });

        it('it should return 400 when the requested fields are wrong', done => {
            chai.request(server)
                .get('/users?fields=name,doesNotExist')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('GET /users/:id', () => {
        it('it should return a User object', done => {
            chai.request(server)
                .get('/users/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        });

        it('it should return a User object with fields: id, address.street, address.number', done => {
            chai.request(server)
                .get('/users/1?fields=id,username,email')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object').that.has.all.keys('id', 'username', 'email');
                    done();
                });
        });

        it('it should return 400 when the requested fields are wrong', done => {
            chai.request(server)
                .get('/users/1?fields=name,doesNotExist')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('POST /users', () => {
        it('it should create a User record and return its link', done => {
            const userRecord = {
                username: "FlorianShena",
                firstName: "Florian",
                lastName: "Shena",
                email: "florian.shena@gmail.com",
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/to_soham/128.jpg",
                password: "$2a$10$EPvyv8vJAyiH0m.xNpbzXetvGG9xweQWfHiJvYyvU6pt.8LpwwNuC",
                roleId: 0,
                isActive: 1
            };
            chai.request(server)
                .post('/users')
                .set('Authorization', process.env.TEST_TOKEN)
                .set('content-type', 'application/json')
                .send(userRecord)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.have.header('content-location');
                    done();
                });
        });
    });

    describe('PUT /users/:id', () => {
        it('it should replace a User record with a new one', done => {
            const userRecord = {
                username: "florianshena123",
                firstName: "Andreas",
                lastName: "Shena",
                email: "andreas.shena12@gmail.com",
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/to_soham/128.jpg",
                password: "$2a$10$EPvyv8vJAyiH0m.xNpbzXetvGG9xweQWfHiJvYyvU6pt.8LpwwNuC",
                roleId: 0,
                isActive: 1
            };
            chai.request(server)
                .put('/users/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .set('content-type', 'application/json')
                .send(userRecord)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

    describe('PATCH /users/:id', () => {
        it('it should update a User record field value', done => {
            const patch =  {
                "op": "update",
                "path": "email",
                "value": "company@gmail.com"
            };
            chai.request(server)
                .patch('/users/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .send(patch)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

    describe('DELETE /users/:id', () => {
        it('it should delete a User record', done => {
            chai.request(server)
                .delete('/users/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});
