describe("Ad-Blocking Test on Fox News", () => {
  it("should block ads on Fox News", () => {
    cy.viewport("macbook-15");
    cy.visit("https://www.foxnews.com");
    cy.wait(5000);


    cy.get('div[id^="ad-"], div[class*=" ad-"], iframe[src*="ads"]', {
      timeout: 1000,
    }).should("not.exist");

  });
});
