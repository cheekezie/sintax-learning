import { motion } from 'framer-motion';
import { HeroRight } from '@/assets';
import { Button } from '@/components/ui';
import { useEffect, useState } from 'react';

const HomeHero = () => {
  const texts = ['skill up ?', 'level up ?', 'get ahead ?'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setFade(false);
      setTimeout(() => {
        // change text and fade in
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFade(true);
      }, 500); // fade duration matches transition
    }, 3000); // change text every 3 seconds

    return () => clearInterval(interval);
  });

  return (
    <section className='bg-secondary py-[100px] px-8'>
      <div className='mx-auto md:grid grid-cols-2  max-w-[1200px] items-center'>
        {/* LEFT CONTENT */}
        <motion.div
          className='md:pr-[100px] mb-10 md:mb-0'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className='text-center md:text-left'>
            <h1 className='text-white text-5xl mb-3'>
              Want to{' '}
              <span className={`text-primary transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {texts[currentTextIndex]}
              </span>
            </h1>
            <h1 className='text-white text-5xl mb-6'>Learn the right way</h1>

            <p className='text-2xl text-gray-400'>
              Empower yourself or your team and stay ahead with future-ready skills
            </p>
          </div>

          <div className='flex mt-8'>
            <Button variant='accent-1'>Explore Courses</Button>
            <Button className='border border-white ml-4'>For Businesses</Button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className='flex justify-end'
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <img src={HeroRight} alt='promo image' className='w-full h-full object-contain max-h-[400px]' />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
