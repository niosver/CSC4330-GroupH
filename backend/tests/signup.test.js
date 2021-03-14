const request = require('supertest')
const {app} = require("../dist/app");

afterAll(async (done) => {
    await new Promise(resolve => setTimeout(() => resolve(), 1000)); // PLUS THE HACK PROVIDED BY @yss14
    done();
})

describe('Authentication', () => {
    const agent = request.agent(app)
    it('Create new user account', async () => {
        return agent
            .post('/api/accounts/signup')
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: 'user3@email.com',
                password: 'password',
                birthdate: new Date().toISOString(),
                cc_number: '1234567891011121',
                billing_address:'123 N. Madeup St.',
                address:'123 N. Madeup St.',
                cc_name: 'John Doe',
                username: 'dev3',
            })
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                agent.jar.setCookie(res.headers['set-cookie'][0]);
            });
    });
    it('Get Signed-in user information',async () => {
        agent
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
        agent
            .post('/api/accounts/logout')
            .then((res) => {
                expect(res.statusCode).toEqual(200);
            });
    });
})