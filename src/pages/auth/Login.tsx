import { AuthSideImage } from '@/assets';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui';
import TextInput from '@/components/ui/TextInput';
import api from '@/features/schools/api';
import { useLogin } from '@/features/schools/queries';
import { LoginSchema } from '@/schemas/auth.schema';
import { CourseEnquirySchema } from '@/schemas/course.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = async () => {
    const payload = getValues();
    mutate(payload);
  };

  return (
    <AuthLayout
      title='Welcome to the future of education management'
      subtitle='Easily Sign in to your admin Portal.'
      imageSrc={AuthSideImage}
    >
      <button
        type='button'
        className='flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-900 transition hover:bg-gray-50 active:translate-y-px'
      >
        <span className='grid h-5 w-5 place-items-center rounded-md border border-gray-200 text-xs font-extrabold'>
          G
        </span>
        Log In with Google
      </button>

      <div className='relative my-5 text-center'>
        <div className='absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gray-200' />
        <span className='relative bg-white px-3 text-xs text-gray-500'>Or Fill in Your Details</span>
      </div>

      <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label='Email'
          type='email'
          id='email'
          autoComplete='off'
          placeholder='user@gmail.com'
          {...register('email')}
          error={errors.email}
        />

        <div className='relative mt-2'>
          <TextInput
            label='Password'
            type={passwordVisible ? 'text' : 'password'}
            placeholder='xxxxxx'
            {...register('password')}
            error={errors.password}
          />
        </div>

        <div className='flex justify-end'>
          <a href='/forgot-password' className='text-xs text-gray-900 underline underline-offset-4'>
            Forgot Password
          </a>
        </div>

        <Button variant='primary' disabled={!isValid} onClick={onSubmit}>
          {isPending ? 'signing in...' : 'Sign In'}
        </Button>
      </form>
    </AuthLayout>
  );
}
