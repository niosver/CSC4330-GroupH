const request = require('supertest');
const {app} = require("../dist/app");

describe('Test Report Generation', () => {
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
    it('Regenerate Report', async () => {
        return agent
            .get('/api/reports/regenerate_report')
            .send({
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            });
    });
    it('Retrieve Report', async () => {
        return agent
            .get('/api/reports/get_report')
            .send({
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            });
    });
    it('Login to non-owner account', async () => {
        return agent
            .post('/api/accounts/login')
            .send({
                password: 'password',
                username: 'man1',
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                agent.jar.setCookie(res.headers['set-cookie'][0]);
            });
    });
    it('Retrieve Report', async () => {
        return agent
            .get('/api/reports/get_report')
            .send({
            })
            .then((res) => {
                expect(res.statusCode).toEqual(400);
            });
    });

})