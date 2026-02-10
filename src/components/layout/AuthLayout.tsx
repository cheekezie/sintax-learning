import { Logo } from '@/assets';
import React from 'react';

type AuthSplitLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;

  brandName?: string;
  brandTagline?: string;

  imageSrc: string;
  imageAlt?: string;

  // set to "left" if you ever want image on the left
  imageSide?: 'left' | 'right';
};

export const AuthLayout = ({
  title,
  subtitle,
  children,
  brandName = 'ENSSMP',
  brandTagline = 'A management suite for education managers to seamlessly manage operations accrosss all school levels',
  imageSrc,
  imageAlt = 'Auth visual',
  imageSide = 'left',
}: AuthSplitLayoutProps) => {
  const isRight = imageSide === 'right';

  return (
    <div className='min-h-screen bg-white'>
      <div className='mx-auto grid min-h-screen w-full  grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[800px_1fr]'>
        {/* IMAGE SIDE (fixed) */}
        <div
          className={['relative hidden min-h-screen lg:block', 'overflow-hidden', isRight ? 'order-2' : 'order-1'].join(
            ' ',
          )}
        >
          {/* Make the entire panel a hover group */}
          <div className='group absolute inset-0 top-8 bottom-8 left-12 rounded-3xl overflow-hidden '>
            <img
              src={imageSrc}
              alt={imageAlt}
              className='absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.06] grayscale group-hover:grayscale-0'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent' />

            <div className='absolute bottom-8 left-8 right-8 text-white'>
              <div className='text-3xl font-bold tracking-tight'>{brandName}</div>
              <p className='mt-3 max-w-md text-sm leading-relaxed text-white/90'>{brandTagline}</p>
            </div>
          </div>
        </div>

        {/* FORM SIDE (scrolls) */}
        <div
          className={[
            'flex min-h-screen flex-col ',
            'overflow-y-auto',
            'px-6 py-10 md:px-10 lg:px-14',
            isRight ? 'order-1' : 'order-2',
          ].join(' ')}
        >
          <div className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center'>
            {/* Brand */}
            <div className='mb-6 flex items-center gap-3'>
              <img src={Logo} className='w-12' />
              <div className='text-xl font-bold text-gray-900'>{brandName}</div>
            </div>

            <h1 className='text-xl font-semibold leading-snug text-gray-900 md:text-[22px]'>{title}</h1>
            {subtitle ? <p className='mt-2 text-sm text-gray-500'>{subtitle}</p> : null}

            <div className='mt-7'>{children}</div>
          </div>

          {/* Optional bottom padding/foot area */}
          <div className='mx-auto w-full max-w-md py-6 text-center text-xs text-gray-400'>
            © {new Date().getFullYear()} {brandName}
          </div>
        </div>
      </div>

      {/* Mobile image (optional): show above form on small screens */}
      <div className='lg:hidden'>
        <div className='group relative h-64 w-full overflow-hidden'>
          <img
            src={imageSrc}
            alt={imageAlt}
            className='absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.06] grayscale group-hover:grayscale-0'
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent' />
          <div className='absolute bottom-5 left-5 right-5 text-white'>
            <div className='text-2xl font-bold tracking-tight'>{brandName}</div>
            <p className='mt-2 max-w-md text-xs leading-relaxed text-white/90'>{brandTagline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
