import "cypress-iframe";
import PDFDrivePage from "../../support/pageObject/pdfDrivePage";
import TheHobbitBookIframe from "../../support/pageObject/theHobbitBookIframe";
import TheHobbitBookPdfPage from "../../support/pageObject/theHobbitBookPdfPage";
import TheHobbitDetailPage from "../../support/pageObject/theHobbitDetailPage";
import TheHobbitSearchPage from "../../support/pageObject/theHobbitSearchPage";

describe("PDF Drive Page Tests", () => {
  const pdfDrivePage = new PDFDrivePage();
  const searchedPage = new TheHobbitSearchPage();
  const detailPage = new TheHobbitDetailPage();
  const bookIframe = new TheHobbitBookIframe();
  const pdfPage = new TheHobbitBookPdfPage();

  before(() => {
    pdfDrivePage.visit();
    pdfDrivePage.enterSearchQuery("The Hobbit");
    pdfDrivePage.clickSearchButton();
    cy.contains("h1", "The Hobbit Books").should("exist");
  });

  it("Should apply filters on the search results page", () => {
    cy.url().should("eq", "https://www.pdfdrive.com/the-hobbit-books.html");
    searchedPage.applyFilters({
      pagination: "1-24",
      year: "After 2010",
      language: "English",
    });
    searchedPage.selectTheHobbitBook();
    cy.contains("h1", "The Hobbit").should("exist");
    cy.url().should("include", "the-hobbit");
  });

  it("Should verify the URL, title, pages length and click on preview button", () => {
    detailPage.visit();
    detailPage.assertUrl("https://www.pdfdrive.com/the-hobbit-e18760817.html");
    detailPage.assertBookTitle("The Hobbit");
    detailPage.assertPagesLength("24");
    detailPage.clickPreviewButton();
  });

  it("Should interect with Iframe and scroll to bottom", () => {
    bookIframe.visit();
    bookIframe.clickPreviewButton();
    bookIframe.assertModalIsOpen();
    bookIframe.handleLoadingProcess()
    bookIframe.scrollToBottomOfContainer();
    bookIframe.extractTextBetweenMarkers(
      "about this guide’s authors",
      "RANDOM HOUSE, INC."
    );
    bookIframe.clickRemoteUrlButton();
    bookIframe.assertEbookTitle("The Hobbit");
  });

  it("Should wait for the progress bar and download the PDF", () => {
    pdfPage.visit();
    pdfPage.waitForProgressBar();
    pdfPage.assertProgressBarAboveHundred();
    pdfPage.downloadPdf();
    pdfPage.assertPdfExistsInDownloads();
  });
});
