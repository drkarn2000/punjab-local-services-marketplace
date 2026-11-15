'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Mail,
  Phone,
  RefreshCcw,
  ShieldCheck,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoggedIn, setCurrentRole, showToast } = useMarketplace();

  const [mode, setMode] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('9876012345');
  const [email, setEmail] = useState('jaspreet.kaur@demo.in');
  const [password, setPassword] = useState('demo1234');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === 'phone' && phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (mode === 'email' && (!email.includes('@') || !password.trim())) {
      setError('Please enter a valid email and password.');
      return;
    }
    if (mode === 'email') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsLoggedIn(true);
        setCurrentRole('customer');
        showToast('Logged in successfully as Jaspreet Kaur!', 'success');
        router.push('/account');
      }, 450);
      return;
    }
    setOtpSent(true);
    showToast('Simulated Demo OTP sent! Use code 123456.', 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length < 4) {
      setError('Please enter the 6-digit OTP (Demo: 123456).');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
      setCurrentRole('customer');
      showToast('OTP Verified! Welcome back to Punjab Services.', 'success');
      router.push('/account');
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#f0f5ff] py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-blue-100 shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500">
            Login to manage your bookings, estimates, and saved addresses across
            Mohali, Chandigarh & Hoshiarpur.
          </p>
        </div>

        {/* Toggle Phone OTP vs Email Login */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => {
              setMode('phone');
              setOtpSent(false);
              setError(null);
            }}
            className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              mode === 'phone'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-700'
            }`}
          >
            <Phone className="w-3.5 h-3.5" /> Phone & OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('email');
              setOtpSent(false);
              setError(null);
            }}
            className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              mode === 'email'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-700'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Email Login
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
            {error}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            {mode === 'phone' ? (
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Mobile Number
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                  <span className="px-3 py-2.5 bg-slate-200/70 text-xs font-bold text-slate-700">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full px-3 py-2.5 text-sm font-semibold bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-800">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>
                {loading
                  ? 'Signing in...'
                  : mode === 'phone'
                  ? 'Send Demo OTP'
                  : 'Login to Account'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Simulated OTP sent to +91 {phone}. Demo code pre-filled:{' '}
                <strong>123456</strong>
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Enter 6-Digit OTP
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-600 text-center text-lg font-extrabold tracking-[0.4em] bg-blue-50/40"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() =>
                  showToast('Demo OTP 123456 resent successfully!', 'info')
                }
                className="font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                <RefreshCcw className="w-3.5 h-3.5" /> Resend OTP
              </button>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-slate-500 hover:text-slate-800"
              >
                Change Number
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition"
            >
              {loading ? 'Verifying OTP...' : 'Verify OTP & Login'}
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-500 space-y-2 pt-2 border-t border-slate-100">
          <div>
            New to Punjab Services?{' '}
            <Link
              href="/register"
              className="font-bold text-blue-600 hover:underline"
            >
              Create an Account
            </Link>
          </div>
          <p className="text-[11px] text-slate-400">
            By continuing, you agree to our{' '}
            <Link href="/terms-and-conditions" className="underline">
              Terms
            </Link>{' '}
            &{' '}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
