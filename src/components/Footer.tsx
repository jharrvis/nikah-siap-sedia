
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center space-x-1">
            <span>© 2024 RH Decoration - Made with</span>
            <span className="text-red-500">❤️</span>
            <span>love</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
