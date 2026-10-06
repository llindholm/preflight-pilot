# Verification

- Production Next.js build passes, including TypeScript checking.
- Five automated endpoint tests pass, with external providers mocked.
- Browser checks at 1440, 390 and 320 CSS pixels: no horizontal overflow.
- Browser check at 390 pixels with doubled text size: no horizontal overflow.
- Primary CTA navigates to the application section.
- Form browser checks: invalid fields are identified; a simulated delivery failure retains answers and displays an error; a retry displays success after simulated acceptance.
- No page errors observed in the layout checks.
- Desktop and mobile first-screen screenshots are included in `previews/`.

No real applicant data was sent and no real email delivery was tested. Real service credentials, hostname configuration and a test delivery to the organizer's mailbox are required before inviting shops. The project has not been deployed to Vercel.
