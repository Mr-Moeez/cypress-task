class TheHobbitDetailPage {
  
  visit() {
    cy.visit("https://www.pdfdrive.com/the-hobbit-e18760817.html");
  }
  
  assertUrl(expectedUrl) {
    cy.url().should("eq", expectedUrl);
  }

  get bookTitle() {
    return cy.get(".ebook-title");
  }

  assertBookTitle(expectedTitle) {
    this.bookTitle
      .should("exist")
      .and("be.visible")
      .and("have.text", expectedTitle);
  }

  get previewButton() {
    return cy.get("#previewButtonMain");
  }

  clickPreviewButton() {
    this.previewButton.should("exist").and("be.visible").click();
  }

  get pagesLength() {
    return cy.contains("span", "24 Pages").should("exist");
  }

  assertPagesLength(length){
    this.pagesLength.should("contain.text", `${length} Pages`);
  }
}

export default TheHobbitDetailPage;
