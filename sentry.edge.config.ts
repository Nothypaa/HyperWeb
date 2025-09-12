import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2541d306839c6b769845c00255840053@o4510003753320448.ingest.de.sentry.io/4510003754893392",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,

  // Capture Console logs
  _experiments: {
    enableLogs: true,
  },
});