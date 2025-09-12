'use client';

import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Sentry Integration Test
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Click the button below to trigger a test error and verify that Sentry is capturing errors correctly.
        </p>
        
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          onClick={() => {
            // Create a Sentry span for the test
            Sentry.startSpan(
              {
                op: "ui.click",
                name: "Test Error Button Click",
              },
              (span) => {
                span.setAttribute("test_type", "sentry_integration");
                span.setAttribute("environment", process.env.NODE_ENV || 'development');
                
                // Trigger a test error
                const testError = new Error("This is a test error to verify Sentry integration!");
                testError.name = "SentryTestError";
                
                // Capture the error with additional context
                Sentry.captureException(testError, {
                  tags: { 
                    operation: 'sentry_test',
                    test_page: true
                  },
                  extra: { 
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    url: window.location.href
                  },
                  level: 'error'
                });
                
                alert("Test error sent to Sentry! Check your Sentry dashboard to see if it appears.");
              },
            );
          }}
        >
          Trigger Test Error
        </button>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            How to verify:
          </h3>
          <ol className="text-sm text-blue-700 dark:text-blue-400 list-decimal list-inside space-y-1">
            <li>Click the button above</li>
            <li>Check your Sentry dashboard</li>
            <li>Look for "SentryTestError" in issues</li>
          </ol>
        </div>
        
        <div className="mt-4">
          <a 
            href="/"
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}