class eShopHomepage {

    constructor(page) {

        this.page = page;

        this.registerButton = page.locator('a.ico-register');
        this.loginButton = page.locator('.ico-login');
        this.computersTab = page.locator('a[href="/computers"]:has-text("Computers")').first();
        this.sortBy = page.locator('.products-orderby');
        this.displayPerPage = page.locator('.products-pagesize');
        this.addToWishlistButton = page.locator('.button-2.add-to-wishlist-button');
        this.addToCartButton = page.locator('.button-1.add-to-cart-button');
        this.cartButton = page.locator('.cart-label');
        this.booksTab = page.locator('a[href="/books"]:has-text("Books")').first();
    }

    get accountButton() {
        return '.account';
      }


}

module.exports = eShopHomepage;