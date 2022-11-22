import { test, expect } from '@playwright/test';

test.describe('API Testing', () => {
    const baseURL = 'https://reqres.in/api';

    test('Simple API Test - assert response status',async ({ request }) => {
        const response = await request.get(`${baseURL}/user/2`);
        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());
        console.log(responseBody);
    });

    test('Simple API Test - assert invalid endpoint',async ({ request }) => {
        const response = await request.get(`${baseURL}/user/non-existing`);
        expect(response.status()).toBe(404);
    });

    test('GET request - Get user detail',async ({ request }) => {
        const response = await request.get(`${baseURL}/user/1`);
        const responseBody = JSON.parse(await response.text());
        
        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.name).toBe('cerulean');
        expect(responseBody.data.year).toBeTruthy();
    });

    test('POST request - create new user', async ({ request }) => {
        const response = await request.post(`${baseURL}/users`, {
            data: {
                id: 1001,
                name: "mariconsio",
                year: 2001
            }
        });

        const responseBody = JSON.parse(await response.text());
        console.log(responseBody);
        expect(response.status()).toBe(201);
        expect(responseBody.id).toBe(1001);
        expect(responseBody.createdAt).toBeTruthy();
    });

    test('POST request - Login', async ({ request }) => {
       const response = await request.post(`${baseURL}/login`, {
        data: {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }
       });

       const responseBody = JSON.parse( await response.text());
       expect(response.status()).toBe(200);
       expect(responseBody.token).toBeTruthy();
    });

    test('POST request - Login fail', async ({ request }) => {
       const response = await request.post(`${baseURL}/login`, {
        data: {
            email: "eve.holt@reqres.in",
        }
       });

       const responseBody = JSON.parse( await response.text());
       expect(response.status()).toBe(400);
       expect(responseBody.error).toBe('Missing password');
    });

    test('PUT request - update user', async ({ request }) => {
        const response = await request.put(`${baseURL}/users/2`, {
         data: {
            name: "Morbius",
            job: "Morbing time"
         }
        });
 
        const responseBody = JSON.parse( await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.name).toBe('Morbius');
        expect(responseBody.job).toBe('Morbing time');
        expect(responseBody.updatedAt).toBeTruthy();        
     });

     test('DELETE request - delete user', async ({ request }) => {
        const response = await request.delete(`${baseURL}/users/2`);
        expect(response.status()).toBe(204);
     })
});