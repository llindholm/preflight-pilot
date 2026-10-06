# Preflight — historical millwork pilot

A complete single-page Next.js App Router site for recruiting architectural millwork shops. “Preflight” is a working name. There is no product dashboard, fabrication authorization, file upload or authentication.

## Run in VS Code

Use Node.js 22 or 24 LTS. Open this extracted folder in VS Code, then:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The entire page renders without credentials. The application stays visibly unavailable until the public Turnstile key is configured. Once configured, the endpoint also requires all private service settings; it will never pretend an unconnected form succeeded.

On Windows, copy `.env.example` to `.env.local` using File Explorer or `Copy-Item .env.example .env.local` in PowerShell.

## Connect the application form

Applications are sent as plain-text email to the organizer. No database is required. Applicant answers are not written to application logs or browser storage. Resend and your recipient mailbox handle the application contents; Cloudflare handles verification data. These providers have their own retention settings and terms. A provider acceptance is not a guarantee of inbox delivery: check Resend delivery status and your spam folder.

1. Create a [Resend](https://resend.com) account, verify a domain you control using its DNS instructions, and create an API key with sending permission. A dedicated subdomain is fine.
2. Create a managed [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/get-started/) widget. Add your public site's hostname to its allowed hostnames. Use separate test/local settings while developing.
3. Fill in these settings in `.env.local` and in Vercel's Environment Variables:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Private Resend sending key |
| `PILOT_FROM_EMAIL` | `Preflight Pilot <pilot@your-verified-domain.com>` |
| `PILOT_TO_EMAIL` | Application destination; initially `luke@tolivingfree.com`, change if needed |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Private Turnstile secret key |
| `APP_ORIGIN` | Exact origin, e.g. `https://pilot.example.com`, with no trailing slash |

Restart the dev server after changing environment variables. Rebuild/redeploy after changing Vercel settings, particularly the public site key. Never prefix private keys with `NEXT_PUBLIC_` or commit `.env.local`.

For local end-to-end testing, use Cloudflare's documented test site/secret key pair or a separate widget that allows localhost. This implementation also checks the returned hostname and action. Cloudflare dummy keys return a dummy hostname; for a realistic end-to-end test use a localhost-enabled widget. The automated route tests mock provider responses and never send real email.

4. Submit your own application and verify the email arrives. Test replying to it: Reply-To should be the applicant's address. Success is shown only after Resend accepts the message.

The endpoint validates all fields, limits request size, requires consent, checks origin, checks a honeypot, and validates single-use Turnstile tokens on the server. Idempotency uses one UUID per set of answers within a form instance so a retry of the same answers does not send a duplicate email. Editing an answer creates a new submission reference. It is deliberately not an in-memory rate limiter, which would not be reliable across Vercel instances. Turnstile is the baseline abuse control; use Vercel Firewall rate limiting if traffic warrants it.

## Deploy to Vercel

1. Put this folder in a Git repository and push it to GitHub (or another Git provider supported by Vercel).
2. Import the repository in [Vercel](https://vercel.com/new). Use the Next.js framework preset and this folder as Root Directory if nested. Standard commands: `npm run build`, default Next.js output. Use Node.js 22 or 24.
3. Add the environment variables above to Production. Set `APP_ORIGIN` to the exact domain users will open. Allow that hostname in Turnstile. Redirect other public hostnames to that origin if necessary.
4. Deploy. Open the site on that domain and test one real submission using your own details.

For preview deployments, set environment variables separately and allow the corresponding preview hostname in Turnstile. `APP_ORIGIN` must match the exact preview origin. The form intentionally rejects mismatched origins; previews can remain visual-only without credentials.

No Vercel-specific services or configuration files are needed. Do not use a static export: `/api/apply` needs the server runtime. Hosting has not been provisioned or deployed by this deliverable.

## Check the project

```bash
npm run test
npm run typecheck
npm run build
npm start
```

Automated endpoint tests cover field validation, consent, origin, oversize submissions, missing configuration, rejected verification, successful email payloads and provider errors. They mock all external calls.

## Edit the page

- `app/page.tsx`: all landing-page copy and sections; document illustration; four finding types.
- `app/globals.css`: colors, typography, layout and mobile breakpoints.
- `components/PilotForm.tsx`: form fields and loading/error/success states.
- `lib/application.ts`: server/client field validation and email labels.
- `app/api/apply/route.ts`: verification and email delivery.
- `app/layout.tsx`: title, description and metadata.
- `lib/analytics.ts`: optional analytics adapter. No tracking provider is installed. Attach a listener for `preflight:analytics` or replace `track()` with your provider. Never send form answers to analytics. Add pageview tracking in the layout separately if wanted.

The design uses local system font stacks and a small SVG technical illustration, so there are no external image/font dependencies or licensing setup. There are no fake customers, metrics or claims. Project handling terms should be agreed with each participant before collecting historical records; the landing-page form makes no blanket confidentiality promise.

## Before inviting shops

Connect and test the form, confirm the receiving mailbox, and settle how you will receive, redact, retain and delete project records. The page does not specify a fee or promise a turnaround time because neither was established in the brief.

## Source grounding

See `SOURCE_NOTES.md` for the supplied materials that informed the page. Those synthetic source artifacts are not redistributed in this project.
