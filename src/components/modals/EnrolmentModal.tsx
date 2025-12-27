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
import ModalWrapper from './ModalWrapper';

interface props {
  isOpen: boolean;
  onClose: () => void;
  locations: any[];
  availability: any[];
}

const EnrolmentModal = ({ isOpen, onClose, locations, availability }: props) => {
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
    city: '',
    deliveryMode: '',
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

      <ModalWrapper onClose={handleClose} onSubmit={handleRegister} isOpen={isOpen} btnDisabled={!isValid || isLoading}>
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
            placeholder='Phone no. with country code'
            className='mb-4'
            error={errors.phone}
          />

          <Select
            label='Class Format'
            name='classFormat'
            required
            value={formData.mode as string}
            onBlur={() => setTouched('deliveryMode')}
            touched={touched.deliveryMode}
            onChange={(value) => onValueChange('deliveryMode', value)}
            options={availability}
            placeholder='-- Please select --'
            className='mb-4'
            error={errors.deliveryMode}
          />

          {availability.includes('in-person') && (
            <Select
              label='Location'
              name='location'
              required
              value={formData.gender as string}
              onBlur={() => setTouched('city')}
              touched={touched.city}
              onChange={(value) => onValueChange('city', value)}
              options={locations}
              valueKey='city'
              labelKey='city'
              placeholder='-- Please select --'
              className='mb-4'
              error={errors.gender}
            />
          )}
        </Form>
      </ModalWrapper>
    </>
  );
};

export default EnrolmentModal;
