class TheHobbitBookPdfPage {
  get progressBar() {
    return cy.get("div.progress-bar");
  }

  get goToPdfButton() {
    return cy.get("a.btn.btn-success.btn-responsive");
  }

  visit() {
    cy.visit("https://www.pdfdrive.com/the-hobbit-d18760817.html");
  }

  waitForProgressBar() {
    const checkWidth = () => {
      this.progressBar.invoke("attr", "style").then((style) => {
        const widthValue = parseInt(style.match(/width:\s?(\d+)%/)[1]);
        if (widthValue > 100) {
          cy.log(`Progress bar width is ${widthValue}%`);
        } else {
          cy.wait(2000);
          checkWidth();
        }
      });
    };

    checkWidth();
  }

  assertProgressBarAboveHundred() {
    this.progressBar
      .should("exist")
      .invoke("attr", "aria-valuenow")
      .then((value) => {
        const progressValue = parseInt(value, 10);
        expect(progressValue).to.be.greaterThan(100);
      });
  }

  downloadPdf() {
    this.goToPdfButton
      .should("exist")
      .invoke("attr", "href")
      .then((pdfUrl) => {
        cy.request({
          url: pdfUrl,
          encoding: "binary",
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.writeFile(
            "cypress/downloads/TheHobbit.pdf",
            response.body,
            "binary"
          );
        });
      });
  }

  assertPdfExistsInDownloads() {
    const filePath = "cypress/downloads/TheHobbit.pdf";
    cy.readFile(filePath, "binary")
      .should("exist")
      .and((content) => {
        expect(content).to.be.ok;
      });
  }
}

export default TheHobbitBookPdfPage;
