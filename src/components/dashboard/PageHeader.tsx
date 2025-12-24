import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface prop {
  showBackButton?: boolean;
  title: string;
  routeTo?: string;
  onBackPressed?: () => void;
}
const PageHeader = ({ showBackButton = true, title, routeTo, onBackPressed }: prop) => {
  const navigate = useNavigate();

  const backPressed = () => {
    if (routeTo) {
      navigate(routeTo);
      return;
    }
    if (onBackPressed) {
      onBackPressed();
      return;
    }
    window.history.back();
  };

  return (
    <div className='flex items-center justify-between mb-4'>
      <div className='flex items-center gap-3'>
        {showBackButton && (
          <button
            onClick={backPressed}
            className='flex h-9 w-9 items-center justify-center rounded-full bg-white transition'
            aria-label='Go back'
          >
            <ArrowLeft size={18} />
          </button>
        )}

        <h2 className='text-2xl font-semibold'>{title}</h2>
      </div>
    </div>
  );
};

export default PageHeader;
