class Homepage {

     constructor(page) {

        this.page = page;

        this.bodyDarkMode = page.locator('.fonts-loaded.dark-mode');
        this.bodyLightMode = page.locator('.fonts-loaded.light-mode');

        this.locationSelectorButton = page.locator('.location-selector__button');
        this.ukraineLanguageButton = page.locator('.location-selector__link[lang="uk"]');

        this.headerVaaultingContainer = page.locator('.header__vaulting-container');
        this.themeSwitcher = this.headerVaaultingContainer.locator('.theme-switcher');

        this.policiesSection = page.locator('.policies');
        this.investorsLink = this.policiesSection.locator('a.fat-links[href="/investors"]');
        this.cookiePolicyLink = this.policiesSection.locator('a.fat-links[href="/cookie-policy"]');
        this.applicantPrivacyNoticeLink = this.policiesSection.locator('a[href*="showpolicy?type=CommonPrivacyPolicy"]');
        this.privacyPolicyLink = this.policiesSection.locator('a.fat-links[href="/prc-privacy-policy"]');
        this.websiteAccessbiilityLink = this.policiesSection.locator('a.fat-links[href="/web-accessibility-statement"]');
        this.openSourceLink = this.policiesSection.locator('a.fat-links[href="/services/engineering/open-source"]');

        this.ourLocations = page.locator('.js-tabs-controls');
        this.listOfLocations = page.locator('.tabs-23__ul.js-tabs-links-list');

        this.searchButton = page.locator('.header-search__button.header__icon');
        this.searchInputField = page.locator('.header-search__input.frequent-searches__input');
        this.findButton = page.locator('.custom-button.button-text.font-900.gradient-border-button.large-gradient-button.uppercase-text.custom-search-button');
        this.searchResults = page.locator('.search-results__counter');
        this.searchItems = page.locator('.search-results__items');

        this.headerLogo = page.locator('.header__logo-link');
    }

    async switchTheme() {
        await this.themeSwitcher.click();
    }

    async languageText() {
        await this.locationSelectorButton.waitFor({ state: 'visible' });
        await this.locationSelectorButton.waitFor({ hasText: 'Україна (UA)' }, { timeout: 5000 });
        return this.locationSelectorButton;
    }

    getTabLocator(text) {
      return this.page.locator(`div.tabs-23__title.js-tabs-title:has(a.tabs-23__link.js-tabs-link:has-text("${text}"))`);
    }

    getSpecificTabLocator(text) {
      return this.getTabLocator(text).locator('a.tabs-23__link.js-tabs-link');
    }

    async isVisible(text) {
      const tabLocator = this.getTabLocator(text);
      return await tabLocator.isVisible();
    }
    
    async isSelected(text) {
      const specificLocation = this.getSpecificTabLocator(text);
      const isSelected = await specificLocation.getAttribute('aria-selected');
      return isSelected === 'true';
    }
    
    async clickTab(text) {
      const tabLocator = this.getSpecificTabLocator(text);
      await tabLocator.click();
    }

  }

module.exports=Homepage;