class login {

    constructor(page) {

        this.emailInputField = page.locator('.email');
        this.passwordInputField = page.locator('.password');
        this.buttonLogin = page.locator('.button-1.login-button');
    }
}

module.exports = login;