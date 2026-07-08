import type { BillingI } from '@/features/payment/payment.type';
import { useToast } from '@/hooks';
import { formatCurrency } from '@/utils/formatCurrency';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentOptions from '../course/PaymentOptions';
import { Portal } from '../layout/Portal';
import { RegistrationSuccess } from '../ui';
import Button from '../ui/Button';

interface props {
  isOpen: boolean;
  onClose: () => void;
  billing?: BillingI | null;
}

const PaymentModal = ({ isOpen, onClose, billing }: props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess] = useState(false);
  const { showError } = useToast();
  const navigate = useNavigate();

  const handleClose = () => onClose();

  const handlePay = async () => {
    try {
      navigate('/my-courses');
    } catch (error: any) {
      setIsLoading(false);
      showError('Request failed', error?.message ?? 'An error occurred');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {isSuccess && (
        <RegistrationSuccess
          message='Welcome. Our team will keep in touch shortly with details and further information on your journey.'
          onClose={handleClose}
        />
      )}

      <Portal>
        <div
          className='fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
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
              {/* Billing summary */}
              {billing && (
                <div className='rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2'>
                  <div className='flex items-center gap-3'>
                    {billing.course.thumbnail && (
                      <img
                        src={billing.course.thumbnail}
                        alt={billing.course.title}
                        className='w-14 h-14 rounded-lg object-cover shrink-0'
                      />
                    )}
                    <div className='min-w-0'>
                      <p className='font-semibold text-gray-900 truncate'>{billing.course.title}</p>
                      <div className='flex items-center gap-3 mt-1 flex-wrap'>
                        <span className='text-xs px-2 py-0.5 bg-gray-900 text-white rounded-full capitalize'>{billing.paymentPlan}</span>
                        <span className='text-xs text-gray-500'>Total: <strong className='text-gray-800'>{formatCurrency(billing.totalAmount)}</strong></span>
                        <span className='text-xs text-gray-500'>Paid: <strong className='text-green-600'>{formatCurrency(billing.totalPaid)}</strong></span>
                        <span className='text-xs text-gray-500'>Due: <strong className='text-orange-600'>{formatCurrency(billing.totalDue)}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <PaymentOptions baseAmount={billing?.totalDue ?? billing?.totalAmount} />
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between space-x-3 p-6 border-t border-gray-200'>
              <Button type='button' onClick={handleClose} variant='danger' size='sm' fullWidth={false} disabled={isLoading}>
                Cancel
              </Button>
              <Button type='button' onClick={handlePay} size='sm' fullWidth={false} className='px-6' disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Finish & Pay'}
              </Button>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default PaymentModal;
