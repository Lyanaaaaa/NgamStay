import React, { useState } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import OTPInput from './OTPInput';
import Icon from './Icon';
import { AuthMethod, PMAccountType, PMUser } from '../types';

interface PMAuthProps {
  onAuthSuccess: (user: PMUser) => void;
}

type AuthStep = 'landing' | 'autorentic-login' | 'public-signup' | 'otp-verify' | 'creating-account';

const PMAuth: React.FC<PMAuthProps> = ({ onAuthSuccess }) => {
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

  // Landing Page
  if (authStep === 'landing') {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Logo />
              <span className="text-3xl font-black text-brand-dark dark:text-brand-light tracking-tighter">NgamStay</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            List in minutes.<br />
              <span className="text-brand-light">Get real tenant leads.</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Join Malaysia's trusted rental marketplace. Connect with verified tenants and manage listings seamlessly.
            </p>
          </div>

          {/* Auth Options */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Existing Autorentic User */}
            <button
              onClick={handleAutorenticLogin}
              className="group bg-gradient-to-br from-brand-dark to-brand-mid hover:from-brand-mid hover:to-brand-dark p-8 rounded-3xl text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon type="shield" className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">Autorentic User</h3>
                  <p className="text-sm text-white/80">Existing account</p>
                </div>
                <Icon type="arrow-right" className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-white/90 text-sm mb-4">
                Use your Autorentic account to publish listings instantly with verified badges
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium flex items-center gap-1">
                  <Icon type="check-circle" className="w-3 h-3" /> Auto-verified
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium flex items-center gap-1">
                  <Icon type="check-circle" className="w-3 h-3" /> Priority listing
                </span>
              </div>
            </button>

            {/* New Property Manager */}
            <button
              onClick={handlePublicSignup}
              className="group bg-white dark:bg-gray-800 p-8 rounded-3xl text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 border-gray-100 dark:border-gray-700 hover:border-brand-light dark:hover:border-brand-light"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-light/10 rounded-xl flex items-center justify-center">
                  <Icon type="building" className="w-6 h-6 text-brand-light" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">New Property Manager</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Create account</p>
                </div>
                <Icon type="arrow-right" className="w-6 h-6 text-brand-light group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Sign up to start listing properties and connecting with quality tenants
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-brand-light/10 rounded-full text-xs text-brand-dark dark:text-brand-light font-medium">
                  Free to list
                </span>
                <span className="px-3 py-1 bg-brand-light/10 rounded-full text-xs text-brand-dark dark:text-brand-light font-medium">
                  Quick setup
                </span>
              </div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Trusted by property managers</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Icon type="shield" className="w-4 h-4 text-brand-light" />
                <span>Verified listings only</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon type="check-circle" className="w-4 h-4 text-brand-light" />
                <span>No ghost listings</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon type="building" className="w-4 h-4 text-brand-light" />
                <span>Quality tenant leads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Autorentic Login (SSO Simulation)
  if (authStep === 'autorentic-login') {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md">
          <button
            onClick={() => setAuthStep('landing')}
            className="mb-6 text-gray-500 dark:text-gray-400 hover:text-brand-light flex items-center gap-2 transition-colors"
          >
            ← Back
          </button>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-dark/10 dark:bg-brand-light/10 rounded-2xl mb-4">
                <Icon type="shield" className="w-8 h-8 text-brand-dark dark:text-brand-light" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Autorentic Login</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Connect your Autorentic account to get verified instantly
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
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={() => handleSendOTP(AuthMethod.AUTORENTIC)}
                disabled={!contactValue}
                className="w-full bg-brand-dark hover:bg-brand-mid text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue with Autorentic
                <Icon type="arrow-right" className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 p-4 bg-brand-light/10 rounded-xl">
              <p className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <Icon type="shield" className="w-4 h-4 text-brand-light flex-shrink-0 mt-0.5" />
                <span>
                  We'll verify your Autorentic account and link it automatically. Your listings will get verified badges for increased trust.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Public Signup
  if (authStep === 'public-signup') {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md">
          <button
            onClick={() => setAuthStep('landing')}
            className="mb-6 text-gray-500 dark:text-gray-400 hover:text-brand-light flex items-center gap-2 transition-colors"
          >
            ← Back
          </button>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light/10 rounded-2xl mb-4">
                <Icon type="building" className="w-8 h-8 text-brand-light" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Start listing your properties in under 2 minutes
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
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Signup Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setContactValue('');
                      document.getElementById('contact-input')?.focus();
                    }}
                    className={`p-3 rounded-xl border-2 transition-all ${
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
                      setContactValue('');
                      document.getElementById('contact-input')?.focus();
                    }}
                    className={`p-3 rounded-xl border-2 transition-all ${
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
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={() => {
                  const method = authMethod || AuthMethod.EMAIL_OTP;
                  handleSendOTP(method);
                }}
                disabled={!name || !contactValue}
                className="w-full bg-brand-light hover:bg-brand-mid text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Send Verification Code
                <Icon type="arrow-right" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // OTP Verification
  if (authStep === 'otp-verify') {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md">
          <button
            onClick={() => setAuthStep(authMethod === AuthMethod.AUTORENTIC ? 'autorentic-login' : 'public-signup')}
            className="mb-6 text-gray-500 dark:text-gray-400 hover:text-brand-light flex items-center gap-2 transition-colors"
          >
            ← Back
          </button>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light/10 rounded-2xl mb-4">
                <Icon type="shield" className="w-8 h-8 text-brand-light" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verify Your Account</h2>
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
        </div>
      </div>
    );
  }

  // Creating Account
  if (authStep === 'creating-account') {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-light/10 rounded-3xl mb-6 animate-pulse">
            <Icon type="check-circle" className="w-10 h-10 text-brand-light" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Creating Your Account...</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Setting up your property manager dashboard
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default PMAuth;
