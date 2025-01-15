class PDFDrivePage {
  visit() {
    cy.visit("https://www.pdfdrive.com/");
  }

  get bookSearchInput() {
    return cy.get("#q");
  }

  get searchButton() {
    return cy.get('form#search-form button[type="submit"]');
  }

  enterSearchQuery(query) {
    this.bookSearchInput.should("exist").type(query);
  }

  clickSearchButton() {
    this.searchButton.should("exist").click();
  }
}

export default PDFDrivePage;
