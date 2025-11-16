import { Logo } from '@/assets';
import { Button } from '../ui';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='min-h-12 px-8 py-3 bg-white border-b border-b-gray-200'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo */}
        <div>
          <Link to={'/'}>
            <img src={Logo} alt='Sintax Logo' className='h-6 md:h-8 w-auto cursor-pointer' />
          </Link>
        </div>

        {/* Search */}
        <div className='md:flex-1 max-w-md mx-8 hidden md:block'>
          <input
            type='text'
            placeholder='What are you learning today?'
            className='w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary text-sm'
          />
        </div>

        {/* Sign In */}
        <div className='flex w-[220px]'>
          <Link to={'/login'} className='w-full'>
            <Button size='sm'>Sign In</Button>
          </Link>

          <Link to={'/courses'} className='w-full'>
            <Button size='sm' variant='ghost' className='border border-secondary ml-3'>
              Enrol Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
