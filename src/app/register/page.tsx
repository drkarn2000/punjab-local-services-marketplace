'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, UserPlus } from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CitySlug } from '@/types/marketplace';

export default function RegisterPage() {
  const router = useRouter();
  const { updateCustomerProfile, setSelectedCity, setIsLoggedIn, showToast } =
    useMarketplace();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState<CitySlug>('mohali');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || phone.trim().length < 10 || !email.includes('@')) {
      showToast('Please enter valid full name, 10-digit phone, and email.', 'warning');
      return;
    }
    if (!acceptedTerms) {
      showToast('Please accept the Terms & Conditions.', 'warning');
      return;
    }
    updateCustomerProfile({
      name: fullName.trim(),
      phone: `+91 ${phone.trim()}`,
      email: email.trim(),
      citySlug: city,
    });
    setSelectedCity(city);
    setIsLoggedIn(true);
    setRegistered(true);
    showToast(`Account created for ${fullName.trim()}!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#f0f5ff] py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-emerald-100 shadow-2xl p-6 sm:p-8 space-y-6">
        {registered ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Registration Successful!
            </h1>
            <p className="text-xs text-slate-600">
              Welcome to Punjab Services! Your account is active and ready to
              book verified professionals in {city.toUpperCase()}.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => router.push('/book')}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Book Your First Service (Use Code PUNJAB100)
              </button>
              <button
                onClick={() => router.push('/account')}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold"
              >
                Go to Customer Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <UserPlus className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                Create Customer Account
              </h1>
              <p className="text-xs text-slate-500">
                Sign up in seconds to book verified local experts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jaspreet Kaur"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.demo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    City *
                  </label>
                  <select
                    aria-label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value as CitySlug)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50"
                  >
                    <option value="mohali">Mohali</option>
                    <option value="chandigarh">Chandigarh</option>
                    <option value="hoshiarpur">Hoshiarpur</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Password (Demo)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="rounded text-emerald-600 w-4 h-4 mt-0.5"
                />
                <span>
                  I accept the{' '}
                  <Link
                    href="/terms-and-conditions"
                    className="text-emerald-600 font-bold underline"
                  >
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-emerald-600 font-bold underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition"
              >
                Create Account
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-bold text-emerald-600 hover:underline"
              >
                Login Here
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
