# Family Hub Community Edition 1.0

A free-to-use, non-commercial meal planning application developed by Thomas Smith.

Family Hub helps households create weekly meal plans using AI, organize recipes, and manage grocery shopping.

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
- Transfer shopping lists to the Bring! app

## Requirements

- Node.js and npm (for local development)
- A GitHub account
- A Netlify account
- Your own OpenAI API key for AI functionality
- The Bring! app for shopping list integration

OpenAI API usage may incur charges billed to your own OpenAI account.

## Installation and deployment

1. Fork this GitHub repository to your own GitHub account.
2. Sign in to Netlify.
3. Create a new Netlify project by importing your forked GitHub repository.
4. Use the build configuration provided in `netlify.toml`:
   - Publish directory: `public`
   - Functions directory: `netlify/functions`
5. Configure the required environment variables in your Netlify project's settings.
6. Deploy the project.
7. Open your Netlify website and enter your Family Hub password when prompted.

Each installation should use its own Netlify project, environment variables, and storage.

## Environment variables

Configure these variables in your own Netlify project:

| Variable | Required | Description |
| --- | --- | --- |
| `FAMILYHUB_PASSWORD` | Yes | Strong password protecting shared meal plans and AI endpoints |
| `OPENAI_API_KEY` | Yes, for AI | Your personal OpenAI API key |
| `OPENAI_MODEL` | No | Text generation model; defaults to `gpt-4.1-mini` |
| `OPENAI_IMAGE_MODEL` | No | Image generation model; defaults to `gpt-image-1-mini` |

Keep your passwords and API keys private. Never commit them to GitHub or expose them in client-side JavaScript.

## Local development

Clone your repository and open its project directory.

Install dependencies:

```bash
npm install
```

Install the Netlify CLI:

```bash
npm install -g netlify-cli
```

Link your local project to your own Netlify project:

```bash
netlify link
```

Configure your environment variables for local development using Netlify's supported environment settings.

Start the development server:

```bash
netlify dev
```

Open `http://localhost:8888` in your browser.

The `FAMILYHUB_PASSWORD` variable must also be available in the local development context when using Netlify CLI.

## Bring! shopping list integration

Family Hub can automatically transfer the generated grocery shopping list to the Bring! app.

When the user selects the Bring! integration, Family Hub opens the Bring! app with the shopping list.

If the installed Bring! version needs updating, the user may be redirected to the App Store.

No Bring! API key is required.

## Shared meal plans

Family Hub uses Netlify Blobs to store and synchronize shared meal plans.

Devices using the same Family Hub installation can access the shared meal plan using the configured password.

The shared meal plan endpoints require password authentication for reading and modifying data.

Each independent Netlify installation should have its own storage.

## Security

- Use a strong, unique `FAMILYHUB_PASSWORD`.
- Keep your OpenAI API key private.
- Never commit `.env` files or other credentials.
- Do not share your Netlify environment variables.
- Keep dependencies and your Netlify deployment updated.
- Be aware that users sharing the same Family Hub password can access the same shared meal plan.

## License

Copyright © 2026 Thomas Smith. All rights reserved.

Free for personal, educational, and other non-commercial use.

Commercial use requires prior written permission from Thomas Smith.

See [LICENSE](LICENSE) for the complete license terms.

## Disclaimer

This software is provided without warranty.

AI-generated recipes, ingredients, prices, and cooking instructions should be checked before use. Users are responsible for reviewing food safety, allergies, and dietary requirements.
