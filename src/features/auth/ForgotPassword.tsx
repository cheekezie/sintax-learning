import { LearningIllustration } from '@/assets';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui';
import TextInput from '@/components/ui/TextInput';
import { ForgotPasswordSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useForgotPassword } from './auth.query';

export default function ForgotPasswordPage() {
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { mutate, isPending } = useForgotPassword();

  const onSubmit = () => {
    mutate(getValues());
  };

  return (
    <AuthLayout
      title='Forgot your password?'
      subtitle="Enter the email linked to your account and we'll send you a code to reset it."
      imageSrc={LearningIllustration}
    >
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

        <Button variant='primary' disabled={!isValid} onClick={onSubmit}>
          {isPending ? 'Sending code...' : 'Send Code'}
        </Button>

        <div className='text-center'>
          <Link to='/login' className='text-xs text-gray-900 underline underline-offset-4'>
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
