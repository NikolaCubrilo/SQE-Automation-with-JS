const { test, expect } = require('@playwright/test');
const eShopHomepage = require('../pages/e-shop/homepage');
const register = require('../pages/e-shop/register')
const login = require('../pages/e-shop/login');
const computersPage = require('../pages/e-shop/computers');
const BooksPage = require('../pages/e-shop/books');
const CartPage = require('../pages/e-shop/cart');
const Checkout = require('../pages/e-shop/checkout');
require('dotenv').config();


test.describe('Test public e-shop site', async () => {

    test.beforeEach (async ({page}) => {
        await page.goto('https://demowebshop.tricentis.com/');
    });

    test('Verify that allows register a User', async ({page}) => {

        const eshopHomePage = new eShopHomepage(page); 
        const registerPage = new register(page);

        const registerButtonHomePage = eshopHomePage.registerButton;



        await registerButtonHomePage.click();

        await registerPage.fillRegistrationForm();

        await registerPage.submitRegistration();

        const registerConfirmation = await registerPage.confirmRegistrationSuccess();

        await expect(registerConfirmation).toBeVisible();
        await expect(registerConfirmation).toHaveText('Your registration completed');

    });

    test('Verify that allows login a User', async ({page}) => {

        const eshopHomePage = new eShopHomepage(page);
        const loginPage = new login(page);

        const loginButton = eshopHomePage.loginButton;

        const emailInputField = loginPage.emailInputField;
        const passwordInputField = loginPage.passwordInputField;
        const loginButtonSignInPage = loginPage.buttonLogin;
        
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        await loginButton.click();
    
        await emailInputField.fill(email);
        await passwordInputField.fill(password);
        await loginButtonSignInPage.click();


        const accountButtonText = await page.textContent(eshopHomePage.accountButton);
        expect(accountButtonText).toContain(email);

    });

test('Verify that Computers group has 3 sub-groups with correct names', async ({page}) => {

        const ComputersPage = new computersPage(page);
        const eshopHomePage = new eShopHomepage(page);

        const computersButton = eshopHomePage.computersTab;

        const desctopsSubgroupButton = ComputersPage.desktopsSubgroup;
        const notebooksSubroupButton = ComputersPage.notebooksSubgroup;
        const accessoriesSubgroupButton = ComputersPage.accessoriesSubgroup;

        await computersButton.click();

        const desktopsText = await ComputersPage.desktopsSubgroup.textContent();
        const notebooksText = await ComputersPage.notebooksSubgroup.textContent();
        const accessoriesText = await ComputersPage.accessoriesSubgroup.textContent();


        const categoryTexts = await ComputersPage.fetchAllCategoryTexts();

        expect(await desctopsSubgroupButton.isVisible()).toBeTruthy();
        expect(await notebooksSubroupButton.isVisible()).toBeTruthy();
        expect(await accessoriesSubgroupButton.isVisible()).toBeTruthy();

        expect(desktopsText.trim()).toBe(categoryTexts.desktops);
        expect(await ComputersPage.desktopsSubgroup.isVisible()).toBeTruthy();

        expect(notebooksText.trim()).toBe(categoryTexts.notebooks);
        expect(await ComputersPage.notebooksSubgroup.isVisible()).toBeTruthy();

        expect(accessoriesText.trim()).toBe(categoryTexts.accessories);
        expect(await ComputersPage.accessoriesSubgroup.isVisible()).toBeTruthy();

    });

    test('Verify that allows sorting items (different options)', async ({page}) => {

        const eshopHomePage = new eShopHomepage(page);
        const booksPage = new BooksPage(page);

        const booksButton = eshopHomePage.booksTab;

        await booksButton.click();

        const dropdownOptions = [
            { label: 'Position', value: 'https://demowebshop.tricentis.com/books?orderby=0' },
            { label: 'Name: A to Z', value: 'https://demowebshop.tricentis.com/books?orderby=5' },
            { label: 'Name: Z to A', value: 'https://demowebshop.tricentis.com/books?orderby=6' },
            { label: 'Price: Low to High', value: 'https://demowebshop.tricentis.com/books?orderby=10' },
            { label: 'Price: High to Low', value: 'https://demowebshop.tricentis.com/books?orderby=11' },
            { label: 'Created on', value: 'https://demowebshop.tricentis.com/books?orderby=15' }
        ];

        for (const { label, value } of dropdownOptions) {
            const dropdown = await booksPage.selectDropdownOption(label);
            await expect(dropdown).toHaveValue(value);
        }
    });

    test('Verify that allows changing number of items on page', async ({page}) => {

        const eshopHomePage = new eShopHomepage(page);
        const booksPage = new BooksPage(page);
        
        const booksButton = eshopHomePage.booksTab;

        await booksButton.click();
    
        const dropdownOptions = [
            { label: '4', value: 'https://demowebshop.tricentis.com/books?pagesize=4' },
            { label: '8', value: 'https://demowebshop.tricentis.com/books?pagesize=8' },
            { label: '12', value: 'https://demowebshop.tricentis.com/books?pagesize=12' },
        ];

        for (const { label, value } of dropdownOptions) {
            const dropdown = await booksPage.selectNumberOfPages(label);
            await expect(dropdown).toHaveValue(value);
        }
    });

    test('Verify that allows adding an item to the Wishlist', async ({page}) => {

        const eshopHomePage = new eShopHomepage(page);
        const booksPage = new BooksPage(page);

        const fictionExBookInWishlist = booksPage.fictionExBookInWishlist;
    
        await eshopHomePage.booksTab.click();
        await booksPage.fictionExBook.click();
        await booksPage.addToWishlist.click();
    
        const wishlistQtyText = await booksPage.getWishlistQuantity('(1)');
        expect(wishlistQtyText).toBe('(1)');

        await booksPage.wishlistButton.click();

        await expect(fictionExBookInWishlist).toHaveText('Fiction EX');
    });

    test('Verify that allows adding an item to the card', async ({page}) => {

        const eshopHomePage = new eShopHomepage(page);
        const booksPage = new BooksPage(page);

        const fictionBookInCart = booksPage.fictionBookInCart;
    
        await eshopHomePage.booksTab.click();
        await booksPage.fictionBook.click();
        await booksPage.addToCartButton.click();
    
        const cartQtyText = await booksPage.getCartQuantity('(1)');
        expect(cartQtyText).toBe('(1)');

        await booksPage.cartButton.click();

        await expect(fictionBookInCart).toHaveText('Fiction');
    });

    test('Verify that allows removing an item from the card', async ({page}) => {

        const eshopHomePage = new eShopHomepage(page);
        const booksPage = new BooksPage(page);
        const cartPage = new CartPage(page);
    
        await eshopHomePage.booksTab.click();
        
        await booksPage.fictionBook.click();

        await booksPage.addToCartButton.click();

        await booksPage.cartButton.click();


        await cartPage.removeCheckbox.click();

        await cartPage.updateShoppingCart.click();


        const emptyCartMessage = await cartPage.getEmptyCartMessage();
        expect(emptyCartMessage).toBe('Your Shopping Cart is empty!');
    });

    test('Verify that allows checkout an item ', async ({page}) => {

        const eshopHomePage = new eShopHomepage(page);
        const loginPage = new login(page);
        const booksPage = new BooksPage(page);
        const cartPage = new CartPage(page);
        const checkout = new Checkout(page);

        const loginButton = eshopHomePage.loginButton;

        const emailInputField = loginPage.emailInputField;
        const passwordInputField = loginPage.passwordInputField;
        const loginButtonSignInPage = loginPage.buttonLogin;
        
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        await loginButton.click();
    
        await emailInputField.fill(email);
        await passwordInputField.fill(password);
        await loginButtonSignInPage.click();
    
        await eshopHomePage.booksTab.click();

        await booksPage.addToCartFirstItem.click();

        await booksPage.cartButton.click();

        await checkout.tearmsOfServiceCheckbox.click();

        await cartPage.checkout.click();

        await checkout.continueButtonForBillingAddress.click();
        await checkout.continueButtonForShippingAddress.click();
        await checkout.continueButtonForShippingMethod.click();
        await checkout.continueButtonForPaymentMethod.click();
        await checkout.continueButtonForPaymentInfo.click();
        await checkout.continueButtonForConfirmOrder.click();

        const orderSuccessMessage = await checkout.getOrderSuccessMessage();
        console.log(`Order Completion Status: ${orderSuccessMessage}`);

        expect(orderSuccessMessage).toBe('Your order has been successfully processed!');

    });

});
