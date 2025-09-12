'use client';

import * as Sentry from "@sentry/nextjs";

export default function SentryTest() {
  const testSentryError = () => {
    Sentry.startSpan(
      {
        op: "ui.click",
        name: "Sentry Test Button Click",
      },
      (span) => {
        span.setAttribute("test", "sentry_integration");
        span.setAttribute("environment", process.env.NODE_ENV || 'development');
        
        // Create a test error
        const testError = new Error("This is a test error for Sentry integration");
        Sentry.captureException(testError, {
          tags: { operation: 'sentry_test' },
          extra: { 
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent 
          }
        });
        
        alert("Test error sent to Sentry! Check your Sentry dashboard.");
      },
    );
  };

  return (
    <button
      onClick={testSentryError}
      className="hidden fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors z-50"
      id="sentry-test-btn"
    >
      Test Sentry
    </button>
  );
}