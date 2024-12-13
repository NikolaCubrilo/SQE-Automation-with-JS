class about {

    constructor(page) {

        this.page = page;

         this.downloadButton = page.locator('a.button-ui-23.btn-focusable[href*="EPAM_Corporate_Overview_Q4_EOY.pdf"][data-gtm-action="click"][download]');

    }

}

module.exports = about;