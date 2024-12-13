class ComputersPage {
    constructor(page) {
        this.page = page;  // Ensure the page is stored as a class property
        this.desktopsSubgroup = page.locator('h2.title > a[href="/desktops"]');
        this.notebooksSubgroup = page.locator('h2.title > a[href="/notebooks"]');
        this.accessoriesSubgroup = page.locator('h2.title > a[href="/accessories"]');
    }

    async getTextFromLocator(locator) {
        await locator.waitFor({ state: 'visible' });
        const textContent = await locator.textContent();
        return textContent.trim();
    }

    async fetchAllCategoryTexts() {
        const desktopsText = await this.getTextFromLocator(this.desktopsSubgroup);
        const notebooksText = await this.getTextFromLocator(this.notebooksSubgroup);
        const accessoriesText = await this.getTextFromLocator(this.accessoriesSubgroup);
        
        return {
            desktops: desktopsText,
            notebooks: notebooksText,
            accessories: accessoriesText
        };
    }
}


module.exports = ComputersPage;