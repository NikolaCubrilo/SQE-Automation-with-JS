class eShopCart {

    constructor(page) {

        this.page = page;

        this.removeCheckbox = page.locator('input[type="checkbox"][name="removefromcart"]');
        this.updateShoppingCart = page.locator('.button-2.update-cart-button');
        this.termsOfService = page.locator('.terms-of-service');
        this.checkout = page.locator('.button-1.checkout-button');
        this.emptyCart = page.locator('div.order-summary-content');


    }

    async getEmptyCartMessage() {
        await this.emptyCart.waitFor();  // Ensure the element is present
        const message = await this.emptyCart.textContent();
        return message.trim();  // Return the trimmed text
    }

}

module.exports = eShopCart;