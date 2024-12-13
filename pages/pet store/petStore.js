const axios = require('axios');
const FormData = require('form-data');
const path = require('path');

class PetStore {
    constructor(page) {
        this.page = page;
        this.baseUrl = 'https://petstore.swagger.io/v2';
    }

    async createPet(petData) {
        const response = await this.page.request.post(`${this.baseUrl}/pet`, { data: petData });
        return response;
    }

    async deletePet(petId) {
        const response = await this.attemptToDeletePet(petId);
        return response;
    }

    async attemptToDeletePet(petId, retries = 3) {
        for (let i = 0; i < retries; i++) {
            const response = await this.page.request.delete(`${this.baseUrl}/pet/${petId}`);
            if (response.ok()) {
                return response; // Successfully deleted
            }
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        return null; // Return null if all retries fail
    }

    async getPet(petId) {
        const response = await this.page.request.get(`${this.baseUrl}/pet/${petId}`);
        return response;
    }

    async uploadPetImage(petId, imageUrl) {
      const formData = new FormData();

      try {
          // Download the image from the URL
          const response = await axios({
              method: 'get',
              url: imageUrl,
              responseType: 'stream'
          });

          // Extract filename from the URL
          const urlObject = new URL(imageUrl);
          const filename = path.basename(urlObject.pathname);

          formData.append('additionalMetadata', 'updated image');
          formData.append('file', response.data, {
              filename: filename,
              contentType: response.headers['content-type']
          });

          // Upload the image
          const uploadResponse = await axios.post(`${this.baseUrl}/pet/${petId}/uploadImage`, formData, {
              headers: {
                  ...formData.getHeaders(),
              }
          });

          return uploadResponse;
      } catch (error) {
          console.error('Error downloading or uploading image:', error.message);
          return {
              status: error.response ? error.response.status : 500,
              data: {
                  message: error.message
              }
          };
      }
  }
}

module.exports = PetStore;