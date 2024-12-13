const { test, expect } = require('@playwright/test');
const PetStore = require('../pages/pet store/petStore');
const axios = require('axios');

test.describe('Test public API pet shop store', async () => {

  test('create a new user', async ({ request }) => {
        const response = await request.post('https://petstore.swagger.io/v2/user', {
          data: {
            id: 0,
            username: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser@example.com',
            password: 'password123',
            phone: '1234567890',
            userStatus: 0
          }
        });
        console.log(response.status()); // Log the status code
        console.log(await response.json()); // Log the response body
        expect(response.ok()).toBeTruthy();
      });

  test('login as a user', async ({ request }) => {
    const response = await request.get('https://petstore.swagger.io/v2/user/login', {
      params: {
        username: 'testuser',
        password: 'password123'
      }
    });
    console.log(response.status()); // Log the status code
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('create a list of users', async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/user/createWithList', {
      data: [
        {
          id: 1,
          username: 'user1',
          firstName: 'User',
          lastName: 'One',
          email: 'user1@example.com',
          password: 'password1',
          phone: '1234567891',
          userStatus: 1
        },
        {
          id: 2,
          username: 'user2',
          firstName: 'User',
          lastName: 'Two',
          email: 'user2@example.com',
          password: 'password2',
          phone: '1234567892',
          userStatus: 1
        }
      ]
    });
    console.log(response.status()); // Log the status code
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('log out a user', async ({ request }) => {
    const response = await request.get('https://petstore.swagger.io/v2/user/logout');
    console.log(response.status()); // Log the status code
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('add a new pet', async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet', {
      data: {
        id: 0,
        category: {
          id: 0,
          name: 'dog'
        },
        name: 'Buddy',
        photoUrls: ['http://example.com/photohttps://media.istockphoto.com/id/1482199015/photo/happy-puppy-welsh-corgi-14-weeks-old-dog-winking-panting-and-sitting-isolated-on-white.jpg?s=1024x1024&w=is&k=20&c=XCKHaoM9oG4ST-sLawqYyutywWXkx3DYWb4MKhLUBrI='],
        tags: [
          {
            id: 0,
            name: 'tag1'
          }
        ],
        status: 'available'
      }
      });
      console.log(response.status()); // Log the status code
      console.log(await response.json());
      expect(response.ok()).toBeTruthy();
    });

  test('upload an image for a pet from URL', async ({ page }) => {
    const petStore = new PetStore(page);
    const petId = 123; // Example pet ID
    const imageUrl = 'https://media.istockphoto.com/id/2083899972/photo/cute-springer-spaniel-mix-dog-outdoors-in-nature-forest-in-long-leash-and-harness.jpg?s=2048x2048&w=is&k=20&c=Hq1RcIvtsv5uPYMWMeIiYsuAZvA77mdautIKT8EKp9c='; // URL of the image

    // Attempt to upload the image
    const response = await petStore.uploadPetImage(petId, imageUrl);

    // Check if the request was successful
    expect(response.status).toBe(200);

    // Optionally log the response data for debugging or verification
    console.log('Upload response:', response.data);
  });

  test('update pet name and status', async ({ request }) => {
    const response = await request.put('https://petstore.swagger.io/v2/pet', {
      data: {
        id: 0,
        name: 'Buddy Updated',
        status: 'sold'
      }
    });
    console.log(response.status()); // Log the status code
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
  });

  test('create, retrieve, and delete a pet', async ({ page }) => {
    const petStore = new PetStore(page);
    const petData = {
      category: {
        id: 0,
        name: 'dog'
      },
      name: 'Buddy',
      photoUrls: ['http://example.com/photo'],
      tags: [
        {
          id: 0,
          name: 'tag1'
        }
      ],
      status: 'available'
    };
  
    // Create a pet with a controlled ID
    petData.id = Math.floor(Math.random() * 1000000);  // Ensure the ID is within a typical 32-bit integer range
    const createResponse = await petStore.createPet(petData);
    if (!createResponse.ok()) {
      console.error('Failed to create pet:', await createResponse.text());
      throw new Error('Failed to create pet');
    }
    expect(createResponse.ok()).toBeTruthy();
    const createdPet = await createResponse.json();
    console.log('Created Pet ID:', createdPet.id);
  
    // Verify pet exists
    const getResponse = await petStore.getPet(createdPet.id);
    if (!getResponse.ok()) {
      console.error('Pet not retrievable before deletion:', await getResponse.text());
      throw new Error('Pet not retrievable before deletion');
    }
  
    // Delete the pet
    const deleteResponse = await petStore.deletePet(createdPet.id);
    if (deleteResponse === null || !deleteResponse.ok()) {
      const errorText = deleteResponse ? await deleteResponse.text() : 'No response from delete attempt';
      console.error('Failed to delete pet:', errorText);
      if (deleteResponse && deleteResponse.status() === 404) {
        console.warn('Pet not found, may have already been deleted.');
      } else {
        throw new Error(`Failed to delete pet: ${errorText}`);
      }
    } else {
      expect(deleteResponse.ok()).toBeTruthy();
      console.log('Deletion successful for Pet ID:', createdPet.id);  // Success message for deletion
    }
  });
});