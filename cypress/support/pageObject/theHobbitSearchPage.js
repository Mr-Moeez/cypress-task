class TheHobbitSearchPage {
  get exactMatchCheckbox() {
    return cy.get('input[type="checkbox"]#ftcb');
  }

  checkExactMatchCheckbox() {
    this.exactMatchCheckbox.should("exist").should("be.visible").check();
  }

  get paginationDropdownTrigger() {
    return cy.get(".select2-selection--single").first();
  }

  clickPaginationDropdownTrigger() {
    this.paginationDropdownTrigger.should("exist").should("be.visible").click();
  }

  selectPaginationOption(option) {
    cy.contains("li", option).should("exist").should("be.visible").click();
  }

  get yearDropdownTrigger() {
    return cy.contains("span", "Pub. Year");
  }

  openYearDropdown() {
    this.yearDropdownTrigger.should("exist").should("be.visible").click();
  }

  selectYear(option = "After 2010") {
    cy.contains("li", option).should("exist").should("be.visible").click();
  }

  get languageDropdownTrigger() {
    return cy.contains("span", "Any Language");
  }

  openLanguageDropdown() {
    this.languageDropdownTrigger.should("exist").should("be.visible").click();
  }

  selectLanguage(language = "English") {
    cy.contains("li", language).should("exist").should("be.visible").click();
  }

  get theHobbitBook() {
    return cy.contains("h2", "The Hobbit");
  }

  selectTheHobbitBook() {
    this.theHobbitBook.should("exist").should("be.visible").click();
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
