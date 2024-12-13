class CheckoutPage {

    constructor(page) {


        this.tearmsOfServiceCheckbox = page.locator('#termsofservice');
        this.continueButtonForBillingAddress = page.locator('input[type="button"][value="Continue"][onclick="Billing.save()"]');
        this.continueButtonForShippingAddress = page.locator('input[type="button"][value="Continue"][onclick="Shipping.save()"]');
        this.continueButtonForShippingMethod = page.locator('input[type="button"][value="Continue"][onclick="ShippingMethod.save()"]');
        this.continueButtonForPaymentMethod = page.locator('input[type="button"][value="Continue"][onclick="PaymentMethod.save()"]');
        this.continueButtonForPaymentInfo = page.locator('input[type="button"][value="Continue"][onclick="PaymentInfo.save()"]');
        this.continueButtonForConfirmOrder = page.locator('input[type="button"][value="Confirm"][onclick="ConfirmOrder.save()"]');


        this.successMessageLocator = page.locator('.order-completed .title strong');
    }

    async getOrderSuccessMessage() {
        await this.successMessageLocator.waitFor();  // Ensure the element is present
        const message = await this.successMessageLocator.textContent();
        return message.trim();  // Return the trimmed text
    }
}

module.exports = CheckoutPage;