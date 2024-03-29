const request = require('supertest');
const {app} = require("../dist/app");

describe('Test Manager Creation', () => {
    const agent = request.agent(app)
    it('Login to owner account', async () => {
        return agent
            .post('/api/accounts/login')
            .send({
                password: 'password',
                username: 'own1',
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                agent.jar.setCookie(res.headers['set-cookie'][0]);
            });
    });
    it('Create Manager', async () => {
        return agent
            .post('/api/accounts/create_manager')
            .send({
                password: 'password',
                username: 'man2',
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            });
    });
    it('Login to manager account', async () => {
        return agent
            .post('/api/accounts/login')
            .send({
                password: 'password',
                username: 'man2',
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            });
    });
})