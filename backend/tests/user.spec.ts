import request from 'supertest';
import app from '../src/app';

describe('app', () => {
    it('should respond with users route', async () => {
        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        // expect(response.body).toEqual({ message: 'List of users' }); // Assuming you have a route handler for '/users'
    });
});
