import CourseCard from '@/components/course/CourseCard';
import NavBar from '@/components/layout/NavBar';
import { Input } from '@/components/ui';
import { Search } from 'lucide-react';

const CourseList = () => {
  const searchChanged = () => {};
  return (
    <>
      <NavBar />
      <main className=''>
        <div className='mb-8 bg-secondary py-[50px] '>
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
            <div className=''>
              <CourseCard />
              <CourseCard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CourseList;
