class PDFDrivePage {
  #visitUrl = "https://www.pdfdrive.com/";
  #bookSearchInputSelector = "#q";
  #searchFormSelector = "form#search-form";
  #searchButtonSelector = 'button[type="submit"]';

  visit() {
    cy.visit(this.#visitUrl);
  }

  get bookSearchInput() {
    return cy.get(this.#bookSearchInputSelector);
  }

  get searchButton() {
    return cy.get(this.#searchFormSelector).find(this.#searchButtonSelector);
  }

  enterSearchQuery(query) {
    this.bookSearchInput.should("exist").type(query);
  }

  clickSearchButton() {
    this.searchButton.should("exist").click();
  }
}

export default PDFDrivePage;
