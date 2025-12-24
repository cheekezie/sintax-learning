// LoginPage.tsx

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/dashboard/PageHeader';
import { Link } from 'react-router-dom';
import { LogoDark, LogoIcon } from '@/assets';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);

    // TODO: call backend to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const verifyOtp = async () => {
    setLoading(true);

    // TODO: call backend to verify OTP
    setTimeout(() => {
      setLoading(false);
      alert('Logged in successfully (mock)');
    }, 1000);
  };

  return (
    <div className='min-h-screen flex  flex-xol items-center justify-center bg-slate-50 px-4'>
      <div>
        <div className='flex justify-center mb-6'>
          <Link to={'/'} className='flex items-center mx-auto'>
            <button
              className='flex h-9 w-9 items-center justify-center rounded-full bg-white transition shadow-sm mr-3'
              aria-label='Go back'
            >
              <ArrowLeft size={18} />
            </button>
            Home
          </Link>
        </div>

        <div className='w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-sm'>
          {/* Header */}

          <div className='mb-6 text-center'>
            <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 text-white'>
              <img src={LogoIcon} />
            </div>

            <h1 className='text-2xl font-bold'>{step === 'email' ? 'Sign in' : 'Verify your email'}</h1>

            <p className='mt-1 text-sm text-slate-600'>
              {step === 'email'
                ? 'Enter your email to receive a one-time passcode'
                : `We sent a 6-digit code to ${email}`}
            </p>
          </div>

          {/* Step 1: Email */}
          {step === 'email' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendOtp();
              }}
              className='space-y-4'
            >
              <Field
                label='Email address'
                type='email'
                placeholder='you@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type='submit'
                disabled={!email || loading}
                className='flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60'
              >
                {loading ? 'Sending code...' : 'Send OTP'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyOtp();
              }}
              className='space-y-4'
            >
              <Field
                label='One-time passcode'
                type='text'
                placeholder='Enter 6-digit code'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                type='submit'
                disabled={otp.length < 6 || loading}
                className='flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-60'
              >
                {loading ? 'Verifying...' : 'Verify & Sign in'}
                {!loading && <ArrowRight size={16} />}
              </button>

              <button
                type='button'
                onClick={sendOtp}
                className='w-full text-center text-sm text-primary-600 hover:underline'
              >
                Resend code
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className='text-sm font-semibold'>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary-500'
      />
    </div>
  );
}
