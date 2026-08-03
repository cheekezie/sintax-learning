import { LearningIllustration } from '@/assets';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button, OTPInput } from '@/components/ui';
import TextInput from '@/components/ui/TextInput';
import { NewPasswordSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useForgotPassword, useResetPassword } from './auth.query';

export default function ResetPasswordPage() {
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email;

  const [otp, setOtp] = useState('');

  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(NewPasswordSchema),
  });

  const { mutate, isPending } = useResetPassword();
  const { mutate: resend, isPending: isResending } = useForgotPassword();

  if (!email) {
    return <Navigate to='/forgot-password' replace />;
  }

  const onSubmit = () => {
    const payload = getValues();
    mutate({ ...payload, otp, email });
  };

  return (
    <AuthLayout
      title='Reset your password'
      subtitle={`Enter the code sent to ${email} and choose a new password.`}
      imageSrc={LearningIllustration}
    >
      <form className='space-y-5' onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className='block text-sm font-medium mb-2'>Verification Code</label>
          <OTPInput length={6} onChange={setOtp} onComplete={setOtp} />
        </div>

        <TextInput
          label='New Password'
          type='password'
          placeholder='xxxxxx'
          {...register('newPassword')}
          error={errors.newPassword}
        />

        <TextInput
          label='Confirm New Password'
          type='password'
          placeholder='xxxxxx'
          {...register('confirmPassword')}
          error={errors.confirmPassword}
        />

        <Button variant='primary' disabled={!isValid || otp.length !== 6} onClick={onSubmit}>
          {isPending ? 'Resetting password...' : 'Reset Password'}
        </Button>

        <div className='flex items-center justify-between text-xs'>
          <button
            type='button'
            disabled={isResending}
            onClick={() => resend({ email })}
            className='text-gray-900 underline underline-offset-4 disabled:opacity-50'
          >
            {isResending ? 'Resending...' : 'Resend code'}
          </button>
          <Link to='/login' className='text-gray-900 underline underline-offset-4'>
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
