import test from "node:test";
import assert from "node:assert/strict";
import { applicationSchema } from "../lib/application";
import { isFormspreeEndpoint, sendApplication } from "../lib/formspree";
const payload: Parameters<typeof sendApplication>[1] = {
  name: "Shop Operator",
  email: "operator@example.com",
  company: "Example Millwork",
  role: "Production manager",
  website: "",
  millwork: "Hospitality casework",
  volume: "6–15",
  reviewer: "Shop engineer",
  incident: "",
  willingness: "Yes",
  consent: true,
  _gotcha: "",
};
test("validates answers, consent and honeypot", () => {
  assert.equal(applicationSchema.safeParse(payload).success, true);
  for (const change of [
    { email: "bad" },
    { consent: false },
    { _gotcha: "bot" },
    { incident: "x".repeat(3001) },
  ])
    assert.equal(
      applicationSchema.safeParse({ ...payload, ...change }).success,
      false,
    );
});
test("accepts only real Formspree endpoint shape", () => {
  assert.equal(isFormspreeEndpoint("https://formspree.io/f/abcde123"), true);
  for (const url of [
    "",
    "https://formspree.io/f/YOUR_FORM_ID",
    "https://other.example/f/abcde123",
    "https://formspree.io.evil.example/f/abcde123",
  ])
    assert.equal(isFormspreeEndpoint(url), false);
});
test("sends validated answers and email to Formspree", async () => {
  const original = global.fetch;
  global.fetch = async (url, options) => {
    assert.equal(url, "https://formspree.io/f/abcde123");
    const body = JSON.parse(String(options?.body));
    assert.equal(body.email, payload.email);
    assert.equal(body.millwork, payload.millwork);
    assert.equal(body._gotcha, "");
    assert.equal(
      (options?.headers as Record<string, string>).Accept,
      "application/json",
    );
    return Response.json({ ok: true });
  };
  try {
    assert.deepEqual(
      await sendApplication("https://formspree.io/f/abcde123", payload),
      { ok: true },
    );
  } finally {
    global.fetch = original;
  }
});
test("preserves field errors and rejects unavailable provider", async () => {
  const original = global.fetch;
  global.fetch = async () =>
    Response.json(
      { errors: [{ field: "email", message: "Please check this email." }] },
      { status: 400 },
    );
  try {
    const r = await sendApplication("https://formspree.io/f/abcde123", payload);
    assert.equal(r.ok, false);
    if (!r.ok) assert.deepEqual(r.fields?.email, ["Please check this email."]);
    global.fetch = async () => new Response("unavailable", { status: 503 });
    assert.equal(
      (await sendApplication("https://formspree.io/f/abcde123", payload)).ok,
      false,
    );
    global.fetch = async () => {
      throw new Error("offline");
    };
    assert.equal(
      (await sendApplication("https://formspree.io/f/abcde123", payload)).ok,
      false,
    );
  } finally {
    global.fetch = original;
  }
});
