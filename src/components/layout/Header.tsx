import { useDecodedAuth } from '@/hooks/useDecodedAuth';
import { Bell, ChevronDown, MenuIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import Dropdown from './Dropdown';
import ProfileDropdown from './ProfileDropdown';

interface prop {
  onSidebarCollapse: () => void;
  onMobileMenu: () => void;
  sideBarCollapsed: boolean;
}
const Header = ({ onSidebarCollapse, onMobileMenu }: prop) => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const profileTriggerRef = useRef<HTMLButtonElement>(null);

  const { user } = useDecodedAuth();

  return (
    <div className='bg-transparent border-b border-slate-200/50 px-4 sm:px-6 py-4'>
      <div className='flex items-center justify-between'>
        {/* Left section */}
        <div className='flex space-x-4 items-center'>
          {/* SIDEBAR TOGGLE BUTTON */}
          <button
            className='hidden lg:block p-2 rounded-lg text-black hover:bg-slate-200 transition-colors bg-transparent! focus:outline-none cursor-pointer'
            onClick={onSidebarCollapse}
          >
            <MenuIcon className='w-5 h-5' />
          </button>

          {/* MOBILE MENU TOGGLE BUTTON */}

          <button
            className='lg:hidden p-2 rounded-lg text-black hover:bg-slate-200 transition-colors bg-transparent! focus:outline-none cursor-pointer'
            onClick={onMobileMenu}
          >
            <MenuIcon className='w-5 h-5' />
          </button>
        </div>

        {/* Right section */}
        <div className='flex items-center space-x-3'>
          {/* Notification Bell - Secondary Color */}
          <button className='p-2.5 rounded-xl text-secondary hover:bg-slate-100 transition-colors cursor-pointer'>
            <Bell className='w-5 h-5' />
          </button>

          {/* Profile Avatar with Dropdown */}
          <div className='relative flex items-center'>
            <button
              ref={profileTriggerRef}
              onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
              className='flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity'
            >
              {/* Profile Avatar */}
              <div className='w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200 ring-2 ring-primary'>
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt='user'
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/avatar.png';
                    }}
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-primary to-secondary text-white text-sm font-semibold'>
                    {(user?.fullName || user?.name || 'I').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              {/* Dropdown Arrow - Very Close */}
              <ChevronDown
                className={`w-4 h-4 text-primary transition-transform duration-200 ${
                  isProfileDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            <Dropdown
              triggerRef={profileTriggerRef}
              isOpen={isProfileDropdownOpen}
              onClose={() => setProfileDropdownOpen(false)}
              placement='bottom'
            >
              <ProfileDropdown onClose={() => setProfileDropdownOpen(false)} />
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
