# staffinc-challenges

# Technologies and Specification
- Node.js: 14 or higher
- Playwrright: v1.38.0 (or latest compatible version)
- Browsers: Chromium, Firefox, WebKit
- Test Runner: Playwright Test

# Prerequisites
- Node.js

# Install Dependencies
- npm install

# Install Playwright
- npc playwright install

# Project Structure
- tests/: Contains the test scripts, organized into folders for API and web tests.
- playwright.config.ts: The main configuration file for Playwright, where test directories, browsers, and environment settings are defined.
- cucumber.json: to configure cucumber settings.

# Available Scripts
- Run all API tests
  - npm run api
- Run web test
  - npm test

# Troubleshooting
If you encounter issues, please ensure:
- You have the required Node.js version installed.
- Playwright browsers were installed correctly (npx playwright install).
- Dependencies are up-to-date (npm install).
