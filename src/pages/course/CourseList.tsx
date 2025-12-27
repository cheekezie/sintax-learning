import CourseCard from '@/components/course/CourseCard';
import CourseCardSkeleton from '@/components/course/CourseCardSkeleton';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import { Input } from '@/components/ui';
import { useCoursePublic } from '@/hooks/course.hook';
import { Search } from 'lucide-react';

const CourseList = () => {
  const searchChanged = () => {};

  const { isLoading, isFetching, error, data } = useCoursePublic();

  return (
    <>
      <NavBar />
      <main className=''>
        <div className='mb-8 bg-secondary py-[50px] px-8 pt-40'>
          <div className='max-w-xl mx-auto'>
            <h1 className='text-center mb-8 text-xl px-4 text-white'>
              Grow faster with expertly developed learning paths and courses
            </h1>
            <Input
              type='text'
              placeholder='search course'
              name='search'
              className='rounded-3xl'
              value=''
              icon={Search}
              onChange={searchChanged}
            />
          </div>
        </div>

        <div className='px-8'>
          <div className='mx-auto max-w-[1200px]'>
            <div className='grid md:grid-cols-3 gap-6 mb-10'>
              {/* ✅ Skeleton state */}
              {(isLoading || isFetching) &&
                Array.from({ length: 6 }).map((_, index) => <CourseCardSkeleton key={index} />)}

              {/* ✅ Loaded state */}
              {!isLoading && data?.courses.map((item, index) => <CourseCard data={item} style='card' key={index} />)}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CourseList;
