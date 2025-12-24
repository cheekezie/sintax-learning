import { LogoWhite } from '@/assets';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-secondary text-white py-12 px-6'>
      <div className='max-w-[1200px] mx-auto grid md:grid-cols-4 gap-10'>
        {/* Logo + About */}
        <div>
          <Link to={'/'}>
            <img src={LogoWhite} alt='Sintax Logo' className='h-6 md:h-8 w-auto cursor-pointer' />
          </Link>
          <p className='text-gray-300 text-sm leading-relaxed mt-4'>
            Empowering learners with expert-led courses and practical knowledge to stay ahead in a fast-evolving world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
          <ul className='space-y-3 text-gray-300 text-sm'>
            <li>
              <Link to='/faq' className='hover:text-white transition'>
                FAQs
              </Link>
            </li>
            <li>
              <Link to='/courses' className='hover:text-white transition'>
                Courses
              </Link>
            </li>

            <li>
              <Link to='/contact' className='hover:text-white transition'>
                How it works
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Company</h3>
          <ul className='space-y-3 text-gray-300 text-sm'>
            <li>
              <Link to='/partners' className='hover:text-white transition'>
                Our Partners
              </Link>
            </li>
            <li>
              <Link to='/instructor' className='hover:text-white transition'>
                Become a trainer
              </Link>
            </li>
            <li>
              <Link to='/contact' className='hover:text-white transition'>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Connect With Us</h3>
          <div className='flex items-center gap-5'>
            <a href='#' className='hover:text-primary transition'>
              <Facebook className='w-5 h-5' />
            </a>
            <a href='#' className='hover:text-primary transition'>
              <Twitter className='w-5 h-5' />
            </a>
            <a href='#' className='hover:text-primary transition'>
              <Instagram className='w-5 h-5' />
            </a>
            <a href='#' className='hover:text-primary transition'>
              <Linkedin className='w-5 h-5' />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className='border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-sm'>
        © {new Date().getFullYear()} Sintax. All rights reserved.
      </div>
    </footer>
  );
}
