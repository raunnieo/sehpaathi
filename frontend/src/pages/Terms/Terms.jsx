import React from 'react';
import { useTheme } from '../../contexts/useTheme';
import termsData from '../../data/terms.json';

const Terms = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-700 dark:text-blue-300">
            {termsData.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: {termsData.lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="rounded-xl shadow-lg p-8 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="space-y-8">
            {termsData.sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">{section.title}</h2>
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-900">
              <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-400">Questions or Concerns?</h3>
              <p className="text-gray-600 dark:text-gray-300">If you have any questions about these Terms of Service, please don't hesitate to contact us.</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
