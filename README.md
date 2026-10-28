# SnapTix

SnapTix is a Nuxt web app that uses AI to correct and improve pasted text, emails, code, and other content. The main workflow is simple: paste content, choose **Fix Now**, and review the formatted result. No prompt engineering is required.

The app includes guest and account-based usage, daily correction limits, a dashboard for account and billing settings, and optional Stripe Premium subscriptions.

## Features

- AI-powered corrections through the Mistral Agents API.
- Markdown responses with syntax-highlighted code, plus copy and regenerate actions.
- Guest use without an account, with a daily correction quota.
- Email/password signup and login, authenticated with an HTTP-only cookie.
- Account overview and username/password settings.
- Free and Premium plans, Stripe Checkout, billing portal, invoice history, and subscription status.
- Responsive Nuxt/Vue interface with Tailwind CSS and Nuxt UI.

### Correction limits

Limits are enforced in Redis and expire 24 hours after the first correction in the current quota window.

| Account type | Corrections per 24-hour window |
| --- | ---: |
| Guest | 5 |
| Registered | 15 |
| Premium | 50 |

## Tech stack

- Nuxt 4 and Vue 3, with TypeScript
- Tailwind CSS 4 and Nuxt UI
- MongoDB 7 with Mongoose for accounts and subscription state
- Redis 8 for rate limits and billing overview caching
- Mistral Agents API for corrections
- Stripe for Premium subscriptions and billing
- Docker Compose for a containerized app, MongoDB, and Redis deployment

## Requirements

For local development without Docker, install Node.js 24, npm, MongoDB, and Redis. The Docker image uses Node.js 24.

Mistral credentials are required to use the correction endpoint. Stripe credentials and a configured Stripe price are needed only for subscription and billing flows.

## Getting started

1. Clone the repository and enter the project directory.
2. Create a local .env file using the variables below.
3. Install dependencies and start the Nuxt development server:

~~~bash
npm install
npm run dev
~~~

Open http://localhost:3000.

The default MongoDB URI in nuxt.config.ts is mongodb://admin:admin@localhost:27017/snaptix. Set MONGO_URI to match your local database credentials and authentication configuration. Redis defaults to redis://localhost:6379.

## Environment variables

Set server-side values in .env. Never commit real credentials.

| Variable | Required for | Description |
| --- | --- | --- |
| MISTRAL_API_KEY | AI corrections | API key used by POST /api/fix. |
| MONGO_URI | App data | MongoDB connection string for the snaptix database. |
| REDIS_URL | Rate limits and cache | Redis connection string. Defaults to redis://localhost:6379. |
| JWT_SECRET | Signup and login | Secret used to sign and verify authentication tokens. Use a long, random value. |
| STRIPE_SECRET_KEY | Billing | Stripe secret API key. |
| STRIPE_WEBHOOK_SECRET | Billing webhooks | Signing secret for the Stripe webhook endpoint. |
| STRIPE_PREMIUM_PRICE_ID | Premium checkout | Stripe Price ID for the recurring Premium subscription. |
| MONGO_INITDB_ROOT_USERNAME | Docker Compose MongoDB | Initial MongoDB root username. |
| MONGO_INITDB_ROOT_PASSWORD | Docker Compose MongoDB | Initial MongoDB root password. |

For Docker Compose, point the app at the service names on the Compose network. For example:

~~~dotenv
MONGO_INITDB_ROOT_USERNAME=snaptix
MONGO_INITDB_ROOT_PASSWORD=replace-with-a-strong-password
MONGO_URI=mongodb://snaptix:replace-with-a-strong-password@mongo:27017/snaptix?authSource=admin
REDIS_URL=redis://redis:6379
JWT_SECRET=replace-with-a-long-random-secret
MISTRAL_API_KEY=your-mistral-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-signing-secret
STRIPE_PREMIUM_PRICE_ID=your-stripe-price-id
~~~

