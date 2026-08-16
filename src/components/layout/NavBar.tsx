import { Logo } from '@/assets';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui';
import { Link, useNavigate } from 'react-router-dom';

interface prop {
  showSearch?: boolean;
}
const NavBar = ({ showSearch = true }: prop) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const isFirstRender = useRef(true);

  const goToSearch = (term: string, replace: boolean) => {
    navigate(term ? `/courses?search=${encodeURIComponent(term)}` : '/courses', { replace });
  };

  // Debounce: redirect to the courses page shortly after the user stops typing
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const term = search.trim();
    if (!term) return;

    const timeout = setTimeout(() => goToSearch(term, true), 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    goToSearch(search.trim(), false);
  };

  return (
    <nav className='min-h-12 px-8 py-3 bg-white border-b border-b-gray-200 fixed z-10 top-0 left-0 right-0'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo */}
        <div>
          <Link to={'/'}>
            <img src={Logo} alt='Sintax Logo' className='h-6 md:h-8 w-auto cursor-pointer' />
          </Link>
        </div>

        {/* Search */}
        {showSearch && (
          <form onSubmit={handleSearch} className='md:flex-1 max-w-md mx-8 hidden md:block'>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='What are you learning today?'
              className='w-full px-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary text-sm'
            />
          </form>
        )}

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
