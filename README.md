# Playwright Companies House

## Overview
This repository demonstrates my functional testing approach, test case design, and use of automation for quality assurance against the Demoblaze test website. 

**URL** - https://www.demoblaze.com

---

## 1. Test Plan

### 1.1 Test Types Prioritised
Given the nature of the application and time constraints, I prioritised the following functional test types:

- **Critical Path Testing**
  - Homepage and product visibility
  - Product navigation
  - Add to cart
  - Checkout and order placement

- **Functional UI Testing**
  - Product detail pages
  - Cart behaviour (adding items, viewing cart contents)
  - Order form submission

- **Edge Case Testing**
  - Attempting checkout with empty cart
  - Empty contact form submission
  - UI inconsistencies

Non-functional testing (performance, security) was not prioritised for this exercise, as the goal was to validate **core user functionality and business-critical flows**.

---

### 1.2 Testing Approach & Rationale
My approach focuses on validating **high-risk, high-impact user journeys** first, specifically the ability for a user to browse products and complete a purchase.

Automation was applied selectively to scenarios that are:
- Stable
- Repeatable
- Business-critical

Exploratory testing was used alongside automation to identify UI inconsistencies and potential defects that are better discovered through human observation.

This balanced approach provides fast regression confidence while still allowing flexibility to uncover issues not easily captured by automated tests.

---

### 1.3 Automation Strategy & Tools
- **Framework:** Playwright
- **Language:** TypeScript

**Reasons for choosing Playwright and TypeScript:**
- Reliable handling of dynamic UI behaviour
- Built-in waiting mechanisms, reducing flaky tests
- Clear and readable syntax
- Well suited for modern end-to-end web testing

---

## 2. Automated Test Cases

The following automated tests were implemented to cover core functionality:

### Test Case 1: Homepage loads and displays products
- **Scenario:** User navigates to the homepage
- **Verification:** Product list is visible
- **Reason for automation:** Basic smoke test providing fast feedback that the homepage of the website loads and is usable

---

### Test Case 2: Navigate to product detail page
- **Scenario:** User selects a product from the homepage
- **Verification:** Product title and price are displayed
- **Reason for automation:** Core browsing functionality and a stable interaction

---

### Test Case 3: Add product to cart
- **Scenario:** User adds a product to the cart
- **Verification:** Product is successfully added
- **Reason for automation:** Business-critical flow impacting the ability to purchase

---

### Test Case 4: Cart displays correct product
- **Scenario:** User views the cart
- **Verification:** Correct product name and price are displayed
- **Reason for automation:** Ensures data consistency between product and cart

---

### Test Case 5: Place order successfully
- **Scenario:** User completes the checkout form and places an order
- **Verification:** Confirmation message/modal is displayed
- **Reason for automation:** End-to-end confidence for the purchase journey

---

## 3. Issues Identified

During testing, the following issues and inconsistencies were observed:

### Issue 1: Cart does not display currency for prices
- **Steps to reproduce:** Add any product to the cart and navigate to the cart page
- **Expected:** Product prices should clearly display a currency symbol (e.g. `$`)
- **Actual:** Prices are displayed without a currency symbol
- **Impact:** This can cause confusion for users and reduce trust during the checkout process, particularly for international users

---

### Issue 2: Contact form submits without feedback or validation
- **Steps to reproduce:** Open the “Contact” modal, leave all fields empty, and click “Send message”
- **Expected:** A clear error message or validation should appear indicating required fields are missing
- **Actual:** A “Thanks for the message!!” alert appears even when the form is empty
- **Impact:** Users receive incorrect feedback, degrading trust in the form and reducing the value of user communication features

---

### Issue 3: Empty cart can proceed to checkout and submit an empty order (invalid order)
- **Steps to reproduce:** Do not add any items to the cart and click “Place Order”
- **Expected:** Checkout should be blocked or prompt user to add items
- **Actual:** The system allows the user to proceed and create an order with $0 total, and the success message shows once the order is submitted
- **Impact:** This breaks the core e-commerce logic and could lead to invalid orders or confusion as it indicates missing validation in the order pipeline

---

## 4. Assumptions & Limitations
- Testing was limited to functional quality due to time constraints
- Automation coverage was intentionally kept small and high-value
- Visual, performance, and security testing were out of scope for this exercise

---

## 5. Running the Tests

### Prerequisites
- Node.js v22+

### Setup
- npm install

### Run
- npm test
