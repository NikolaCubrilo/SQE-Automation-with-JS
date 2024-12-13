// eShopRegister.js
const { getFormattedDate } = require('/Users/Nikola_Cubrilo/Documents/SQE Automation with JS/utils/utils');

class eShopRegister {
    constructor(page) {
        this.page = page;
        this.firstNameInputField = page.locator('#FirstName');
        this.lastNameInputField = page.locator('#LastName');
        this.emailInputField = page.locator('#Email');
        this.passwordInputField = page.locator('#Password');
        this.confirmPasswordInputField = page.locator('#ConfirmPassword');
        this.registerButton = page.locator('#register-button');
        this.registrationConfirmation = page.locator('.result');
    }

    async getFormattedDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, add 1
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      
        return `${year}${month}${day}${hours}${minutes}`;
      }

      async fillRegistrationForm() {
        const uniqueSuffix = getFormattedDate(); // Call once and use for all fields needing synchronization
        const uniqueName = `TestName${uniqueSuffix}`;
        const uniqueSurname = `TestSurname${uniqueSuffix}`;
        const uniqueEmail = `testemail${uniqueSuffix}@example.com`;
        const password = `Password${uniqueSuffix}`;
    
        await this.firstNameInputField.fill(uniqueName);
        await this.lastNameInputField.fill(uniqueSurname);
        await this.emailInputField.fill(uniqueEmail);
        await this.passwordInputField.fill(password);
        await this.confirmPasswordInputField.fill(password); 
    }

    async submitRegistration() {
        await this.registerButton.click();
    }

    async confirmRegistrationSuccess() {
        return this.registrationConfirmation; 
    }
}

module.exports = eShopRegister;