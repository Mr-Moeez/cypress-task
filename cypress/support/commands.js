import "cypress-iframe";
import "cypress-wait-until";

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

beforeEach(() => {
  cy.intercept(
    { url: /.*(adservice|doubleclick|googlesyndication|adnxs)/ },
    {
      statusCode: 204,
      body: "",
    }
  );
});

Cypress.on("window:load", (win) => {
  const removeAds = () => {
    const selectors = [
      '[id^="ad-"]',
      '[class*=" ad-"]',
      ".ad",
      '[class*="advert"]',
    ];
    const adElements = win.document.querySelectorAll(selectors.join(", "));
    adElements.forEach((adEl) => adEl.remove());
  };

  removeAds();

  const observer = new MutationObserver(removeAds);
  observer.observe(win.document.body, { childList: true, subtree: true });
});