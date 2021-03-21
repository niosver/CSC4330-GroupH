const request = require('supertest');
const {app} = require("../dist/app");

afterAll(async (done) => {
    await new Promise(resolve => setTimeout(() => resolve(), 1000)); // PLUS THE HACK PROVIDED BY @yss14
    done();
});

describe('Authentication', () => {
    const agent = request.agent(app);
    it('Login to account', async () => {
        return agent
            .post('/api/accounts/login')
            .send({
                password: 'password',
                username: 'user1',
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                agent.jar.setCookie(res.headers['set-cookie'][0]);
            });
    });
    it('Rent a bike', () => {
        return agent
            .post('/api/transactions/rent')
            .send({
                dock: 1
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('transaction_id');
            })
    });
    it('Rent a bike 2', () => {
        return agent
            .post('/api/transactions/rent')
            .send({
                dock: 1
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('transaction_id');
            })
    });
    it('Rent a bike 3', () => {
        return agent
            .post('/api/transactions/rent')
            .send({
                dock: 1
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('transaction_id');
            })
    });
    it('Rent a bike from a dock with no bikes', () => {
        return agent
            .post('/api/transactions/rent')
            .send({
                dock: 1
            })
            .then((res) => {
                expect(res.statusCode).toEqual(400);
            })
    });
    it('Rent a bike 4', () => {
        return agent
            .post('/api/transactions/rent')
            .send({
                dock: 2
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('transaction_id');
            })
    });
    it('Get current transactions', () => {
        return agent  
            .get('/api/transactions/active_transactions')
            .send({})
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('transaction_ids');
                let list = res.body.transaction_ids;
                expect(list.length == 4);
            })
    })
    it('Return a bike 1', () => {
        return agent
            .post('/api/transactions/return')
            .send({
                destination_dock: 3,
                transaction_id:1
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('price');
            })
    });
    it('Return a bike 2', () => {
        return agent
            .post('/api/transactions/return')
            .send({
                destination_dock: 3,
                transaction_id:2
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('price');
            })
    });
    it('Return a bike 3', () => {
        return agent
            .post('/api/transactions/return')
            .send({
                destination_dock: 3,
                transaction_id:3
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('price');
            })
    });
    it('Return a bike to a full dock', () => {
        return agent
            .post('/api/transactions/return')
            .send({
                destination_dock: 3,
                transaction_id:4
            })
            .then((res) => {
                expect(res.statusCode).toEqual(400);
            })
    });
    it('Get current transactions', () => {
        return agent  
            .get('/api/transactions/active_transactions')
            .send({})
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('transaction_ids');
                let list = res.body.transaction_ids;
                expect(list.length == 1);
            })
    })
    
    
    

});