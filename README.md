### **README**

---

### **Introduction**

This repository contains an automated test suite using **Cypress** to test the functionalities of the PDF Drive website, specifically focusing on searching for and interacting with "The Hobbit" book. The test suite uses **Page Object Model (POM)** to ensure modularity, maintainability, and reusability of the code.

---

### **Prerequisites**

1. **Node.js**: Ensure you have Node.js installed on your system.
2. **Cypress**: Install Cypress via npm if not already installed:
   ```bash
   npm install cypress --save-dev
   ```
3. **cypress-iframe Plugin**: Install the `cypress-iframe` plugin to handle `iframe` interactions:
   ```bash
   npm install -D cypress-iframe
   ```


### **Tasks Performed**

This repository automates the following tasks:

#### **1. Visit PDF Drive and Search for "The Hobbit"**
- Navigate to the PDF Drive homepage.
- Enter "The Hobbit" in the search bar.
- Verify the search results page is displayed.

#### **2. Apply Filters on the Search Results Page**
- Apply filters for:
  - Pagination: "1-24".
  - Year: "After 2010".
  - Language: "English".
- Select the book "The Hobbit" from the search results.
- Verify the title and URL of the selected book.

#### **3. Verify Book Details and Click Preview**
- Visit the book detail page.
- Verify:
  - The URL matches the expected link.
  - The title of the book is "The Hobbit".
  - The book contains "24" pages.
- Click the "Preview" button to open the book in an iframe.

#### **4. Interact with the Book in the Iframe**
- Open the book in the iframe.
- Wait for the loading modal to disappear.
- Handle retries if the "Try Again" button appears.
- Scroll to the bottom of the book.
- Extract text between specific markers:
  - Start: "about this guide’s authors".
  - End: "RANDOM HOUSE, INC.".
- Verify the eBook title and click the remote URL button.

#### **5. Verify Progress Bar and Download the PDF**
- Wait for the progress bar to exceed 100%.
- Verify the progress bar's value.
- Download the PDF.
- Assert the downloaded file exists in the specified directory.

---

### **How to Run the Tests**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the repository directory:
   ```bash
   cd <repository-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Open Cypress Test Runner:
   ```bash
   npx cypress open
   ```
5. Run the test suite:
   - Select the desired test spec in the Cypress Test Runner.

---
