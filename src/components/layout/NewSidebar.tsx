import { LogoDark, LogoIcon } from '@/assets';
import { AnimatePresence, motion } from 'framer-motion';
import { Banknote, LayoutDashboard, UserCircle, X, type LucideIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobileMenu: () => void;
  onSidebarCollapsed: () => void;
  currentPage: string;
  onPageChanged: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  showSeparatorAfter?: boolean;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'My Enrolled Courses',
    icon: LayoutDashboard,
    path: '/my-courses',
  },
  {
    id: 'courses',
    label: 'Explore Courses',
    icon: Banknote,
    path: '/courses',
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: Banknote,
    path: '/billing',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: UserCircle,
    path: '/profile',
  },
];

const NewSidebar = ({ isMobileOpen, collapsed, onCloseMobileMenu }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
    if (isMobileOpen) {
      onCloseMobileMenu();
    }
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* 📱 Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black z-10 lg:hidden'
              onClick={onCloseMobileMenu}
            />

            {/* Slide-in Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className='fixed top-0 left-0 bottom-0 z-50 w-72 max-w-full bg-white border-r border-slate-200/50 shadow-lg lg:hidden flex flex-col'
            >
              <div className='flex items-center justify-end p-2 border-b border-slate-200'>
                <button onClick={onCloseMobileMenu}>
                  <X className='w-5 h-5 text-red-500' />
                </button>
              </div>

              {/* Logo */}
              <div className='p-6 border-b border-slate-200/50'>
                <Link to={'/'}>
                  <img src={LogoDark} alt='sintax' className='h-12 w-auto' />
                </Link>
              </div>

              {/* Navigation */}
              <nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
                {navItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.path) ? 'bg-primary text-white font-medium' : 'text-secondary hover:bg-slate-50'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 shrink-0 ${isActive(item.path) ? 'text-white' : 'text-black'}`} />
                      <span className='text-sm'>{item.label}</span>
                    </button>
                    {item.showSeparatorAfter && <div className='my-2 border-t border-slate-200' />}
                  </div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 🖥️ DESKTOP SIDEBAR */}
      <div
        className={`${
          collapsed ? 'w-20' : 'w-72'
        } hidden lg:flex transition-all duration-300 ease-in-out bg-white border-r border-slate-200/50 flex-col z-10`}
      >
        {/* Logo */}
        <div className={`${collapsed ? 'p-4' : 'p-4'} border-b border-slate-200/50`}>
          <div className='flex items-center justify-center'>
            <Link to={'/'}>
              {collapsed ? (
                <img src={LogoIcon} alt='sintax' className='w-auto h-10 transition-all duration-300' />
              ) : (
                <img src={LogoDark} alt='sintax' className='w-auto h-8 transition-all duration-300' />
              )}
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center ${
                  collapsed ? 'justify-center' : 'gap-3'
                } px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(item.path) ? 'bg-primary text-white font-medium' : 'text-secondary hover:bg-slate-50'
                }`}
                title={collapsed ? item.label : ''}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive(item.path) ? 'text-white' : 'text-black'}`} />
                {!collapsed && <span className='text-sm'>{item.label}</span>}
              </button>
              {item.showSeparatorAfter && !collapsed && <div className='my-2 border-t border-slate-200' />}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default NewSidebar;
