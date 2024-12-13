class BooksPage {

    constructor(page) {
        this.page = page;
        this.sortByDropdown = page.locator('#products-orderby');
        this.displayNumbersOfPage = page.locator('#products-pagesize');
        this.fictionExBook = page.locator('a[title="Show details for Fiction EX"]')
        this.fictionBook = page.locator('a[title="Show details for Fiction"]');
        this.addToWishlist = page.locator('#add-to-wishlist-button-78');
        this.addToCartButton = page.locator('.button-1.add-to-cart-button');

        this.addToCartFirstItem = page.locator('.button-2.product-box-add-to-cart-button').first();

        this.cartButton = page.locator('.ico-cart').first();
        this.fictionBookInCart = page.locator('td.product a[href="/fiction"]');

        this.wishlistButton = page.locator('.ico-wishlist').first();
        this.wishlistQty = page.locator('.wishlist-qty');

        this.fictionExBookInWishlist = page.locator('td.product a[href="/fiction-ex"]');
    }

    async selectDropdownOption(optionText) {
        // Click on the dropdown to open it
        await this.sortByDropdown.selectOption({ label: optionText });

        return this.sortByDropdown;
    }

    async selectNumberOfPages(optionText) {
        // Click on the dropdown to open it
        await this.displayNumbersOfPage.selectOption({ label: optionText });

        return this.displayNumbersOfPage;
    }

    async getWishlistQuantity(expectedText) {
        const selector = '.wishlist-qty';
        const wishlistQtyLocator = this.page.locator(selector);
        // console.log('Initial wishlist qty:', await wishlistQtyLocator.textContent());
    
        let currentText = '';
        const startTime = Date.now();
        const timeout = 30000; // 30 seconds timeout
        const pollingInterval = 500; // Poll every 500 milliseconds
    
        try {
            // Polling for the expected text content
            while (Date.now() - startTime < timeout) {
                currentText = await wishlistQtyLocator.textContent();
                if (currentText.trim() === expectedText) {
                    break;
                }
                await this.page.waitForTimeout(pollingInterval);
            }
    
            if (currentText.trim() !== expectedText) {
                throw new Error(`Timeout exceeded: Expected text '${expectedText}' was not found within ${timeout}ms.`);
            }
        } catch (error) {
            console.error('Error fetching wishlist quantity:', error);
            throw error; // Rethrow to handle it in the test if necessary
        }
    
        // console.log('Final wishlist qty after update:', currentText);
        return currentText;
    }

    async getCartQuantity(expectedText) {
        const selector = '.cart-qty';
        const wishlistQtyLocator = this.page.locator(selector);
        // console.log('Initial wishlist qty:', await wishlistQtyLocator.textContent());
    
        let currentText = '';
        const startTime = Date.now();
        const timeout = 30000; // 30 seconds timeout
        const pollingInterval = 500; // Poll every 500 milliseconds
    
        try {
            // Polling for the expected text content
            while (Date.now() - startTime < timeout) {
                currentText = await wishlistQtyLocator.textContent();
                if (currentText.trim() === expectedText) {
                    break;
                }
                await this.page.waitForTimeout(pollingInterval);
            }
    
            if (currentText.trim() !== expectedText) {
                throw new Error(`Timeout exceeded: Expected text '${expectedText}' was not found within ${timeout}ms.`);
            }
        } catch (error) {
            console.error('Error fetching wishlist quantity:', error);
            throw error; // Rethrow to handle it in the test if necessary
        }
    
        // console.log('Final wishlist qty after update:', currentText);
        return currentText;
    }
}

module.exports = BooksPage;