import { motion } from 'framer-motion';
import { UserCheck, BookOpen, Clock } from 'lucide-react';

export default function Feature() {
  return (
    <>
      <div className='px-8'>
        <div className='mx-auto max-w-xl pt-8 text-center'>
          <div className='relative mb-10'>
            <h1 className='text-secondary text-xl font-semibold'>Unparalled Learning Experience</h1>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='252'
              height='23'
              viewBox='0 0 252 23'
              fill='none'
              stroke='currentColor'
              className='absolute max-md:bottom-[-15px] text-primary w-full'
            >
              <path
                d='M1 9.09366C33.2835 6.67458 150.795 1.96963 247 9.09368C197.061 9.09368 131.996 9.81404 90.1024 17.3186'
                stroke='currentColor'
                stroke-width='10'
                stroke-linejoin='round'
              ></path>
            </svg>
          </div>

          <p className='text-dark'>
            Our training takes a hands-on, practical approach designed to meet learners exactly where they are. We offer
            1-to-1 support to ensure people with different learning speeds and abilities are fully carried along. This
            is not just about watching videos—it's about real guidance, real practice, and learning the right way.
          </p>
        </div>
      </div>
      <section className='py-[100px] px-8 mb-8'>
        <div className='mx-auto grid md:grid-cols-3 gap-6 max-w-[1200px] items-start mb-6 md:mb-0'>
          {/* Expert Instructors */}
          <motion.div
            className='rounded-2xl bg-off-white py-6 px-5 shadow-md'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <div className='flex items-center mb-4'>
              <UserCheck className='w-6 h-6 text-primary' />
              <h1 className='font-semibold ml-3 text-lg'>Expert Instructors</h1>
            </div>
            <p className='text-gray-600'>
              Learn from industry professionals with years of real-world experience, guiding you step by step to master
              your skills.
            </p>
          </motion.div>

          {/* Comprehensive Courses */}
          <motion.div
            className='rounded-2xl bg-off-white py-6 px-5 shadow-md'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <div className='flex items-center mb-4'>
              <BookOpen className='w-6 h-6 text-primary' />
              <h1 className='font-semibold ml-3 text-lg'>Comprehensive Courses</h1>
            </div>
            <p className='text-gray-600'>
              Access carefully structured courses covering all levels — from beginner to advanced — to ensure complete
              learning.
            </p>
          </motion.div>

          {/* Flexible Learning */}
          <motion.div
            className='rounded-2xl bg-off-white py-6 px-5 shadow-md'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: false }}
          >
            <div className='flex items-center mb-4'>
              <Clock className='w-6 h-6 text-primary' />
              <h1 className='font-semibold ml-3 text-lg'>Flexible Learning</h1>
            </div>
            <p className='text-gray-600'>
              Learn at your own pace, anytime and anywhere, with on-demand content designed to fit your schedule.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
