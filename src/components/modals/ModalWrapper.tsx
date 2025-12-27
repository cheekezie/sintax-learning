import { useEffect, type ReactNode } from 'react';
import { Portal } from '../layout/Portal';
import { X } from 'lucide-react';
import { Button } from '../ui';

interface prop {
  children: ReactNode;
  isOpen: boolean;
  isLoading?: boolean;
  btnDisabled?: boolean;
  submitBtnLabel?: string;
  onClose: () => void;
  onSubmit?: () => void;
}
const ModalWrapper = ({
  children,
  isOpen,
  isLoading,
  btnDisabled,
  onSubmit,
  onClose,
  submitBtnLabel = 'Submit',
}: prop) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const submit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
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
              onClick={onClose}
              className='p-2 rounded-lg transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer'
              aria-label='Close modal'
            >
              <X className='w-4 h-4 text-dark' />
            </button>
          </div>

          {/* Content */}
          <div className='p-6 space-y-4 max-h-[70vh] overflow-y-auto'>{children}</div>

          {/* Footer */}
          <div className='flex items-center justify-between space-x-3 p-6 border-t border-gray-200'>
            <Button type='button' onClick={onClose} variant='danger' size='sm' fullWidth={false} disabled={isLoading}>
              Cancel
            </Button>
            <Button type='button' onClick={submit} size='sm' fullWidth={false} disabled={btnDisabled} className='px-6'>
              {isLoading ? 'Loading...' : submitBtnLabel}
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ModalWrapper;
