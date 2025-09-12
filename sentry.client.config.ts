import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2541d306839c6b769845c00255840053@o4510003753320448.ingest.de.sentry.io/4510003754893392",

  integrations: [
    Sentry.replayIntegration(),
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions will be recorded
  replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors will be recorded

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,

  // Capture Console logs
  _experiments: {
    enableLogs: true,
  },

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});