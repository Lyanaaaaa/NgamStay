import React, { useState } from 'react';
import Icon from './Icon';
import { PMUser } from '../types';

interface PMOnboardingProps {
  user: PMUser;
  onComplete: () => void;
}

const PMOnboarding: React.FC<PMOnboardingProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const benefits = [
    {
      iconType: 'building' as const,
      title: 'List Unlimited Properties',
      description: 'Add as many rental properties as you manage, completely free'
    },
    {
      iconType: 'users' as const,
      title: 'Quality Tenant Leads',
      description: 'Connect with verified tenants actively looking for rentals'
    },
    {
      iconType: 'trending-up' as const,
      title: 'Fill Vacancies Faster',
      description: 'Average time to fill: 30% faster than traditional listings'
    },
    {
      iconType: 'shield' as const,
      title: 'Verified Badge' + (user.isVerified ? ' (Active)' : ''),
      description: user.isVerified
        ? 'Your Autorentic verification is already active'
        : 'Build trust with first 3 approved listings'
    }
  ];

  if (step === 1) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-light/10 rounded-full mb-6">
              <Icon type="sparkles" className="w-4 h-4 text-brand-light" />
              <span className="text-sm font-bold text-brand-light">Welcome aboard!</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              Hey {user.name}!<br />
              <span className="text-brand-light">Let's get you started</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {user.isVerified
                ? "Your Autorentic account is verified. You're all set to start listing properties with priority placement."
                : "You're moments away from listing your first property and reaching quality tenants."}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-brand-light dark:hover:border-brand-light transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-light/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon type={benefit.iconType} className="w-6 h-6 text-brand-light" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                      {benefit.title}
                      {user.isVerified && benefit.iconType === 'shield' && (
                        <Icon type="check-circle" className="w-4 h-4 text-green-500" />
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-3 bg-brand-light hover:bg-brand-mid text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
            >
              Continue to Dashboard
              <Icon type="arrow-right" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light/10 rounded-2xl mb-6">
                <Icon type="shield" className="w-8 h-8 text-brand-light" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Terms & Guidelines</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Quick review before you start listing
              </p>
            </div>

            {/* Terms Box */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mb-6 max-h-80 overflow-y-auto">
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Listing Quality Standards</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <Icon type="check-circle" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                      <span>Provide accurate property details and pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon type="check-circle" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                      <span>Upload clear, recent photos of the actual property</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon type="check-circle" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                      <span>Update availability status within 48 hours of occupancy changes</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Trust & Verification</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <Icon type="check-circle" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                      <span>{user.isVerified ? 'Your Autorentic verification gives you instant trust badges' : 'First 3 listings will undergo manual review (24-48 hours)'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon type="check-circle" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                      <span>Respond to tenant inquiries within 24 hours for best results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon type="check-circle" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                      <span>No duplicate listings - one property, one listing</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Platform Rules</h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <Icon type="check-circle" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                      <span>Listings must be for rental purposes only (no sales)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon type="check-circle" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                      <span>Properties must be real and currently available or soon-to-be-available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon type="check-circle" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                      <span>Prohibited: scams, misleading info, discriminatory content</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <label className="flex items-start gap-3 mb-6 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-5 h-5 text-brand-light bg-gray-100 border-gray-300 rounded focus:ring-brand-light focus:ring-2 cursor-pointer"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                I agree to the listing guidelines and commit to maintaining accurate, up-to-date property information
              </span>
            </label>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 px-6 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:border-brand-light hover:text-brand-light transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={onComplete}
                disabled={!agreedToTerms}
                className="flex-1 bg-brand-light hover:bg-brand-mid text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Start Listing
                <Icon type="arrow-right" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PMOnboarding;
