import PilotForm from "@/components/PilotForm";
const statuses = [
  {
    code: "01",
    name: "SUPPORTED",
    className: "supported",
    description:
      "The production package is supported by the governing evidence supplied.",
  },
  {
    code: "02",
    name: "CONFLICT",
    className: "conflict",
    description: "The production package disagrees with the governing evidence.",
  },
  {
    code: "03",
    name: "INSUFFICIENT EVIDENCE",
    className: "insufficient",
    description:
      "The supplied record does not establish whether the production package is valid.",
  },
  {
    code: "04",
    name: "HUMAN DECISION",
    className: "human",
    description:
      "The evidence exists, but the judgment or authority belongs to a person.",
  },
];
function Drawing() {
  return (
    <svg
      className="shop-drawing"
      viewBox="0 0 560 340"
      role="img"
      aria-labelledby="drawing-title drawing-desc"
    >
      <title id="drawing-title">Illustrative millwork elevation</title>
      <desc id="drawing-desc">
        Three base cabinets below open shelving. The toe kick in the production
        package is marked three and a half inches for comparison with the
        approval record. Simulated projects only.
      </desc>
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".07"
            strokeWidth=".6"
          />
        </pattern>
      </defs>
      <rect width="560" height="340" fill="url(#grid)" />
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M90 72h380v222H90zM90 202h380M90 280h380M214 202v78M344 202v78M100 82h360v110H100zM100 120h360M100 155h360M226 82v110M334 82v110" />
        <path
          d="M146 230v20M280 230v20M407 230v20M90 42h380M90 35v25M470 35v25M65 72v222M58 72h22M58 294h22"
          strokeOpacity=".45"
        />
      </g>
      <g fill="currentColor" fontFamily="monospace" fontSize="12">
        <text x="252" y="34">
          144″
        </text>
        <text x="113" y="225">
          LIB-01
        </text>
        <text x="241" y="225">
          LIB-02
        </text>
        <text x="371" y="225">
          LIB-03
        </text>
        <text x="90" y="320">
          A-601 / FRONT ELEVATION
        </text>
        <text x="382" y="320">
          NOT TO SCALE
        </text>
      </g>
      <g stroke="#e9a46a" fill="none" strokeWidth="1.5">
        <rect x="86" y="276" width="388" height="22" strokeDasharray="5 4" />
        <path d="M474 286h43v-45" />
      </g>
      <text x="488" y="230" fill="#e9a46a" fontFamily="monospace" fontSize="13">
        3½″
      </text>
    </svg>
  );
}
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header wrap">
        <a href="#" className="brand" aria-label="Preflight home">
          <span className="brand-mark" aria-hidden="true">
            P<span>✓</span>
          </span>
          preflight<span className="working-label">WORKING NAME</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#approach">The check</a>
          <a href="#pilot">The pilot</a>
          <a className="nav-cta" href="#apply">
            Apply for the pilot
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="line-mark" /> ARCHITECTURAL MILLWORK / COMPLETED PROJECT REVIEW PILOT
            </p>
            <h1>
              Know what’s
              <br />
              approved before
              <br />
              you <span>fabricate.</span>
            </h1>
            <p className="hero-description">
              We're developing a second check before fabrication: compare the production package with approved shop drawings, review comments and documented changes - and flag details that don't agree or still need an answer.
            </p>
            <p className="hero-secondary">
              We're inviting a small number of architectural millwork shops to test it on one completed job.
            </p>
            <a href="#apply" className="button">
              Apply for the Completed Project Review Pilot
            </a>
            <p className="hero-footnote">
              Research-stage system. Completed projects only.
            </p>
          </div>
          <div className="release-sheet">
            <div className="sheet-top">
              <span>PRODUCTION RELEASE REVIEW</span>
              <span>ILLUSTRATIVE / SIMULATED</span>
            </div>
            <Drawing />
            <div className="sheet-finding">
              <div>
                <span className="eyebrow">REVIEW ITEM / TOE KICK</span>
                <p>
                  3½″ in the package.
                  <br />
                  4″ in the approval.
                </p>
              </div>
              <span className="badge conflict">CONFLICT</span>
            </div>
            <div className="sheet-bottom">
              <span>Evidence linked. Decision stays with your shop.</span>
              <span aria-hidden="true">PR / 01</span>
            </div>
          </div>
        </section>
        <div className="scope-strip">
          <div className="wrap">
            <span>ONE COMPLETED PROJECT</span>
            <span>PRIVATE FINDINGS & EVIDENCE</span>
            <span>NO LIVE SYSTEM ACCESS</span>
          </div>
        </div>
        <section className="section wrap problem" id="problem">
          <div>
            <p className="eyebrow">THE RESPONSIBILITY</p>
            <h2>
              The latest drawing
              <br />
              isn’t the whole story.
            </h2>
          </div>
          <div>
            <p className="lead">
              A returned submittal approves one detail. A later email changes
              another. Field measurements add a condition. The production
              package has to carry the right combination forward.
            </p>
            <p>
              That history may live across drawings, revisions, review comments,
              RFIs, ASIs and correspondence. A newer document does not, by
              itself, establish approval.
            </p>
            <p>
              Someone in your shop already owns the final review. We’re
              investigating whether a second, evidence-backed check can help
              that person see what agrees, what conflicts and what still needs
              an answer.
            </p>
          </div>
        </section>
        <section className="approach section" id="approach">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">THE CHECK</p>
                <h2>
                  What the check
                  <br />
                  looks for.
                </h2>
              </div>
              <p>
                The question is deliberately narrow:
                <br />
                <strong>
                  Does the package being considered for release agree with the
                  approved drawings and documented changes that are supplied?
                </strong>
              </p>
            </div>
            
            <div className="status-grid">
              {statuses.map((s) => (
                <article key={s.code} className={`status-card ${s.className}`}>
                  <span className="status-code">{s.code}</span>
                  <h3>
                    <span className="status-symbol" aria-hidden="true">
                      {s.code === "01"
                        ? "✓"
                        : s.code === "02"
                          ? "≠"
                          : s.code === "03"
                            ? "?"
                            : "◇"}
                    </span>
                    {s.name}
                  </h3>
                  <p>{s.description}</p>
                </article>
              ))}
            </div>
            <p className="approach-note">
              “Supported” describes the supplied record. It is not permission to
              fabricate.
            </p>
          </div>
        </section>
        <section className="section wrap example" id="example">
          <div className="example-intro">
            <p className="eyebrow">AN EXAMPLE, NOT A CUSTOMER RESULT</p>
            <h2>
              A change discussed.
              <br />
              An approval missing.
            </h2>
            <p>
              This illustrative finding comes from a simulated project example
              used for capability testing. It shows the distinction we’re
              testing: a change can appear in a later drawing without becoming
              the approved requirement.
            </p>
            
          </div>
          <article className="evidence-card">
            <div className="evidence-header">
              <span>FINDING 002 / TOE KICK HEIGHT</span>
              <span className="badge conflict">CONFLICT</span>
            </div>
            <div className="comparison">
              <div>
                <span>PRODUCTION PACKAGE</span>
                <strong>3½″</strong>
                <p>PR-01 · 22 Sep 2026</p>
              </div>
              <span className="comparison-symbol" aria-hidden="true">
                ≠
              </span>
              <div>
                <span>APPROVED SHOP DRAWING</span>
                <strong>4″</strong>
                <p>A-601 Rev A · returned 12 Sep</p>
              </div>
            </div>
            <ol className="evidence-trail">
              <li>
                <span className="trail-number">01</span>
                <div>
                  <h4>Returned Rev A establishes 4″</h4>
                  <p>The approved shop drawing specifies a 4″ toe kick.</p>
                </div>
              </li>
              <li>
                <span className="trail-number">02</span>
                <div>
                  <h4>Rev B proposes 3½″</h4>
                  <p>
                    The revised drawing changes the dimension. Correspondence
                    discusses it, pending confirmation.
                  </p>
                </div>
              </li>
              <li>
                <span className="trail-number">03</span>
                <div>
                  <h4>Later approval is limited to the filler</h4>
                  <p>
                    The 20 September email approves the left filler only and
                    keeps the remaining work aligned with returned Rev A.
                  </p>
                </div>
              </li>
            </ol>
            <div className="finding-conclusion">
              <strong>Unsupported change in the supplied record.</strong>
              <p>
                Human follow-up: confirm whether a separate toe-kick approval
                exists before making a release decision.
              </p>
            </div>
            <div className="evidence-footer">
              Example records / No actual customer project or measured outcome is shown
            </div>
          </article>
        </section>
        <section className="pilot section" id="pilot">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">THE COMPLETED PROJECT REVIEW PILOT</p>
                <h2>
                  See what a second review
                  <br />
                  finds on a completed job.
                </h2>
              </div>
              <p>
                Choose a completed job your team knows well. We’ll compare its production package with the project records and share a private review showing possible conflicts, unanswered questions and the records behind each finding.

                Then we’ll review it with you: what did the system get right, what did it get wrong, and would any finding have mattered before fabrication?
              </p>
            </div>
            <ol className="pilot-steps">
              {[
                [
                  "Share one completed project",
                  "Provide its document history and production/release package. Redact identifying or customer information where appropriate.",
                ],
                [
                  "We compare the package with the records",
                  "We work out was was approved - and what changed - and compare it with what the production package shows.",
                ],
                [
                  "Receive your private review",
                  "See what appears supported, potential conflicts, evidence gaps and human decisions, with the evidence behind each finding.",
                ],
                [
                  "Review the findings together",
                  "Tell us what was right, what was wrong and whether a finding would have mattered in your actual production review.",
                ],
              ].map(([title, text], i) => (
                <li key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
            <div className="pilot-bottom">
              <p>
                A small research pilot, not a commercially launched product.
              </p>
              <a href="#apply">Discuss a completed project</a>
            </div>
          </div>
        </section>
        <section className="section wrap records">
          <div>
            <p className="eyebrow">A USEFUL PROJECT</p>
            <h2>
              Real history.
              <br />
              It doesn’t need
              <br />
              to be tidy.
            </h2>
            <p>
              Perfectly organized records are not required. Messy histories,
              partial approvals and changes across documents are useful to this
              experiment.
            </p>
            <p>
              The most useful starting point is a production/release package
              plus the records that explain what governed it. If something is
              missing, that becomes part of the review.
            </p>
            <p className="record-note">
              No uploads in the application. We’ll discuss fit and agree on the
              records and sharing process first.
            </p>
          </div>
          <div className="record-list">
            <h3>Share what you have from one completed job</h3>
            {[
              [
                "Design intent",
                "Original architectural drawings and specifications",
              ],
              [
                "Shop history",
                "Shop drawings, revisions and returned approvals or comments",
              ],
              [
                "Change history",
                "RFIs, ASIs, change orders and relevant correspondence",
              ],
              [
                "Job conditions",
                "Recorded field measurements and coordination notes",
              ],
              [
                "What the shop plans to build",
                "The package considered for fabrication/release",
              ],
              [
                "Final outcome, if available",
                "What was ultimately fabricated, corrected or recorded as built",
              ],
            ].map(([title, text]) => (
              <div key={title}>
                <span aria-hidden="true">＋</span>
                <p>
                  <strong>{title}</strong>
                  <br />
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="boundaries wrap">
          <div>
            <p className="eyebrow">A CHECK. NOT A RELEASE AUTHORITY.</p>
            <h2>
              Your people
              <br />
              make the call.
            </h2>
          </div>
          <div>
            <p>
              This system compares records. It does not authorize fabrication,
              determine engineering adequacy, guarantee field fit, replace field
              verification or approve design changes.
            </p>
            <p>
              It does not create CNC output or replace qualified shop personnel.
              During this phase, we review completed projects only.
              No live production-system access is required.
            </p>
          </div>
        </section>
        <section className="section wrap application" id="apply">
          <div className="application-intro">
            <p className="eyebrow">EXPRESS YOUR INTEREST</p>
            <h2>
              Curious what it
              <br />
              would find on
              <br />
              one of your jobs?
            </h2>
            <p>
              Tell us a little about your shop and how production release works
              today. We’re looking for operators willing to share a completed project
              record and give candid feedback.
            </p>
            
            
          </div>
          <div className="form-panel">
            <h3>Tell Us About Your Shop</h3>
            <PilotForm />
          </div>
        </section>
      </main>
      <footer className="footer wrap">
        <a href="#" className="footer-brand">
          preflight<span>Working identity / Millwork release verification</span>
        </a>
        <p>Know what’s approved before you fabricate.</p>
        <a href="#apply">Pilot application</a>
      </footer>
    </>
  );
}
