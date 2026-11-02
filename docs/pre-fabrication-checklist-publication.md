# Pre-fabrication checklist publication

Publication approved as Groundstate’s suggested educational resource, not a practitioner-validated standard.

Production route: https://preflight.lhlapps.com/resources/millwork-pre-fabrication-review-checklist

## Content and files

- New static page and scoped CSS under app/resources/millwork-pre-fabrication-review-checklist/. All implementation-only banners/questions removed; index/follow metadata and canonical retained.
- Shared content: lib/pre-fabrication-checklist.json. Checklist prompts, review meanings, worksheet fields, original technical example and educational/non-authorization qualifications preserved.
- Public PDFs and SHA256 manifest: public/resources/pre-fabrication-review/. Checklist2pages, blank worksheet1page, completed fictional example2pages. Per-questionR/F/N headers and three handwriting lines in calculation/finding/open-question fields retained.
- Reproducible local generator and integrity verifier in scripts/build-checklist-pdfs.py and scripts/verify-checklist-pdfs.py. Existing bundled Python with reportlab/pypdf/pdfplumber and macOS Arial fonts is used; no app dependency added.
- Contextual links added near the homepage worked-example callout and before the WC27 pilot invitation. Existing links and technical content retained. Sitemap includes the new route.

## Source treatment

The final attempt to retrieve AWI’s general-requirements page timed out. The specific unverified §3.1(e) reference and link were removed from published HTML and PDF. Verified S1/S2 links remain separate from Groundstate’s suggested method. No substitute standards language was invented. Applicability continues to depend on project arrangements, and no universal PM-release requirement is asserted.

## Verification before release

- Existing7tests, TypeScript check and production build passed.
- PDF verifier passed: all21prompts/notes, all worksheet fields, all18completed entries, original source hashes/sections, page bounds and current PDF hashes.
- All5PDFpages rendered and visually inspected; no draft-only labels or glyph/clipping problems.
- Local browser confirmed static seven-section page, index/follow, canonical, responsive desktop/mobile layout, and ungated download links.
- Production verification follows deployment: all three resources, navigation, downloaded PDF hashes, canonical/indexability and sitemap.

No paid models, original benchmark changes, form submissions or new analytics instrumentation were used. Form, security settings, original records, dependencies and deployment configuration are unchanged. Unrelated .DS_Store remains excluded from the commit.
