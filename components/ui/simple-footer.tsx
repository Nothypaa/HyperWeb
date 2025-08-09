import React from 'react';

function SimpleFooter() {
  return (
    <footer className="py-8 px-4 md:px-6 bg-background border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2025 HyperWeb. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export { SimpleFooter };