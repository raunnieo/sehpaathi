import React from 'react';
import { useTheme } from '../../contexts/useTheme';
import privacyData from '../../data/privacy.json';

const Privacy = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-700 dark:text-blue-300">
            {privacyData.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: {privacyData.lastUpdated}</p>
          <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            Your privacy is protected
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl shadow-lg p-8 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="space-y-8">
            {privacyData.sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">{section.title}</h2>
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Privacy Rights Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900">
              <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-400">Your Data Rights</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg shadow-sm border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium mb-2">Access & Control</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">View, update, or delete your personal information at any time.</p>
                </div>
                <div className="p-4 rounded-lg shadow-sm border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium mb-2">Data Portability</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Export your data in a standard format whenever you want.</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">Manage Privacy Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
