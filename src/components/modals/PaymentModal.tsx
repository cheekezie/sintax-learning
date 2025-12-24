import { useFormValidation, useToast } from '@/hooks';

import { ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentOptions from '../course/PaymentOptions';
import { Portal } from '../layout/Portal';
import { RegistrationSuccess } from '../ui';
import Button from '../ui/Button';

interface props {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess] = useState(false);
  const [step, setStep] = useState(2);
  const { showError } = useToast();

  const navigate = useNavigate();

  const { isValid } = useFormValidation({
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

  const back = async () => {
    setStep(1);
  };
  const next = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    navigate(`/my-courses`);
    // handleRegister();
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

      navigate(`/invoice/999`);
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
            'Welcome. Our team will keep in touch shortly with details and further information on your journey. Be rest assured you are in goo dhands'
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
              <h2 className='text-2xl font-semibold text-gray-900'>Make Payment</h2>
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
              {step === 1 && <div></div>}
              {step === 2 && (
                <div>
                  <button
                    onClick={back}
                    disabled={isLoading}
                    className='flex items-center gap-2 text-gray-700 hover:text-primary mb-6 self-start'
                  >
                    <ArrowLeft className='w-5 h-5' /> Back
                  </button>
                  <PaymentOptions />
                </div>
              )}
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
                onClick={next}
                size='sm'
                fullWidth={false}
                disabled={!isValid || isLoading}
                className='px-6'
              >
                {step === 1 && 'Next'}
                {step === 2 && <span>{isLoading ? 'Loading...' : ' Finish & Pay'}</span>}
              </Button>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default PaymentModal;
