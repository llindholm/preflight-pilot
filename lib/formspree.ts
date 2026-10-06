import type { z } from "zod";
import { applicationSchema } from "./application";
type Application = z.infer<typeof applicationSchema>;
export function isFormspreeEndpoint(value: string) {
  return /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/.test(value);
}
type Result =
  | { ok: true }
  | { ok: false; error: string; fields?: Record<string, string[]> };
export async function sendApplication(
  endpoint: string,
  data: Application,
): Promise<Result> {
  if (!isFormspreeEndpoint(endpoint))
    return {
      ok: false,
      error:
        "Applications are temporarily unavailable. Please try again later.",
    };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        consent: "Agreed to being contacted about this pilot",
        _subject: "New millwork project pilot application",
      }),
      signal: AbortSignal.timeout(25000),
    });
    const result = await response.json().catch(() => null);
    if (response.ok && result && result.ok !== false && !result.errors?.length)
      return { ok: true };
    const fields: Record<string, string[]> = {};
    if (Array.isArray(result?.errors))
      for (const item of result.errors) {
        if (
          typeof item.field === "string" &&
          item.field in data &&
          typeof item.message === "string"
        ) {
          (fields[item.field] ||= []).push(item.message);
        }
      }
    return {
      ok: false,
      fields,
      error:
        response.status === 429
          ? "The form is temporarily busy. Please try again later."
          : "We could not submit your application. Your answers are still here; please try again.",
    };
  } catch {
    return {
      ok: false,
      error:
        "We could not confirm your submission. Your answers are still here. Please check your connection and try again. If you already received a confirmation, avoid submitting again.",
    };
  }
}
