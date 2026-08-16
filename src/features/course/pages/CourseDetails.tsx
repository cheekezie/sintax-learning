import { CoursePlaceholder } from '@/assets';
import CourseCardSkeleton from '@/components/course/CourseCardSkeleton';
import CourseDetailSekeleton from '@/components/course/CourseDetailSekeleton';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import EnrolmentModal from '@/components/modals/EnrolmentModal';
import { Button } from '@/components/ui';
import { useCourseDetail } from '@/features/course/course.query';
import type { CurriculumI } from '@/interface';
import { formatDate } from '@/utils/dateFormatter';
import { formatCurrency } from '@/utils/formatCurrency';
import {
  ArrowLeft,
  Banknote,
  BookOpen,
  Calendar,
  ChartColumn,
  CheckCircle,
  ChevronDown,
  Grid,
  PlayCircle,
  StarIcon,
  TimerIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Accordion({ items }: { items: CurriculumI[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='space-y-3'>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`rounded-xl border transition-colors ${
              isOpen ? 'border-primary/30 bg-primary-50' : 'border-gray-200 bg-white'
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className='w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer'
            >
              <div className='flex items-center gap-4 min-w-0'>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className='min-w-0'>
                  <h3 className='font-semibold text-gray-900 truncate'>{item.title}</h3>
                  <p className='text-xs text-gray-500 mt-0.5'>
                    {item.outline.length} lesson{item.outline.length === 1 ? '' : 's'}
                  </p>
                </div>
              </div>

              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>

            <div
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className='overflow-hidden'>
                <ul className='space-y-1 px-5 pb-5 pl-[52px]'>
                  {item.outline.map((child, i) => (
                    <li key={i} className='flex items-center gap-2.5 py-1.5 text-sm text-gray-700'>
                      <PlayCircle className='h-4 w-4 shrink-0 text-primary/70' />
                      {child.title ?? `Outline ${index + 1}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CourseDetailPage() {
  const [isEnrolOpen, setIsEnrolOpen] = useState(false);

  const { id } = useParams();

  const { course, nextCohort, isLoading, isFetching } = useCourseDetail(id!);

  const onClose = () => {
    setIsEnrolOpen(false);
  };

  const join = () => {
    setIsEnrolOpen(true);
  };

  return (
    <>
      <EnrolmentModal
        isOpen={isEnrolOpen}
        locations={course?.locationAvailability ?? []}
        availability={course?.availability ?? []}
        courseId={id ?? ''}
        currentCohort={nextCohort?._id ?? ''}
        onClose={onClose}
      />

      <NavBar />

      <div className='space-y-8 mb-12 '>
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
            <Link to={'/courses'} className='inline-block mb-3'>
              <button className='flex items-center gap-2 text-black font-semibold'>
                <ArrowLeft className='w-4 h-4' /> Back to Courses
              </button>
            </Link>

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
                    <ul className='list-disc pl-6 space-y-1 text-gray-700 text-md'>
                      {course?.learningOutcomes.map((curr, index) => (
                        <li key={index}>{curr}</li>
                      ))}
                    </ul>
                  </section>

                  <section className='mb-6'>
                    <div className='mb-4'>
                      <h2 className='text-base font-semibold'>Course Curriculum</h2>
                      <p className='text-sm text-gray-500 mt-1'>
                        {course?.curriculum?.length ?? 0} module{course?.curriculum?.length === 1 ? '' : 's'}
                        {course?.totalLessons ? ` • ${course.totalLessons} lessons` : ''}
                      </p>
                    </div>
                    <Accordion items={course?.curriculum ?? []} />
                  </section>

                  <section className='mt-6'>
                    <h2 className='text-base font-semibold'>Capstone Project</h2>
                    <p className='text-md text-gray-700'>{course?.project.title}</p>
                    <p className='text-md text-gray-700'>{course?.project.description}</p>
                    <ul className='list-disc pl-6 space-y-1 text-gray-700'>
                      {course?.project.milestones.map((curr, index) => (
                        <li key={index} className='text-md'>
                          {curr.title}
                        </li>
                      ))}
                    </ul>
                  </section>
                </main>
                <aside className='sticky top-12  h-fit'>
                  <section className='shadow-light py-8 px-6'>
                    <h2 className='text-secondary text-center mb-4 font-semibold'>
                      <span className='text-dark text-md'>From</span>{' '}
                      {course?.discount && (
                        <span className='line-through text-gray-500 mr-3 text-sm'>
                          {formatCurrency(course?.discount.originalPrice, course?.pricing.currency)}
                        </span>
                      )}
                      {formatCurrency(course?.pricing.amount, course?.pricing.currency)}
                      {course?.discount && (
                        <span className='bg-primary rounded-4xl text-sm text-white ml-6 px-3 py-1 font-normal'>
                          {course?.discount.percentage}% OFF
                        </span>
                      )}
                    </h2>

                    <div className='border-b border-b-gray-200' />
                    <div className='grid grid-cols-2 items-center py-4 text-md border-b border-b-gray-200'>
                      <div className='flex items-center'>
                        <StarIcon className='text-primary mr-2' size={16} />
                        <span>Course Level</span>
                      </div>
                      <span className='text-right capitalize'>{course?.level}</span>
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
                        <CheckCircle className='text-primary mr-2' size={16} />
                        <span>Availability</span>
                      </div>
                      <span className='text-right capitalize'>{course?.availability?.join(', ')}</span>
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
