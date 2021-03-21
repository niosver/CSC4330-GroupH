const request = require('supertest');
const {app} = require("../dist/app");

afterAll(async (done) => {
    await new Promise(resolve => setTimeout(() => resolve(), 1000)); // PLUS THE HACK PROVIDED BY @yss14
    done();
});

describe('Authentication', () => {
    const agent = request.agent(app)
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
    it('Get Signed-in user information',async () => {
        return agent
            .get('/api/customers/me')
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('first_name');
                expect(res.body).toHaveProperty('last_name');
                expect(res.body).toHaveProperty('address');
                expect(res.body).toHaveProperty('email');
                expect(res.body).toHaveProperty('cc_number');
                expect(res.body).toHaveProperty('cc_name');
                expect(res.body).toHaveProperty('billing_address');
            });

    });
    it('Sign out of Account', async () => {
        return agent
            .post('/api/accounts/logout')
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            });
    });
})