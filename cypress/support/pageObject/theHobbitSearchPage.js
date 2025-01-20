class TheHobbitSearchPage {
  #exactMatchCheckboxSelector = 'input[type="checkbox"]#ftcb';
  #paginationDropdownTriggerSelector = ".select2-selection--single";
  #paginationOptionTag = "li";
  #yearDropdownTriggerText = "Pub. Year";
  #yearOptionTag = "li";
  #languageDropdownTriggerText = "Any Language";
  #languageOptionTag = "li";
  #theHobbitBookTitleTag = "h2";
  #theHobbitBookTitleText = "The Hobbit";

  get exactMatchCheckbox() {
    return cy.get(this.#exactMatchCheckboxSelector);
  }

  checkExactMatchCheckbox() {
    this.exactMatchCheckbox.should("exist").and("be.visible").check();
  }

  get paginationDropdownTrigger() {
    return cy.get(this.#paginationDropdownTriggerSelector).first();
  }

  clickPaginationDropdownTrigger() {
    this.paginationDropdownTrigger.should("exist").and("be.visible").click();
  }

  selectPaginationOption(option) {
    cy.contains(this.#paginationOptionTag, option)
      .should("exist")
      .and("be.visible")
      .click();
  }

  get yearDropdownTrigger() {
    return cy.contains("span", this.#yearDropdownTriggerText);
  }

  openYearDropdown() {
    this.yearDropdownTrigger.should("exist").and("be.visible").click();
  }

  selectYear(option = "After 2010") {
    cy.contains(this.#yearOptionTag, option)
      .should("exist")
      .and("be.visible")
      .click();
  }

  get languageDropdownTrigger() {
    return cy.contains("span", this.#languageDropdownTriggerText);
  }

  openLanguageDropdown() {
    this.languageDropdownTrigger.should("exist").and("be.visible").click();
  }

  selectLanguage(language = "English") {
    cy.contains(this.#languageOptionTag, language)
      .should("exist")
      .and("be.visible")
      .click();
  }

  get theHobbitBook() {
    return cy.contains(
      this.#theHobbitBookTitleTag,
      this.#theHobbitBookTitleText
    );
  }

  selectTheHobbitBook() {
    this.theHobbitBook.should("exist").and("be.visible").click();
  }

  applyFilters({
    pagination = "1-24",
    year = "After 2010",
    language = "English",
  } = {}) {
    this.checkExactMatchCheckbox();
    this.clickPaginationDropdownTrigger();
    this.selectPaginationOption(pagination);
    this.openYearDropdown();
    this.selectYear(year);
    this.openLanguageDropdown();
    this.selectLanguage(language);
  }
}

export default TheHobbitSearchPage;
