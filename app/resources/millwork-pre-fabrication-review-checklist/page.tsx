import type { Metadata } from "next";
import { Fragment } from "react";
import content from "@/lib/pre-fabrication-checklist.json";
import "../millwork-shop-drawing-review/resource.css";
import "./checklist.css";
const canonical = "https://preflight.lhlapps.com/resources/millwork-pre-fabrication-review-checklist";
export const metadata: Metadata = {
  title: "Millwork Pre-Fabrication Review Checklist | Preflight",
  description: "An educational checklist and optional item-review worksheet for tracking millwork drawing changes, supporting decisions, field information and open questions.",
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: { title: "Millwork Pre-Fabrication Review Checklist", description: content.subtitle, url: canonical, type: "article", siteName: "Preflight / Groundstate" },
};
const pdfRoot = "/resources/pre-fabrication-review/";
const pdfs = [
  ["millwork-pre-fabrication-checklist.pdf", "Print the checklist", "2 pages"],
  ["pre-fabrication-item-review.pdf", "Print a blank item-review sheet", "1 page · optional"],
  ["wc27-completed-item-review.pdf", "Print the completed fictional example", "2 pages"],
];
const records = [
  ["R01", "R01_2026-09-02.pdf", "CL-207 Rev B · Reviewed submittal · 02 Sep 2026"],
  ["R02", "R02_2026-09-04.pdf", "IS-27 issue 1 · Supplier interface · 04 Sep 2026"],
  ["R03", "R03_2026-09-07.pdf", "FS-27-07 · Field survey · 07 Sep 2026, 07:40"],
  ["R04", "R04_2026-09-09.pdf", "TD-27-09 · Supplier decision · 09 Sep 2026"],
  ["R05", "R05_2026-09-10.pdf", "CN-27-10 · PM note · 10 Sep 2026, 15:30"],
  ["R06", "R06_2026-09-11.pdf", "FP-27-11 Rev 0 · Production package · 11 Sep 2026, 13:00"],
];
function References({ text }: { text: string }) {
  return text.split(/(R0[1-6])/g).map((part, i) => {
    const record = records.find(([id]) => id === part);
    return record ? <a key={i} href={`/resources/wc27/${record[1]}#page=1`} aria-label={`${part}, original fictional record, page 1`}>{part}</a> : <Fragment key={i}>{part}</Fragment>;
  });
}
export default function Checklist() {
  const worksheet = content.worksheet;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header wrap">
      <a href="/" className="brand" aria-label="Preflight home"><span className="brand-mark" aria-hidden="true">P<span>✓</span></span>preflight<span className="working-label">GROUNDSTATE, INC.</span></a>
      <nav aria-label="Main navigation"><a href="/resources/millwork-shop-drawing-review">The worked example ↗</a></nav>
    </header>
    <main id="main" className="resource checklist-resource wrap">
      <section className="resource-intro">
        <p className="eyebrow">GROUNDSTATE / EDUCATIONAL COORDINATION AID</p>
        <h1>{content.title}</h1><p className="resource-lead">{content.subtitle}</p>
        <p>Before a package goes to production, a reviewer needs to connect what the shop plans to build with the records behind it.</p>
        <p>This checklist helps architectural millwork PMs, drafters, and production coordinators organize that comparison: which detail is current, which comments and changes affect it, what supporting information applies, and what still needs an answer.</p>
        <p>Use it for a defined package, area, or item. It is a focused coordination aid, not a complete fabrication-quality or standards-compliance checklist.</p>
        <p className="checklist-scope">{content.scope}</p>
        <nav className="checklist-jump-links" aria-label="On this page"><a href="#seven-checks">The seven checks</a><a href="#item-review">Optional worksheet</a><a href="#completed-example">Completed fictional example</a><a href="#source-basis">Source basis</a></nav>
      </section>
      <section className="checklist-downloads" aria-labelledby="downloads"><h2 id="downloads">Download the checklist and blank worksheet</h2><p>Free to read, download, and print. No registration required.</p><ul>{pdfs.map(([file,title,size])=><li key={file}><a href={pdfRoot+file} download>{title} ↓</a><span>PDF · {size}</span></li>)}</ul></section>
      <section className="checklist-section" aria-labelledby="use"><p className="eyebrow">HOW TO USE IT</p><h2 id="use">Keep the comparison and the follow-up together.</h2><ol>{content.howTo.map(step=><li key={step}>{step}</li>)}</ol><p>You do not need to duplicate your existing project log. Use the worksheet where it helps make a comparison or unresolved issue clearer.</p></section>
      <section className="checklist-section" aria-labelledby="seven-checks"><p className="eyebrow">THE SEVEN CHECKS</p><h2 id="seven-checks">{content.title}</h2><h3>Before you start</h3><p>{content.before}</p><p>For every question on the printed checklist, tick one box in its R / F / N columns. R means reviewed with reference; F means follow-up needed; N means not applicable—with reason. Record references, follow-up or the N/A reason on the section line or an item-review sheet.</p><p className="checklist-states">{content.checkStates.join(" / ")}</p><p>{content.reviewedMeaning}</p>
        <ol className="checklist-sections">{content.sections.map((section,i)=><li key={section.title}><article aria-labelledby={`check-${i+1}`}><h3 id={`check-${i+1}`}>{i+1}. {section.title}</h3><ul>{section.checks.map(check=><li key={check}><span aria-hidden="true" className="print-box"/>{check}</li>)}</ul><p className="checklist-note">{section.note} {section.sources?.map(id=><a key={id} href={`#${id}`}>[{id}]</a>)}</p></article></li>)}</ol>
        <h3>Finish the review</h3><p>{content.finish}</p><p><strong>{content.completionWarning}</strong></p><p>{content.methodQualification}</p>
      </section>
      <section className="checklist-section" aria-labelledby="item-review"><p className="eyebrow">ONE ISSUE PER SHEET / OPTIONAL</p><h2 id="item-review">{worksheet.title}</h2><p>{worksheet.subtitle}</p><p>Use a sheet when it helps document a discrepancy or unresolved decision. Keep the checklist as a companion page; you do not need to duplicate your project log.</p><a href={pdfRoot+pdfs[1][0]} download>Download the blank printable worksheet ↓</a>
        <details className="worksheet-outline"><summary>See the worksheet fields</summary><div><h3>Review basis</h3><ul>{worksheet.identity.map(t=><li key={t}>{t}</li>)}</ul><h3>Affected item</h3><ul>{worksheet.affected.map(t=><li key={t}>{t}</li>)}</ul><h3>Supporting evidence</h3><ul>{worksheet.evidenceColumns.map(t=><li key={t}>{t}</li>)}<li>{worksheet.calculation}</li></ul><h3>Review status — select all that apply</h3><ul>{worksheet.statuses.map(t=><li key={t}>{t}</li>)}</ul><p>{worksheet.finding}</p><p>{worksheet.openQuestion}</p><h3>Follow-up</h3><ul>{worksheet.followUp.map(t=><li key={t}>{t}</li>)}</ul></div></details>
        <p className="checklist-scope">{worksheet.blankWarning}</p><p>{worksheet.responsibilityWarning}</p>
      </section>
      <section className="checklist-section" aria-labelledby="completed-example"><div className="resource-fiction">FICTIONAL TRAINING EXAMPLE · NOT A CUSTOMER RESULT</div><h2 id="completed-example">{content.example.title}</h2><p>{content.example.fictional}</p><p>In WC27, the current production package changes an access cutout while referencing a supplier decision for a different configuration. The records demonstrate a clear-width conflict. Other questions—including the final configuration and working space—remain unresolved.</p>
        <dl className="completed-worksheet">{content.example.rows.map(([field,entry])=><div key={field}><dt>{field}</dt><dd><References text={entry}/></dd></div>)}</dl><p>{content.example.note}</p>
        <p><a href="/resources/millwork-shop-drawing-review">Work through the fictional shop drawing review →</a></p><p><a href={pdfRoot+pdfs[2][0]} download>Download the completed fictional worksheet ↓</a></p>
      </section>
      <section className="checklist-section" aria-labelledby="source-basis"><p className="eyebrow">ABOUT THIS RESOURCE</p><h2 id="source-basis">Suggested practices, with sources identified separately.</h2><p>Prepared by Groundstate as an educational coordination aid. The checklist structure, review statuses, and worksheet are suggested practices. References to published guidance are identified separately.</p><p>This is not an official AWI document, certification, or permission to fabricate. Project requirements and qualified personnel govern design, verification, and release decisions. The checklist does not replace field verification or technical review.</p>
        <h3>Published guidance and context</h3><dl className="checklist-guidance">{content.guidance.map(g=><div key={g.id} id={g.id}><dt>{g.id} — {g.label}</dt><dd><p>{g.text}</p>{g.links.map(l=><p key={l.url}><a href={l.url}>{l.label} ↗</a></p>)}</dd></div>)}</dl>
        <h3>WC27 original records</h3><p>Every original record below is page 1. Section numbers in the completed example refer to headings in those records. WC27 contains no RFI or Architect’s Supplemental Instruction (ASI).</p><ul className="checklist-source-list">{records.map(([id,file,label])=><li key={id}><a href={`/resources/wc27/${file}#page=1`}>{id} · {label}</a></li>)}</ul>
        <h3>Scope and limits</h3><p>RFI responses, Architect’s Supplemental Instructions and correspondence do not all carry identical authority. Their effect depends on the project’s arrangements. A completed worksheet records review work; it does not resolve an open issue or replace the required decision.</p>
      </section>
      <section className="resource-pilot"><p className="eyebrow">THE COMPLETED-PROJECT RESEARCH PILOT</p><h2>Review a completed job with us.</h2><p>Groundstate is researching comparisons between production packages and supporting project records.</p><p>For the historical-project pilot, we review a completed job and discuss the findings with your team: what was correct, what was missed or wrong, and whether any finding would have mattered before fabrication.</p><p>Participation begins with a conversation. No project upload is required to inquire.</p><a className="button" href="/#pilot">Explore the completed-project research pilot →</a></section>
    </main><footer className="footer wrap"><a href="/" className="footer-brand">preflight<span>A Groundstate research initiative</span></a><a href="/resources/millwork-shop-drawing-review">Fictional worked example →</a></footer>
  </>;
}
