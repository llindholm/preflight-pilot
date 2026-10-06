"use client";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { applicationSchema } from "@/lib/application";
import { track } from "@/lib/analytics";
type Turnstile = {
  render: (node: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
export default function PilotForm() {
  const [state, setState] = useState<"idle" | "sending" | "success">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {},
  );
  const [token, setToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const challenge = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const submissionId = useRef("");
  const lastAnswers = useRef("");
  const statusRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    if (!scriptReady || !siteKey || !challenge.current || !window.turnstile)
      return;
    widget.current = window.turnstile.render(challenge.current, {
      sitekey: siteKey,
      action: "pilot-apply",
      theme: "light",
      size: "flexible",
      callback: (value: string) => {
        setToken(value);
      },
      "expired-callback": () => setToken(""),
      "error-callback": () => {
        setToken("");
        setMessage(
          "Verification could not load. Check your connection and reload this page.",
        );
      },
    });
    return () => {
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [scriptReady, siteKey]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const answers = JSON.stringify(values);
    if (!submissionId.current || answers !== lastAnswers.current) {
      submissionId.current = crypto.randomUUID();
      lastAnswers.current = answers;
    }
    const input = {
      ...values,
      consent: values.consent === "on",
      turnstileToken: token,
      submissionId: submissionId.current,
    };
    const parsed = applicationSchema.safeParse(input);
    if (!parsed.success) {
      const fields = parsed.error.flatten().fieldErrors;
      setErrors(fields);
      setMessage("Please check the highlighted fields.");
      const first = Object.keys(fields)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setMessage("");
    setState("sending");
    track("pilot_application_submit");
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.fields || {});
        throw new Error(result.error || "Submission failed. Please try again.");
      }
      setState("success");
      track("pilot_application_success");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (error) {
      setState("idle");
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "We could not confirm your submission. Please try again.",
      );
      if (widget.current) window.turnstile?.reset(widget.current);
      setToken("");
      track("pilot_application_error");
    }
  }
  const hint = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]?.[0]}
      </span>
    ) : null;
  const props = (name: string) => ({
    name,
    id: name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  if (state === "success")
    return (
      <div className="form-success" role="status" ref={statusRef} tabIndex={-1}>
        <span className="success-mark">✓</span>
        <p className="eyebrow">APPLICATION RECEIVED</p>
        <h3>Thank you for raising your hand.</h3>
        <p>
          We’ll review your application and contact you at the email you
          provided to discuss whether a historical project would be a useful
          fit.
        </p>
        <p className="small">
          Please wait to send project records until we agree on the scope and
          how they’ll be shared.
        </p>
      </div>
    );
  return (
    <form onSubmit={submit} noValidate className="pilot-form">
      <p className="form-note">
        Required unless marked optional. No project files needed here.
      </p>
      <div className="field-grid">
        <label htmlFor="name">
          Name
          <input
            {...props("name")}
            autoComplete="name"
            required
            maxLength={160}
          />
          {hint("name")}
        </label>
        <label htmlFor="email">
          Work email
          <input
            {...props("email")}
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
          {hint("email")}
        </label>
        <label htmlFor="company">
          Company
          <input
            {...props("company")}
            autoComplete="organization"
            required
            maxLength={160}
          />
          {hint("company")}
        </label>
        <label htmlFor="role">
          Role
          <input
            {...props("role")}
            autoComplete="organization-title"
            required
            maxLength={160}
          />
          {hint("role")}
        </label>
      </div>
      <label htmlFor="website">
        Company website <span className="optional">(optional)</span>
        <input
          {...props("website")}
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="yourshop.com"
          maxLength={300}
        />
        {hint("website")}
      </label>
      <label htmlFor="millwork">
        What kind of architectural millwork does your shop primarily produce?
        <textarea
          {...props("millwork")}
          required
          rows={2}
          maxLength={2000}
          placeholder="For example: commercial casework, hospitality interiors, custom residential…"
        />
        {hint("millwork")}
      </label>
      <label htmlFor="volume">
        Roughly how many projects move through fabrication in a typical month?
        <select {...props("volume")} required defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          {["1–5", "6–15", "16–30", "31+", "Varies / not sure"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        {hint("volume")}
      </label>
      <label htmlFor="reviewer">
        Who currently performs the final review before a package is released to
        production?
        <input
          {...props("reviewer")}
          required
          maxLength={1000}
          placeholder="Role or team is enough; no names needed."
        />
        {hint("reviewer")}
      </label>
      <label htmlFor="incident">
        Have you had an approved change, old revision, field condition or
        coordination note missed before fabrication? What happened?{" "}
        <span className="optional">(optional)</span>
        <textarea {...props("incident")} rows={3} maxLength={3000} />
        {hint("incident")}
      </label>
      <label htmlFor="willingness">
        Would you be willing to share records from one completed historical
        project, with identifying information redacted where appropriate?
        <select {...props("willingness")} required defaultValue="">
          <option value="" disabled>
            Select an answer
          </option>
          {["Yes", "Possibly — let’s discuss", "Not at this time"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        {hint("willingness")}
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this empty
          <input name="websiteConfirm" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="checkbox" htmlFor="consent">
        <input {...props("consent")} type="checkbox" required />
        <span>I agree to be contacted about this pilot application.</span>
      </label>
      {hint("consent")}
      <p className="privacy-note">
        Your application is sent by email to the pilot organizer using Resend.
        Cloudflare Turnstile helps protect this form from spam. Please leave
        customer names, confidential details and project documents out of this
        application. We’ll agree on record sharing and handling before any
        project is provided.
      </p>
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          onReady={() => setScriptReady(true)}
          onError={() =>
            setMessage(
              "Verification could not load. Please reload the page and try again.",
            )
          }
        />
      )}
      <div ref={challenge} />
      {!siteKey && (
        <p className="config-note">
          Applications will open once the form is connected. You can still
          explore the pilot below.
        </p>
      )}
      <div role="alert">
        {message && <p className="form-error">{message}</p>}
      </div>
      <button
        className="button"
        type="submit"
        disabled={state === "sending" || !siteKey || !token}
      >
        {state === "sending"
          ? "Submitting application…"
          : "Apply for the Pilot"}
      </button>
      <p className="small">
        An application starts a conversation. It does not commit you to sharing
        a project.
      </p>
      <noscript>
        <p>Please enable JavaScript to use the pilot application form.</p>
      </noscript>
    </form>
  );
}
