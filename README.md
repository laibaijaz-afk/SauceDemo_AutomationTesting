<<<<<<< HEAD
# SauceDemo E-Commerce Automation Testing Project

## Project Overview
This is an automation testing framework built using **Playwright**, testing
SauceDemo (https://www.saucedemo.com) — an industry-standard e-commerce
demo application widely used for QA automation practice.

## Test Coverage
Total **13 automated test cases**, divided into 3 modules:

### 1. Login Module (`login.spec.js`) - 5 Tests
- Login with valid credentials
- Locked out user error handling
- Invalid password validation
- Empty fields validation
- Partial fields (username only) validation

### 2. Inventory/Products Module (`inventory.spec.js`) - 5 Tests
- Product listing verification
- Sorting functionality (Price Low to High)
- Product detail page navigation
- Add to Cart functionality
- Multiple items cart count verification

### 3. Checkout Module (`checkout.spec.js`) - 3 Tests
- Complete End-to-End checkout flow (Login → Add to Cart → Checkout → Order Confirmation)
- Shipping information validation
- Cart item removal

## Tech Stack
- **Automation Tool:** Playwright
- **Language:** JavaScript
- **Test Runner:** Playwright Test Runner
- **Reporting:** Playwright HTML Reporter

## How to Run

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npx playwright test

# Run tests with visible browser
npx playwright test --headed

# Run specific test file
npx playwright test tests/login.spec.js

# View HTML report
npx playwright show-report
```

## Test Scenario Design Approach
The following testing techniques were applied while designing test cases
for each module:
- **Positive Testing:** Verifying expected behavior with valid data
- **Negative Testing:** Verifying proper error handling with invalid data
  (wrong password, empty fields)
- **Boundary Testing:** Edge cases such as partial form submission
- **End-to-End Testing:** Complete user journey (login through order
  confirmation)

## Project Structure
```
saucedemo-project/
├── playwright.config.js
├── package.json
├── README.md
└── tests/
    ├── login.spec.js
    ├── inventory.spec.js
    └── checkout.spec.js
```
=======
# SauceDemo_AutomationTesting
>>>>>>> 2d592355d17b961fd0462864916b6305683a417d
