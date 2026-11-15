'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, KeyRound, ShieldCheck } from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function ForgotPasswordPage() {
  const { showToast } = useMarketplace();
  const [step, setStep] = useState<'input' | 'verify' | 'reset' | 'done'>('input');
  const [identifier, setIdentifier] = useState('jaspreet.kaur@demo.in');
  const [otp, setOtp] = useState('123456');
  const [newPass, setNewPass] = useState('');

  return (
    <div className="min-h-screen bg-[#f0f5ff] py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-blue-100 shadow-2xl p-6 sm:p-8 space-y-5">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Account Password Recovery
          </h1>
          <p className="text-xs text-slate-500">
            Reset your customer or partner password using simulated verification.
          </p>
        </div>

        {step === 'input' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Registered Email or Phone Number
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
              />
            </div>
            <button
              onClick={() => {
                setStep('verify');
                showToast('Demo recovery code 123456 generated!', 'info');
              }}
              className="w-full py-3 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold"
            >
              Send Verification Code
            </button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900">
              Recovery instructions sent to <strong>{identifier}</strong>. Demo verification code: <strong>123456</strong>.
            </div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-blue-600 text-center font-extrabold tracking-widest"
            />
            <button
              onClick={() => setStep('reset')}
              className="w-full py-3 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold"
            >
              Verify Code
            </button>
          </div>
        )}

        {step === 'reset' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Enter New Password
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
              />
            </div>
            <button
              onClick={() => {
                setStep('done');
                showToast('Password reset successfully!', 'success');
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold"
            >
              Update Password
            </button>
          </div>
        )}

        {step === 'done' && (
          <div className="text-center space-y-4 py-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <div className="text-base font-extrabold text-slate-900">
              Password Updated!
            </div>
            <p className="text-xs text-slate-600">
              Your demo password has been reset. You can now sign in.
            </p>
            <Link
              href="/login"
              className="block w-full py-3 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Return to Login
            </Link>
          </div>
        )}

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <Link href="/login" className="font-bold text-blue-600 hover:underline">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
