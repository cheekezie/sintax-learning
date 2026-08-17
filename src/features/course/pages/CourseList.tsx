import CourseCard from '@/components/course/CourseCard';
import CourseCardSkeleton from '@/components/course/CourseCardSkeleton';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import CourseEnquiryModal from '@/components/modals/CourseEnquiryModal';
import { Input } from '@/components/ui';
import { useCoursePublic } from '@/features/course/course.query';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CourseList = () => {
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');

  // Keep in sync if the URL's search param changes from outside this page (e.g. navbar search)
  useEffect(() => {
    setSearch(searchParams.get('search') ?? '');
  }, [searchParams]);

  const searchChanged = (value: string) => {
    setSearch(value);
    setSearchParams(value ? { search: value } : {}, { replace: true });
  };

  const { isLoading, isFetching, error, data } = useCoursePublic();

  const courses = useMemo(() => {
    if (!data?.courses) return [];
    const term = search.trim().toLowerCase();
    if (!term) return data.courses;

    return data.courses.filter((course) =>
      [course.title, course.category, ...(course.tags ?? [])].some((field) => field?.toLowerCase().includes(term)),
    );
  }, [data?.courses, search]);

  const onEnquire = (id: string) => {
    setEnquireOpen(!enquireOpen);
    setCourseId(id);
  };

  const enquiryTracks = useMemo(
    () => data?.courses.find((c) => c._id === courseId)?.tracks ?? [],
    [data?.courses, courseId],
  );

  return (
    <>
      <CourseEnquiryModal
        isOpen={enquireOpen}
        courseId={courseId}
        tracks={enquiryTracks}
        onClose={() => setEnquireOpen(false)}
      />

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
              value={search}
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
              {!isLoading &&
                courses.map((item, index) => <CourseCard data={item} style='card' key={index} onEnquire={onEnquire} />)}
            </div>

            {!isLoading && !isFetching && courses.length === 0 && (
              <p className='text-center text-gray-500 py-10'>No courses match "{search}".</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CourseList;
