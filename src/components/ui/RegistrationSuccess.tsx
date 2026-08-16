import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

interface prop {
  title?: string;
  subtitle?: string;
  message: string;
  onClose?: () => void;
}
const RegistrationSuccess = ({
  title = 'Registration Successful',
  subtitle = 'Welcome on board to Sintax Learning',
  message,
  onClose,
}: prop) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }

    // Navigate to Home
    navigate('/');
  };

  return (
    <div
      className='fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-auto'
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
    >
      <div className='bg-white rounded-lg max-w-md w-full p-8 text-center border border-gray-200 shadow-2xl backdrop-blur-sm'>
        {/* Success Icon */}
        <div className='mb-6 flex items-center justify-center'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
            <Check className='h-10 w-10 text-green-600' strokeWidth={3} />
          </div>
        </div>

        {/* Text Content */}
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-gray-800 mb-3'>{title}</h2>
          <p className='text-gray-600 text-sm mb-4'>{subtitle}</p>
          <p className='text-sm'>{message}</p>
        </div>

        {/* Close Button */}
        <Button onClick={handleClose} className='w-full py-3 text-base'>
          Close
        </Button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
