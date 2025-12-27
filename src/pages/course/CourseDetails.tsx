import { CoursePlaceholder } from '@/assets';
import CourseCardSkeleton from '@/components/course/CourseCardSkeleton';
import CourseDetailSekeleton from '@/components/course/CourseDetailSekeleton';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import EnrolmentModal from '@/components/modals/EnrolmentModal';
import { Button } from '@/components/ui';
import { useCourseDetail } from '@/hooks/course.hook';
import type { CurriculumI } from '@/interface';
import { formatDate } from '@/utils/dateFormatter';
import { formatCurrency } from '@/utils/formatCurrency';
import { Banknote, BookOpen, Calendar, ChartColumn, Grid, StarIcon, TimerIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Accordion({ items }: { items: CurriculumI[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              {item.outline.map((child, i) => (
                <li key={i}>{child.lesson.title ?? `Outline ${index + 1}`}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CourseDetailPage() {
  const [isEnrolOpen, setIsEnrolOpen] = useState(false);

  const { id } = useParams();

  const { course, isLoading, isFetching, isError } = useCourseDetail(id!);

  const onClose = () => {
    setIsEnrolOpen(false);
  };

  const join = () => {
    setIsEnrolOpen(true);
  };

  return (
    <>
      <EnrolmentModal isOpen={isEnrolOpen} onClose={onClose} />
      <NavBar />
      <div className='space-y-10 mb-12 '>
        {/* Header */}
        <header className='bg-[#0A1630] text-white py-16 px-6 text-center pt-40'>
          {!isFetching && <h1 className='text-4xl font-bold mb-3 capitalize'>{course?.title}</h1>}
          {isFetching && <div className='h-8 bg-gray-200 rounded-xl w-1/2 mb-3 mx-auto animate-pulse' />}

          <p className='text-gray-300 text-lg max-w-2xl mx-auto'>
            Grow faster with expertly developed learning paths and live classes.
          </p>
        </header>

        <div className='px-8'>
          <div className='mx-auto max-w-[1200px]'>
            {isFetching && <CourseDetailSekeleton />}

            {!isFetching && (
              <div className='grid md:grid-cols-[1fr_400px] gap-8'>
                <main>
                  <section>
                    <div className='w-full h-70 bg-gray-200 rounded-xl overflow-hidden mb-8'>
                      <div className='relative overflow-hidden h-full'>
                        <img
                          src={course?.bannerImage}
                          alt='Course'
                          className='w-full h-full object-cover'
                          onError={(e) => {
                            e.currentTarget.src = CoursePlaceholder;
                          }}
                        />

                        {/* Dark overlay */}
                        <div className='absolute inset-0 bg-black/30' />
                      </div>
                    </div>
                  </section>
                  <section className='space-y-3 mb-6'>
                    <h2 className='text-base font-semibold'>About the Course</h2>
                    <p className='text-gray-700 leading-relaxed whitespace-pre-line'>{course?.description}</p>
                  </section>

                  {/* What You Will Learn */}
                  <section className='mb-6'>
                    <h2 className='text-base font-semibold'>What You Will Learn</h2>
                    <ul className='list-disc pl-6 space-y-1 text-gray-700'>
                      {course?.learningOutcomes.map((curr, index) => (
                        <li key={index}>{curr}</li>
                      ))}
                    </ul>
                  </section>

                  <section className=''>
                    <h2 className='text-base font-semibold'>Course Curriculum</h2>
                    <Accordion items={course?.curriculum ?? []} />
                  </section>
                </main>
                <aside className='sticky top-12  h-fit'>
                  <section className='shadow-light py-8 px-6'>
                    <h2 className='text-secondary text-center mb-4 font-semibold'>
                      {formatCurrency(course?.pricing.amount, course?.pricing.currency)}
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
                      <span className='text-right'>{course?.level}</span>
                    </div>

                    <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                      <div className='flex items-center'>
                        <TimerIcon className='text-primary mr-2' size={16} />
                        <span>Duration</span>
                      </div>
                      <span className='text-right'>{course?.duration.week}</span>
                    </div>

                    <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                      <div className='flex items-center'>
                        <Calendar className='text-primary mr-2' size={16} />
                        <span>Start Date</span>
                      </div>
                      <span className='text-right'>{formatDate(course?.cohortStartDate)}</span>
                    </div>

                    <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                      <div className='flex items-center'>
                        <Grid className='text-primary mr-2' size={16} />
                        <span>Units</span>
                      </div>
                      <span className='text-right'>{course?.units}</span>
                    </div>

                    <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                      <div className='flex items-center'>
                        <BookOpen className='text-primary mr-2' size={16} />
                        <span>Lectures</span>
                      </div>
                      <span className='text-right'>{course?.totalLessons}</span>
                    </div>

                    <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                      <div className='flex items-center'>
                        <ChartColumn className='text-primary mr-2' size={16} />
                        <span>Category</span>
                      </div>
                      <span className='text-right capitalize'>{course?.category}</span>
                    </div>

                    <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                      <div className='flex items-center'>
                        <Banknote className='text-primary mr-2' size={16} />
                        <span>Payment</span>
                      </div>
                      <span className='text-right capitalize'>Flexible</span>
                    </div>

                    <div className='mt-8'>
                      <Button size='md' onClick={join}>
                        Join Course
                      </Button>
                    </div>
                  </section>
                </aside>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
