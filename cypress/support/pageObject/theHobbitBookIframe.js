class TheHobbitBookIframe {
  #expectedLastParagraph =
    "This guide was written in 1981 by Robert Foster. It has been updated and revised by Amy Jurskis to now include the Common Core State Standards. Robert Foster is the author of The Complete Guide to Middle-Earth. Foster has taught Tolkien, science fiction, and fantasy at Rutgers University in New Brunswick, New Jersey. Foster holds a BA in Linguistics from Columbia University and an MA and a PhD in English and Medieval Literature from the University of Pennsylvania. Amy Jurskis is the author of several teaching guides. A former department chair for language arts in a title-one public school in Atlanta, she currently teaches English at Oxbridge Academy of the Palm Beaches in West Palm Beach, Florida.";
  #previewButtonSelector = "#previewButtonMain";
  #loadingModalStateSelector = "#loading-overlay";
  #loadingModalIconSelector = "#previewLoadingIcon";
  #tryReloadingModalButtonText = "Try Again";
  #previewModalSelector = "#previewModalPro";
  #remoteUrlButtonSelector = "#goToFileButtonMemberModal";
  #ebookTitleText = "The Hobbit";
  #viewerIframeSelector = "#viewerPro";
  #scrollableBookContainerSelector = "div.ndfHFb-c4YZDc-cYSp0e-s2gQvd";
  #extractionContainerSelector =
    "div.ndfHFb-c4YZDc-cYSp0e-DARUcf-Df1ZY-bN97Pc-haAclf";

  visit() {
    cy.visit("https://www.pdfdrive.com/the-hobbit-e18760817.html");
  }

  get previewButton() {
    return cy.get(this.#previewButtonSelector);
  }

  clickPreviewButton() {
    this.previewButton.should("exist").and("be.visible").click();
  }

  get loadingModalState() {
    return cy.get(this.#loadingModalStateSelector);
  }

  get loadingModalIcon() {
    return cy.get(this.#loadingModalIconSelector);
  }

  get tryReloadingModalButton() {
    return cy.contains("a", this.#tryReloadingModalButtonText);
  }

  get previewModal() {
    return cy.get(this.#previewModalSelector);
  }

  assertModalIsOpen() {
    this.previewModal.should("exist").and("be.visible");
  }

  handleLoadingProcess() {
    this.loadingModalState.should("be.visible");
    cy.waitUntil(
      () =>
        this.loadingModalState.then(($el) => {
          if ($el.css("display") === "none") {
            return this.tryReloadingModalButton.then(($btn) => {
              if ($btn.is(":visible")) {
                $btn.click();
                cy.wait(2000);
                return false;
              }
              return this.scrollableBookContainer
                .should("be.visible")
                .then(() => true);
            });
          }
          return false;
        }),
      {
        timeout: 20000,
        interval: 500,
      }
    );

    cy.log(
      "Loading process completed, and the scrollable container is visible."
    );
  }

  get remoteUrlButton() {
    return cy.get(this.#remoteUrlButtonSelector);
  }

  clickRemoteUrlButton() {
    this.remoteUrlButton.should("exist").and("be.visible").click();
  }

  get ebookTitle() {
    return cy.contains("a", this.#ebookTitleText);
  }

  assertEbookTitle(expectedTitle) {
    this.ebookTitle.should("have.text", expectedTitle);
  }

  get viewerIframe() {
    return cy.iframe(this.#viewerIframeSelector);
  }

  get scrollableBookContainer() {
    return this.viewerIframe.find(this.#scrollableBookContainerSelector);
  }

  scrollToBottomOfContainer() {
    cy.wait(2000);
    this.scrollableBookContainer.scrollTo("bottom");
  }

  extractTextBetweenMarkers(startText, endText) {
    this.viewerIframe
      .find(this.#extractionContainerSelector)
      .last()
      .should("exist")
      .find("p")
      .should("exist")
      .then(($pTags) => {
        let concatenatedText = "";
        let isWithinRange = false;

        $pTags.each((index, p) => {
          const text = p.innerText.trim();

          if (text === startText) {
            isWithinRange = true;
            return;
          }

          if (text === endText) {
            isWithinRange = false;
            return;
          }

          if (isWithinRange) {
            concatenatedText += `${text} `;
          }
        });

        expect(concatenatedText.trim()).to.equal(
          this.#expectedLastParagraph.trim()
        );
      });
  }
}

export default TheHobbitBookIframe;
