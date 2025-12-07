import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import EnrolmentModal from '@/components/modals/EnrolmentModal';
import { Button } from '@/components/ui';
import { BookOpen, Calendar, ChartColumn, Grid, StarIcon, TimerIcon } from 'lucide-react';
import { useState } from 'react';

function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      title: 'Redux',
      children: ['Hooks', 'Reducers', 'Introduction to state management'],
    },
    {
      title: 'React',
      children: ['Components', 'Hooks & lifecycle', 'State and props'],
    },
    {
      title: 'Backend Development',
      children: ['API Design', 'Authentication', 'Database modeling'],
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='space-y-2'>
      {items.map((item, index) => (
        <div key={index} className='border-b border-b-gray-400 overflow-hidden transition-all pb-2'>
          <button
            onClick={() => toggle(index)}
            className='w-full text-left px-4 py-2 font-medium text-md flex justify-between items-center'
          >
            {item.title}
            <span className='text-primary'>{openIndex === index ? '−' : '+'}</span>
          </button>

          <div
            className={`transition-all duration-300 overflow-hidden ${
              openIndex === index ? 'max-h-40 p-4' : 'max-h-0 p-0'
            }`}
          >
            <ul className='list-disc pl-6 space-y-1 text-gray-700'>
              {item.children.map((child, i) => (
                <li key={i}>{child}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CourseDetailPage() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const onClose = () => {
    setIsPaymentOpen(false);
  };

  const join = () => {
    setIsPaymentOpen(true);
  };

  return (
    <>
      <EnrolmentModal isOpen={isPaymentOpen} onClose={onClose} />
      <NavBar />
      <div className='space-y-10 mb-12 '>
        {/* Header */}
        <header className='bg-[#0A1630] text-white py-16 px-6 text-center pt-40'>
          <h1 className='text-4xl font-bold mb-3'>Full Stack Software Development</h1>
          <p className='text-gray-300 text-lg max-w-2xl mx-auto'>
            Grow faster with expertly developed learning paths and live classes.
          </p>
        </header>

        <div className='px-8'>
          <div className='mx-auto max-w-[1200px]'>
            <div className='grid md:grid-cols-[1fr_400px] gap-8'>
              <main>
                <section>
                  <div className='w-full h-70 bg-gray-200 rounded-xl overflow-hidden mb-8'>
                    <img
                      src='https://store.altschoolafrica.com/docs/alt-Cybersecurity-Networking-and-System-Security-1757513056032639352.jpg'
                      alt='Course'
                      className='w-full h-full object-cover'
                    />
                  </div>
                </section>
                <section className='space-y-3 mb-6'>
                  <h2 className='text-base font-semibold'>About the Course</h2>
                  <p className='text-gray-700 leading-relaxed'>
                    This live course provides hands-on training in modern web development. You will build real projects,
                    join live interactive classes, and receive mentorship throughout your learning journey. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Iure, vel nisi. Fuga obcaecati, veniam delectus
                    asperiores maiores similique quae sit dolore tempora harum ipsum nulla facere quos labore!
                    Temporibus, culpa.
                  </p>
                </section>

                {/* What You Will Learn */}
                <section className='mb-6'>
                  <h2 className='text-base font-semibold'>What You Will Learn</h2>
                  <ul className='list-disc pl-6 space-y-1 text-gray-700'>
                    <li>Frontend development with HTML, CSS, JavaScript & React</li>
                    <li>Backend development with Node.js & Express</li>
                    <li>APIs, databases, and authentication</li>
                    <li>Version control with Git & GitHub</li>
                    <li>Deployment & hosting</li>
                    <li>Building full-scale applications from scratch</li>
                  </ul>
                </section>

                <section className=''>
                  <h2 className='text-base font-semibold'>Course Curriculum</h2>
                  <Accordion />
                </section>
              </main>
              <aside className='sticky top-12  h-fit'>
                <section className='shadow-light py-8 px-6'>
                  <h2 className='text-secondary text-center mb-4 font-semibold'>
                    N300,000{' '}
                    <span className='bg-primary rounded-4xl text-sm text-white ml-6 px-3 py-1 font-normal'>
                      25% OFF
                    </span>
                  </h2>

                  <div className='border-b border-b-gray-200' />
                  <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                    <div className='flex items-center'>
                      <StarIcon className='text-primary mr-2' size={16} />
                      <span>Course Level</span>
                    </div>
                    <span className='text-right'>Beginner</span>
                  </div>

                  <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                    <div className='flex items-center'>
                      <TimerIcon className='text-primary mr-2' size={16} />
                      <span>Duration</span>
                    </div>
                    <span className='text-right'>12 Weeks</span>
                  </div>

                  <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                    <div className='flex items-center'>
                      <Calendar className='text-primary mr-2' size={16} />
                      <span>Start Date</span>
                    </div>
                    <span className='text-right'>12th January 2026</span>
                  </div>

                  <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                    <div className='flex items-center'>
                      <Grid className='text-primary mr-2' size={16} />
                      <span>Units</span>
                    </div>
                    <span className='text-right'>12</span>
                  </div>

                  <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                    <div className='flex items-center'>
                      <BookOpen className='text-primary mr-2' size={16} />
                      <span>Lectures</span>
                    </div>
                    <span className='text-right'>20</span>
                  </div>

                  <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                    <div className='flex items-center'>
                      <ChartColumn className='text-primary mr-2' size={16} />
                      <span>Category</span>
                    </div>
                    <span className='text-right'>Software</span>
                  </div>

                  <div className='mt-8'>
                    <Button size='sm' onClick={join}>
                      Join Course
                    </Button>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
