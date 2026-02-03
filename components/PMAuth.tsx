import React, { useState } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import OTPInput from './OTPInput';
import Icon from './Icon';
import { AuthMethod, PMAccountType, PMUser } from '../types';

interface PMAuthProps {
  onAuthSuccess: (user: PMUser) => void;
  onClose: () => void;
}

type AuthStep = 'landing' | 'autorentic-login' | 'public-signup' | 'otp-verify' | 'creating-account';

const PMAuth: React.FC<PMAuthProps> = ({ onAuthSuccess, onClose }) => {
  const [authStep, setAuthStep] = useState<AuthStep>('landing');
  const [authMethod, setAuthMethod] = useState<AuthMethod | null>(null);
  const [contactValue, setContactValue] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAutorenticLogin = () => {
    setAuthMethod(AuthMethod.AUTORENTIC);
    setAuthStep('autorentic-login');
  };

  const handlePublicSignup = () => {
    setAuthStep('public-signup');
  };

  const handleSendOTP = (method: AuthMethod) => {
    setAuthMethod(method);
    setAuthStep('otp-verify');
    // Simulate sending OTP
    setTimeout(() => {
      console.log(`OTP sent to ${contactValue}`);
    }, 500);
  };

  const handleOTPComplete = (otp: string) => {
    setIsLoading(true);
    setAuthStep('creating-account');

    // Simulate authentication
    setTimeout(() => {
      const newUser: PMUser = {
        id: `pm_${Date.now()}`,
        name: name || 'Property Manager',
        email: authMethod === AuthMethod.EMAIL_OTP ? contactValue : `${contactValue}@example.com`,
        phone: authMethod === AuthMethod.PHONE_OTP ? contactValue : undefined,
        accountType: authMethod === AuthMethod.AUTORENTIC ? PMAccountType.AUTORENTIC : PMAccountType.PUBLIC,
        isVerified: authMethod === AuthMethod.AUTORENTIC,
        autorenticUserId: authMethod === AuthMethod.AUTORENTIC ? `ar_${Date.now()}` : undefined,
        createdAt: new Date(),
        listingCount: 0,
        approvedListingCount: 0
      };

      onAuthSuccess(newUser);
      setIsLoading(false);
    }, 1500);
  };

  // Modal Backdrop & Container
  const ModalWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Close"
        >
          <Icon type="x" className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        {children}
      </div>
    </div>
  );

  // Landing Page - Conversational Question
  if (authStep === 'landing') {
    return (
      <ModalWrapper>
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Logo />
              <span className="text-2xl font-black text-brand-dark dark:text-brand-light tracking-tighter">Dourr</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white mb-3 leading-tight">
              Quick question—are you currently using Autorentic?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This helps us set up the best experience for you
            </p>
          </div>

          {/* Two Clear CTAs */}
          <div className="space-y-4">
            {/* Yes - Autorentic User */}
            <button
              onClick={handleAutorenticLogin}
              className="group w-full bg-gradient-to-br from-brand-dark to-brand-mid hover:from-brand-mid hover:to-brand-dark p-6 rounded-2xl text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon type="shield" className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Yes, I use Autorentic</h3>
                  <p className="text-sm text-white/80">
                    Connect your account & get verified instantly
                  </p>
                </div>
                <Icon type="arrow-right" className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                  ✓ Auto-verified
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                  ✓ Instant publish
                </span>
              </div>
            </button>

            {/* No - New User */}
            <button
              onClick={handlePublicSignup}
              className="group w-full bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-6 rounded-2xl text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-brand-light"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Icon type="building" className="w-6 h-6 text-brand-light" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No, I don't</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Create a new account in under 2 minutes
                  </p>
                </div>
                <Icon type="arrow-right" className="w-5 h-5 text-brand-light group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-brand-light/10 rounded-full text-xs text-brand-dark dark:text-brand-light font-medium">
                  Free forever
                </span>
                <span className="px-3 py-1 bg-brand-light/10 rounded-full text-xs text-brand-dark dark:text-brand-light font-medium">
                  Quick setup
                </span>
              </div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Icon type="shield" className="w-3.5 h-3.5 text-brand-light" />
                <span>Verified only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon type="check-circle" className="w-3.5 h-3.5 text-brand-light" />
                <span>No ghost listings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon type="building" className="w-3.5 h-3.5 text-brand-light" />
                <span>Quality leads</span>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
    );
  }

  // Autorentic Login (SSO Simulation)
  if (authStep === 'autorentic-login') {
    return (
      <ModalWrapper>
        <div className="p-8">
          <button
            onClick={() => setAuthStep('landing')}
            className="mb-6 text-gray-500 dark:text-gray-400 hover:text-brand-light flex items-center gap-2 transition-colors text-sm font-medium"
          >
            <Icon type="arrow-left" className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-dark/10 dark:bg-brand-light/10 rounded-full mb-4">
              <Icon type="shield" className="w-8 h-8 text-brand-dark dark:text-brand-light" />
            </div>
            <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">Connect Autorentic</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Verify your account to get instant access
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email or Phone
              </label>
              <input
                type="text"
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                placeholder="your@email.com or +60123456789"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
              />
            </div>

            <button
              onClick={() => handleSendOTP(AuthMethod.AUTORENTIC)}
              disabled={!contactValue}
              className="w-full bg-brand-dark hover:bg-brand-mid text-white font-bold py-3 px-6 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue with Autorentic
              <Icon type="arrow-right" className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 p-4 bg-brand-light/10 rounded-2xl">
            <p className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
              <Icon type="shield" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
              <span>
                Your listings will get verified badges instantly for increased trust with tenants.
              </span>
            </p>
          </div>
        </div>
      </ModalWrapper>
    );
  }

  // Public Signup
  if (authStep === 'public-signup') {
    return (
      <ModalWrapper>
        <div className="p-8">
          <button
            onClick={() => setAuthStep('landing')}
            className="mb-6 text-gray-500 dark:text-gray-400 hover:text-brand-light flex items-center gap-2 transition-colors text-sm font-medium"
          >
            <Icon type="arrow-left" className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light/10 rounded-full mb-4">
              <Icon type="building" className="w-8 h-8 text-brand-light" />
            </div>
            <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">Create Account</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Start listing in under 2 minutes
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Signup Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setAuthMethod(AuthMethod.EMAIL_OTP);
                    setContactValue('');
                    setTimeout(() => document.getElementById('contact-input')?.focus(), 100);
                  }}
                  className={`p-3 rounded-full border-2 transition-all ${
                    authMethod === AuthMethod.EMAIL_OTP
                      ? 'border-brand-light bg-brand-light/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-brand-light/50'
                  }`}
                >
                  <Icon type="mail" className="w-5 h-5 mx-auto mb-1 text-brand-light" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email</span>
                </button>
                <button
                  onClick={() => {
                    setAuthMethod(AuthMethod.PHONE_OTP);
                    setContactValue('');
                    setTimeout(() => document.getElementById('contact-input')?.focus(), 100);
                  }}
                  className={`p-3 rounded-full border-2 transition-all ${
                    authMethod === AuthMethod.PHONE_OTP
                      ? 'border-brand-light bg-brand-light/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-brand-light/50'
                  }`}
                >
                  <Icon type="phone" className="w-5 h-5 mx-auto mb-1 text-brand-light" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Phone</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {authMethod === AuthMethod.PHONE_OTP ? 'Phone Number' : 'Email Address'}
              </label>
              <input
                id="contact-input"
                type={authMethod === AuthMethod.PHONE_OTP ? 'tel' : 'email'}
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                placeholder={authMethod === AuthMethod.PHONE_OTP ? '+60123456789' : 'your@email.com'}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
              />
            </div>

            <button
              onClick={() => {
                const method = authMethod || AuthMethod.EMAIL_OTP;
                handleSendOTP(method);
              }}
              disabled={!name || !contactValue}
              className="w-full bg-brand-light hover:bg-brand-mid text-white font-bold py-3 px-6 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Send Verification Code
              <Icon type="arrow-right" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </ModalWrapper>
    );
  }

  // OTP Verification
  if (authStep === 'otp-verify') {
    return (
      <ModalWrapper>
        <div className="p-8">
          <button
            onClick={() => setAuthStep(authMethod === AuthMethod.AUTORENTIC ? 'autorentic-login' : 'public-signup')}
            className="mb-6 text-gray-500 dark:text-gray-400 hover:text-brand-light flex items-center gap-2 transition-colors text-sm font-medium"
          >
            <Icon type="arrow-left" className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light/10 rounded-full mb-4">
              <Icon type="shield" className="w-8 h-8 text-brand-light" />
            </div>
            <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">Verify Your Account</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Enter the 6-digit code sent to<br />
              <span className="font-semibold text-brand-light">{contactValue}</span>
            </p>
          </div>

          <div className="mb-6">
            <OTPInput onComplete={handleOTPComplete} disabled={isLoading} />
          </div>

          <button
            onClick={() => handleSendOTP(authMethod!)}
            className="w-full text-brand-light hover:text-brand-dark dark:hover:text-white font-medium text-sm transition-colors"
          >
            Didn't receive code? Resend
          </button>
        </div>
      </ModalWrapper>
    );
  }

  // Creating Account
  if (authStep === 'creating-account') {
    return (
      <ModalWrapper>
        <div className="p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-light/10 rounded-full mb-6 animate-pulse">
            <Icon type="check-circle" className="w-10 h-10 text-brand-light" />
          </div>
          <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">Creating Your Account...</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Setting up your dashboard
          </p>
        </div>
      </ModalWrapper>
    );
  }

  return null;
};

export default PMAuth;
