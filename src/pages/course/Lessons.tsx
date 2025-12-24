import LessonList from '@/components/course/LessonList';
import PageHeader from '@/components/dashboard/PageHeader';
import { ArrowLeft } from 'lucide-react';

const Lessons = () => {
  return (
    <section>
      <PageHeader title='My Lessons' />

      <LessonList />
    </section>
  );
};

export default Lessons;
