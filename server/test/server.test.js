let app = require('../server');
let testServer = require('supertest');
const { exampleBadSecret } = require('../constants/warnings');
const { agent } = require('supertest');

describe('Test the user router, root path GET', () => {
    test('when not logged in we get a 403 status', async () => {
        const response = await testServer(app).get('/api/user');
        expect( response.statusCode).toBe(403);
    })

    test('when logged in, we get back the logged in user', async () => {
        let agent = testServer.agent(app);

        const response = await agent.post('/api/user/login')
            .send({username: 'Admiral Greer', password: 'tuna'});
            expect( response.statusCode).toBe(200)
    })
    const userResponse = await agent.get('/api/user/');
    expect( userResponse.statusCode).toBe(200);
    // can check values in the response body that goes back too...
    expect( userResponse.body.username).toBe('Admiral Greer');
})