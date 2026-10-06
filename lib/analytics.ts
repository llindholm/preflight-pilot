// No analytics provider is connected. Listen for this event when adding one.
// Keep application answers and personal information out of analytics.
export function track(
  name:
    | "pilot_application_submit"
    | "pilot_application_success"
    | "pilot_application_error",
) {
  if (typeof window !== "undefined")
    window.dispatchEvent(
      new CustomEvent("preflight:analytics", { detail: { name } }),
    );
}
