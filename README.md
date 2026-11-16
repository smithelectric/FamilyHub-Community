# Family Hub Community Edition 1.0
A free, non-commercial meal planning application developed by Thomas Smith.

Family Hub helps households plan weekly meals, generate recipes using AI, and organize grocery shopping.

## Features

- AI-generated weekly meal plans and recipes
- Choose the number of people and meals
- Select preferred ingredients and cuisines
- Set cooking time and budget preferences
- Generate AI food images
- Automatically create a combined shopping list
- Replace individual meals
- Share and synchronize meal plans across devices
- Print recipes
- Integration with Bring! for grocery shopping

## Requirements

- Node.js and npm
- Netlify account
- Netlify CLI
- OpenAI API key for AI features
AI functionality uses the OpenAI API and may incur usage charges.

## Installation

1. Clone this repository.
2. Open the project directory.
3. Run `npm install`.
4. Install Netlify CLI if necessary using `npm install -g netlify-cli`.
5. Create a Netlify site for the project.
6. Configure the following Netlify environment variables:

- `FAMILYHUB_PASSWORD` — a strong password for accessing and modifying shared meal plans.
- `OPENAI_API_KEY` — your own OpenAI API key.
7. Start the local development server using `netlify dev`.
8. Open `http://localhost:8888` in your browser.
Never commit API keys or passwords to GitHub.

## Deployment
Deploy the application to your own Netlify site. Configure the environment variables before deployment.

Each installation should use its own Netlify project and storage.

## License
Copyright © 2026 Thomas Smith. All rights reserved.

Free for personal, educational, and other non-commercial use.

Commercial use requires prior written permission from Thomas Smith.

See [LICENSE](LICENSE) for the complete license terms.

## Disclaimer
Provided without warranty. AI-generated recipes, ingredients, prices, and cooking instructions should be checked before use.
