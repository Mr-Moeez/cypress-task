class TheHobbitDetailPage {
  #visitUrl = "https://www.pdfdrive.com/the-hobbit-e18760817.html";
  #bookTitleSelector = ".ebook-title";
  #previewButtonSelector = "#previewButtonMain";
  #pagesSelector = "span"
  #pagesTextKeyword = "Pages";

  visit() {
    cy.visit(this.#visitUrl);
  }

  assertUrl(expectedUrl) {
    cy.url().should("eq", expectedUrl);
  }

  get bookTitle() {
    return cy.get(this.#bookTitleSelector);
  }

  assertBookTitle(expectedTitle) {
    this.bookTitle
      .should("exist")
      .and("be.visible")
      .and("have.text", expectedTitle);
  }

  get previewButton() {
    return cy.get(this.#previewButtonSelector);
  }

  clickPreviewButton() {
    this.previewButton.should("exist").and("be.visible").click();
  }

  get pagesLength() {
    return cy
      .get(this.#pagesSelector)
      .contains(this.#pagesTextKeyword)
      .should("exist");
  }

  assertPagesLength(length) {
    this.pagesLength.should("contain.text", `${length} Pages`);
  }
}

export default TheHobbitDetailPage;
