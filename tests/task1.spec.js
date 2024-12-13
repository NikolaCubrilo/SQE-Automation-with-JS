const { test, expect } = require('@playwright/test');
const Homepage = require('../pages/EPAM/homepage');
const ContactUs = require('../pages/EPAM/contactUs');
const about = require('../pages/EPAM/about');
const fs = require('fs');
const pdfParse = require('pdf-parse');

test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Check the title is correct', async ({ page }) => {

    await expect(page).toHaveTitle('EPAM | Software Engineering & Product Development Services');
  });

  test('Check the ability to switch Light / Dark mode', async ({page}) => {

    const homePage = new Homepage(page); 
    const bodyDarkMode = homePage.bodyDarkMode;
    const bodyLightMode = homePage.bodyLightMode;

    await expect(bodyDarkMode).toBeVisible();
    await homePage.switchTheme();

    expect(bodyLightMode).toBeVisible();    
});

test('Check that allow to change language to UA', async ({page}) => {

  const homePage = new Homepage(page);
  const locationSelectorButton = homePage.locationSelectorButton;
  const ukraineLanguageButton = homePage.ukraineLanguageButton;
  const languageTextLocator = await homePage.languageText();

  await locationSelectorButton.click();
  await ukraineLanguageButton.click();

  await expect(languageTextLocator).toHaveText('Україна (UA)');
});

test('Check the policies list', async ({page}) => {

  const homePage = new Homepage(page);
  const policiesSection = homePage.policiesSection;
  const investorsLink = homePage.investorsLink;
  const cookiePolicyLink = homePage.cookiePolicyLink;
  const applicantPrivacyNoticeLink = homePage.applicantPrivacyNoticeLink;
  const privacyPolicyLink = homePage.privacyPolicyLink;
  const websiteAccessbiilityLink = homePage.websiteAccessbiilityLink;
  const openSourceLink = homePage.openSourceLink;

  await policiesSection.scrollIntoViewIfNeeded();

  await expect(investorsLink).toBeVisible();
  await expect(cookiePolicyLink).toBeVisible();
  await expect(applicantPrivacyNoticeLink).toBeVisible();
  await expect(privacyPolicyLink).toBeVisible();
  await expect(websiteAccessbiilityLink).toBeVisible();
  await expect(openSourceLink).toBeVisible();
});

test('Check that allow to switch location list by region', async ({page}) => {

  const homePage = new Homepage(page);
  const ourLocations = homePage.ourLocations;
  const tabTexts = ['AMERICAS', 'EMEA', 'APAC'];

  await ourLocations.scrollIntoViewIfNeeded();
  await ourLocations.waitFor({state: 'visible'});


for (const text of tabTexts) {
  const isVisible = await homePage.isVisible(text);
  expect(isVisible, `Tab with text "${text}" should be visible`).toBe(true);
  
  await homePage.clickTab(text);
  const isSelected = await homePage.isSelected(text);
  expect(isSelected, `Tab with text "${text}" should be selected after click`).toBe(true);
}

});

test('Check the search function', async ({ page }) => {

  const homePage = new Homepage(page);
  const searchButton = homePage.searchButton;
  const searchInputField = homePage.searchInputField;
  const findButton = homePage.findButton;
  const searchResults = homePage.searchResults;
  const searchItems = homePage.searchItems;

  await searchButton.click();
  await searchInputField.fill('AI');
  await findButton.click();

  await expect(searchResults, 'search results are not visible').toBeVisible();
  await expect(searchItems, 'search items are not visible').toBeVisible();

});

test('Check forms fields validation', async ({ page }) => {

  const contactUs = new ContactUs(page);

  await page.goto('https://www.epam.com/about/who-we-are/contact');

  const elementsToCheck = [
    contactUs.firstNameInputField,
    contactUs.lastNameInputField,
    contactUs.emailInputField,
    contactUs.phoneInputField
  ];
  await contactUs.checkAriaRequired(elementsToCheck, expect);

});

test('Check that the Company logo on the header lead to the main page', async ({ page }) => {

  await page.goto('https://www.epam.com/about');

  const homePage = new Homepage(page);

  const headerLogo = homePage.headerLogo;

  await headerLogo.click();

  await expect(page.url()).toBe('https://www.epam.com/');
});

test('Check that allows to download report', async ({ browser }) => {

  const context = await browser.newContext({
    acceptDownloads: true
  });

  // Use the new context to create a page
  const page = await context.newPage();

  await page.goto('https://www.epam.com/about');

  const aboutUs = new about(page);
  const downloadButton = aboutUs.downloadButton;

  // Start listening for the download event before clicking the download button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click()
  ]);

  // Get the path where the download is saved
  const path = await download.path();
  
  // Read the PDF file
  const pdfBuffer = fs.readFileSync(path);
  
  // Parse the PDF file to extract text
  const data = await pdfParse(pdfBuffer);
  
  const regex = /EPAM.*Company.*Overview/s;

  // Verify the content (add assertions based on your test requirements)
  expect(data.text).toMatch(regex);

  // Clean up
  await context.close();
});