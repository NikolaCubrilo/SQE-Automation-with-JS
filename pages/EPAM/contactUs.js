class contactUs {

    constructor(page) {

        this.page = page;

        this.firstName = page.locator('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_first_name-error.validation-tooltip');
        this.lastName = page.locator('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_last_name-error.validation-tooltip');
        this.email = page.locator('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_email-error.validation-tooltip');
        this.phone = page.locator('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_phone-error.validation-tooltip');
        this.submitButton = page.locator('.button-ui-wrapper.button-submit');

        this.firstNameInputField = page.locator('[name="user_first_name"]');
        this.lastNameInputField = page.locator('[name="user_last_name"]');
        this.emailInputField = page.locator('[name="user_email"]');
        this.phoneInputField = page.locator('[name="user_phone"]');
    }
    
    async checkAriaRequired(elements, expect) {
        for (const element of elements) {
          const ariaRequired = await element.getAttribute('aria-required');
          expect(ariaRequired, `aria-required of ${await element.evaluate(el => el.outerHTML)}`).toBe('true');
        }
      }
}

module.exports = contactUs;