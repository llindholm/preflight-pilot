# Millwork shop drawing review resource

Route: https://preflight.lhlapps.com/resources/millwork-shop-drawing-review

The HTML page is statically rendered, with native details/summary answer disclosure that also works without JavaScript. All original PDFs are copied byte-for-byte to public/resources/wc27; sha256.json records their hashes. Sources, not model findings, establish the worked review. Twelve quotations were checked against contiguous PDF passages (formatting whitespace normalized). Calculations: current672x840, accepted688x840, current width8mm short; conditional projectionP<=35mm. No repair or release is prescribed.

## Current form and hosting

The current PilotForm uses NEXT_PUBLIC_FORMSPREE_ENDPOINT, not the older Resend/Turnstile flow described in README.md. Existing validation, consent, honeypot, provider-error handling and payload are unchanged. The production environment is already configured. No form fields or remote environment settings changed. Existing GitHub main -> Vercel Production deployment is retained.

## Minimal measurement

The existing preflight:analytics browser CustomEvent adapter emits resource_visit, resource_worked_review_reveal, resource_pdf_click and resource_pilot_click (names only, no personal data/URLs/form answers). There is still NO connected reporting provider or event collector. Events can be inspected with a browser event listener; they do not create a durable analytics dashboard. Advanced attribution is deferred. Standard browser referrer behavior is retained, including the existing strict-origin-when-cross-origin policy; no referral values are stored/copied into the form. PDF without-JavaScript interactions work but do not emit events. Reveal events fire on each opening.

## Verification

Seven automated tests pass: four existing Formspree/validation tests plus download-integrity, event-payload and sitemap checks. Production build and TypeScript checks pass. Installed Chrome checks1440/390/320px, no horizontal overflow, keyboard/native disclosure, no-JavaScript HTML/disclosure, all7PDFs, canonical metadata/social image/sitemap, resource events, landing-page resource link and configured form/client validation. No real application was sent. Perform an owner-approved inbox delivery smoke test if needed; do not submit fabricated leads. Screenshots and browser harness are local temporary QA artifacts.

## Security maintenance

Approved security-only updates: Next16.4.0 ->16.4.3; Zod updated within current4.x range. npm audit reports0vulnerabilities. No hosting configuration changes, new infrastructure, analytics provider, dependencies, database or tracking API.

Manual launch: optionally submit sitemap in the existing search-console account and verify one owner-approved inquiry reaches its destination. Indexing is not guaranteed. Attach an existing analytics listener later only if desired; no provider introduced in this release.
