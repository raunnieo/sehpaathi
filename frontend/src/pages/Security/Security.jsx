import React from 'react';
import { useTheme } from '../../contexts/useTheme';
import securityData from '../../data/security.json';

const Security = () => {
  const { isDark } = useTheme();

  const securityFeatures = [
    { icon: '🔒', title: 'End-to-End Encryption', description: 'Your data is encrypted in transit and at rest' },
    { icon: '🛡️', title: '24/7 Monitoring', description: 'Continuous security monitoring and threat detection' },
    { icon: '🔐', title: 'Multi-Factor Auth', description: 'Optional 2FA for enhanced account security' },
    { icon: '⚡', title: 'Auto Updates', description: 'Automatic security patches and updates' },
  ];

  return (
    <div className={`min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-red-700 dark:text-red-300">
            {securityData.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Last updated: {securityData.lastUpdated}</p>
          <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Enterprise-grade security
          </div>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl shadow-md border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="rounded-xl shadow-lg p-8 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="space-y-8">
            {securityData.sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <h2 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400">{section.title}</h2>
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Security Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900">
              <h3 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-400">Security Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="p-4 rounded-lg text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium transition-colors">
                  <div className="text-2xl mb-2">🔧</div>
                  <div className="font-medium">Security Settings</div>
                </button>
                <button className="p-4 rounded-lg text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium transition-colors">
                  <div className="text-2xl mb-2">🚨</div>
                  <div className="font-medium">Report Issue</div>
                </button>
                <button className="p-4 rounded-lg text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium transition-colors">
                  <div className="text-2xl mb-2">📧</div>
                  <div className="font-medium">Contact Security</div>
                </button>
              </div>
              <div className="mt-6 text-center">
                <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors">Enable Two-Factor Authentication</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