If a MongoDB password contains URI-reserved characters, URL-encode them in MONGO_URI. Use Stripe test credentials and a test Price ID for development.

## Docker Compose

The Compose stack starts the Nuxt application, MongoDB, and Redis. Create .env with the Compose values above, then run:

~~~bash
docker compose up --build -d
~~~

The app is published at http://localhost:3003, bound to localhost. MongoDB is published on host port 27018; Redis is available to the app on the internal Compose network. Persistent data and logs use the mongo_data, redis_data, and logs directories.

Stop the services with:

~~~bash
docker compose down
~~~

To remove the database and Redis data as well, remove the Compose volumes separately; this permanently deletes stored data.

The Stripe checkout and customer portal URLs in the current server code use the production domain https://snaptix.net. Update those URLs in the Stripe route handlers if deploying under a different domain.

## Available scripts

| Command | Description |
| --- | --- |
| npm run dev | Start the development server. |
| npm run build | Build the production Nuxt application. |
| npm run preview | Preview the production build locally. |
| npm run generate | Generate a static Nuxt site. |
| npm run lint | Run ESLint. |
| npm run lint:fix | Run ESLint and apply automatic fixes. |

The Dockerfile builds Nuxt and starts the Node server from .output/server/index.mjs. The Nuxt Nitro preset is node-server.

## Application routes

| Route | Purpose |
| --- | --- |
| / | Paste content, request a correction, and copy or regenerate the response. |
| /signup | Create an account. |
| /login | Sign in. |
| /dashboard | View account overview, account settings, and billing. |
| /pricing | Compare Free and Premium plans and manage a subscription. |
| /news | View release notes. |
| /privacy-policy | Privacy policy. |
| /terms-of-use | Terms of use. |
| /subscription-success | Return page for a successful Stripe checkout. |

## API routes

Nuxt server routes are available under /api. Authenticated routes use the auth_token HTTP-only cookie.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | /api/fix | Send content for an AI correction. Applies guest, registered, or Premium quotas. |
| POST | /api/auth/signup | Create an account and sign in. |
| POST | /api/auth/login | Sign in to an existing account. |
| GET | /api/auth/verify | Verify the current authentication cookie. |
| GET | /api/account/info | Get account details and current correction quota. |
| PUT | /api/account/edit | Change the username and/or password after providing the current password. |
| POST | /api/account/logout | Sign out and clear the authentication cookie. |
| GET | /api/stripe/billing/overview | Get payment card summary, upcoming payment, and recent invoices. |
| POST | /api/stripe/billing/portal | Create a Stripe customer portal session. |
| POST | /api/stripe/create-checkout-session | Create a Stripe Premium subscription checkout session. |
| POST | /api/stripe/webhook | Receive Stripe subscription lifecycle events. |
| GET | /api/dynamic | Return the current year and a randomly selected tagline. |

For production billing, configure a Stripe webhook to send events to /api/stripe/webhook. The handler processes checkout.session.completed, customer.subscription.created, customer.subscription.updated, and customer.subscription.deleted.

## Project layout

~~~text
app/
  components/     Shared interface components
  middleware/     Route authentication middleware
  pages/          Nuxt pages
  composables/    Client composables
  assets/         Stylesheets
lib/
  interfaces/     Shared TypeScript interfaces
  utils/          Shared state and validators
server/
  api/            API handlers
  models/         Mongoose models
  plugins/         Server-side database connection
  utils/           Redis, logging, and request helpers
public/            Static assets
~~~

## Privacy and security notes

- Passwords are hashed with Argon2id; authentication tokens are stored in HTTP-only cookies.
- Rate limits are applied to correction requests and signup/login attempts.
- Configure HTTPS in production so secure authentication cookies are transmitted safely.
- Keep database, Redis, Mistral, JWT, and Stripe credentials out of source control.
- Review the privacy policy and your Mistral/Stripe configuration before operating a public deployment.
