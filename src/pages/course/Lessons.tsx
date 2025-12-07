import LessonList from '@/components/course/LessonList';

const Lessons = () => {
  return (
    <section>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-semibold'>My Lessons</h2>
      </div>

      <LessonList />
    </section>
  );
};

export default Lessons;
