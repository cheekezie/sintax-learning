import LessonCalendar from '@/components/course/LessonCalendar';
import LessonList from '@/components/course/LessonList';
import PageHeader from '@/components/dashboard/PageHeader';
import { ArrowLeft } from 'lucide-react';

const Lessons = () => {
  return (
    <section>
      <PageHeader title='My Lessons' />

      {/* <LessonList /> */}
      <LessonCalendar />
    </section>
  );
};

export default Lessons;
