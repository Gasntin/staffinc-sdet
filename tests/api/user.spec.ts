import { test, expect } from '@playwright/test';

test('Validate @API @user response for GET https://reqres.in/api/users/2', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2');
  
  // Validate response status
  expect(response.status()).toBe(200);
  
  // Validate response body
  const responseBody = await response.json();
  expect(responseBody.data).toHaveProperty('id', 2);
  expect(responseBody.data).toHaveProperty('email', 'janet.weaver@reqres.in');
  expect(responseBody.data).toHaveProperty('first_name', 'Janet');
  expect(responseBody.data).toHaveProperty('last_name', 'Weaver');
  expect(responseBody.data).toHaveProperty('avatar', 'https://reqres.in/img/faces/2-image.jpg');
  expect(responseBody.support).toHaveProperty('url', 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
  expect(responseBody.support).toHaveProperty('text', 'Tired of writing endless social media content? Let Content Caddy generate it for you.')
});