import { useFormValidation, useToast } from '@/hooks';

import { COUNTRY_DATA, NGERIAN_STATES_DATA } from '@/data/nigerianstates';
import { RegisterUserSchema } from '@/schemas/register.schema';
import { ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Portal } from '../layout/Portal';
import { RegistrationSuccess, Select } from '../ui';
import Button from '../ui/Button';
import Form from '../ui/Form';
import Input from '../ui/Input';
import PaymentOptions from '../course/PaymentOptions';

interface props {
  isOpen: boolean;
  onClose: () => void;
}

const EnrolmentModal = ({ isOpen, onClose }: props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess] = useState(false);
  const [step, setStep] = useState(2);
  const { showError } = useToast();

  const navigate = useNavigate();

  const { formData, touched, setTouched, errors, updateFieldWithValidation, isValid } = useFormValidation({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    other_name: '',
    location: '',
    gender: '',
  });

  const handleClose = async () => {
    onClose();
  };

  const onValueChange = (field: string, value: string) => {
    updateFieldWithValidation(field, value, RegisterUserSchema);
  };

  const handleRegister = async () => {
    try {
      //   setIsLoading(true);
      //   const email = formData.email as string;
      //   const res = await userService.completePayment(email);
      //   setIsLoading(false);
      //   if (res.data.reg_completed) {
      //     setMembershipId(res.data.invoice.membership_id);
      //     return;
      //   }

      navigate(`/billing`);
      onClose();
    } catch (error: any) {
      setIsLoading(false);
      showError('Request failed', error?.message ?? 'An error occured');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {isSuccess && (
        <RegistrationSuccess
          message={
            'Welcome. Our team will keep in touch shortly with details and further information on your journey. Be rest assured you are in good hands'
          }
          onClose={handleClose}
        />
      )}

      <Portal>
        <div
          className='fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div
            className='bg-white rounded-lg shadow-xl w-full max-w-2xl animate-in fade-in-0 zoom-in-95 duration-200'
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
              <h2 className='text-2xl font-semibold text-gray-900'>Join Course</h2>
              <button
                onClick={handleClose}
                className='p-2 rounded-lg transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer'
                aria-label='Close modal'
              >
                <X className='w-4 h-4 text-dark' />
              </button>
            </div>

            {/* Content */}
            <div className='p-6 space-y-4 max-h-[70vh] overflow-y-auto'>
              <Form onSubmit={handleRegister}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 mb-4'>
                  <Input
                    label='First Name'
                    name='first_name'
                    type='text'
                    required
                    value={formData.first_name as string}
                    onBlur={() => setTouched('first_name')}
                    touched={touched.first_name}
                    onChange={(value) => onValueChange('first_name', value)}
                    placeholder='e.g Paschal'
                    error={errors.first_name}
                  />
                  <Input
                    label='Middle Name'
                    name='other_name'
                    type='text'
                    value={formData.other_name as string}
                    onBlur={() => setTouched('other_name')}
                    touched={touched.other_name}
                    onChange={(value) => onValueChange('other_name', value)}
                    placeholder='e.g Ikenna'
                    error={errors.other_name}
                  />
                  <Input
                    label='Surname'
                    name='last_name'
                    type='text'
                    required
                    value={formData.last_name as string}
                    onBlur={() => setTouched('last_name')}
                    touched={touched.last_name}
                    onChange={(value) => onValueChange('last_name', value)}
                    placeholder='e.g Omeje'
                    error={errors.last_name}
                  />
                </div>

                <Input
                  label='Email Address'
                  name='email'
                  type='email'
                  required
                  value={formData.email as string}
                  onBlur={() => setTouched('email')}
                  touched={touched.email}
                  onChange={(value) => onValueChange('email', value)}
                  placeholder='e.g user@gmail.com'
                  className='mb-4'
                  error={errors.email}
                />
                <Input
                  label='Phone Number'
                  name='phone'
                  type='tel'
                  required
                  value={formData.phone as string}
                  onBlur={() => setTouched('phone')}
                  touched={touched.phone}
                  onChange={(value) => onValueChange('phone', value)}
                  placeholder='e.g 0706200000'
                  className='mb-4'
                  error={errors.phone}
                />

                <Select
                  label='Country'
                  name='country'
                  required
                  value={formData.country as string}
                  onBlur={() => setTouched('country')}
                  touched={touched.gender}
                  onChange={(value) => onValueChange('country', value)}
                  options={COUNTRY_DATA}
                  placeholder='-- Please select --'
                  className='mb-4'
                  error={errors.country}
                />

                <Select
                  label='Location'
                  name='location'
                  required
                  value={formData.gender as string}
                  onBlur={() => setTouched('location')}
                  touched={touched.gender}
                  onChange={(value) => onValueChange('location', value)}
                  options={NGERIAN_STATES_DATA}
                  placeholder='-- Please select --'
                  className='mb-4'
                  error={errors.gender}
                />
              </Form>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between space-x-3 p-6 border-t border-gray-200'>
              <Button
                type='button'
                onClick={handleClose}
                variant='danger'
                size='sm'
                fullWidth={false}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type='button'
                onClick={handleRegister}
                size='sm'
                fullWidth={false}
                disabled={!isValid || isLoading}
                className='px-6'
              >
                {isLoading ? 'Loading...' : ' Submit'}
              </Button>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default EnrolmentModal;
