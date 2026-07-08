import MyCourseCard from '../../components/course/MyCourseCard';
import PaymentReminder from '../../components/payment/PaymentReminder';
import { ComponentLoading } from '../../components/ui/LoadingSpinner';
import { useGetEnrollments } from '../course/course.query';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardHome() {
  const navigate = useNavigate();
  const { data: enrollmentPage, isLoading } = useGetEnrollments({ page: 1, limit: 20 });
  const enrollments = enrollmentPage?.data ?? [];

  const hasPendingPayment = enrollments.some((e) => e.totalPaid < e.amount);
  const totalAmount = enrollments.reduce((sum, e) => sum + e.amount, 0);
  const totalPaid = enrollments.reduce((sum, e) => sum + e.totalPaid, 0);
  const totalDue = totalAmount - totalPaid;

  // Flatten all upcoming lessons across all enrolled courses
  const upcomingLessons = enrollments
    .flatMap((e) =>
      (e.course.curriculum ?? []).flatMap((section) =>
        (section.outline ?? []).map((item) => ({
          lesson: item.lesson,
          courseTitle: e.course.title,
        })),
      ),
    )
    .slice(0, 5);

  return (
    <div className='w-full space-y-10'>
      {hasPendingPayment && (
        <PaymentReminder
          title='You have outstanding payments'
          total={totalAmount}
          paid={totalPaid}
          due={totalDue}
          onPayNow={() => navigate('/billing')}
        />
      )}

      {/* My Courses */}
      <section>
        <h2 className='text-2xl font-semibold mb-4'>My courses</h2>

        {isLoading ? (
          <div className='flex justify-center py-12'>
            <ComponentLoading size='lg' />
          </div>
        ) : enrollments.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-gray-400'>
            <BookOpen className='w-12 h-12 mb-3' />
            <p className='text-lg font-medium'>No courses yet</p>
            <p className='text-sm'>Your enrolled courses will appear here.</p>
          </div>
        ) : (
          <div
            className={`grid gap-4 ${enrollments.length >= 3 ? 'md:grid-cols-3' : `md:grid-cols-${enrollments.length}`}`}
          >
            {enrollments.map((enrollment) => {
              const totalLessons =
                enrollment.course.curriculum?.reduce((sum, section) => sum + (section.outline?.length ?? 0), 0) ?? 0;
              const lessonsDone = Math.round((enrollment.progress / 100) * totalLessons);

              return (
                <MyCourseCard
                  key={enrollment._id}
                  category={enrollment.course.category}
                  title={enrollment.course.title}
                  lessonsDone={enrollment.lessonsCompleted}
                  totalLessons={enrollment.totalLessons}
                  color='white'
                  enrolleeCount={enrollment.enrollees.length}
                  avatars={enrollment.enrollees?.map((i) => i?.avatar ?? i?.avatar)}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* My Next Lessons */}
      <section>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-2xl font-semibold'>My next lessons</h2>
          <button className='text-blue-600 font-medium' onClick={() => navigate('/my-courses/lessons')}>
            View all lessons
          </button>
        </div>

        <div className='rounded-xl border bg-white overflow-hidden'>
          <table className='w-full text-left'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='p-4'>Lesson</th>
                <th className='p-4'>Course</th>
                <th className='p-4'>Duration</th>
              </tr>
            </thead>
            <tbody className='text-md'>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className='p-8 text-center'>
                    <ComponentLoading size='sm' />
                  </td>
                </tr>
              ) : upcomingLessons.length === 0 ? (
                <tr>
                  <td colSpan={3} className='p-10 text-center text-gray-400'>
                    No lessons available yet.
                  </td>
                </tr>
              ) : (
                upcomingLessons.map(({ lesson, courseTitle }, i) => (
                  <tr key={i} className='border-t hover:bg-gray-50 transition-colors'>
                    <td className='p-4'>
                      <p className='font-medium'>{lesson.title}</p>
                      <p className='text-sm text-gray-500 capitalize'>{lesson.mode?.replace(/-/g, ' ')}</p>
                    </td>
                    <td className='p-4 text-gray-600'>{courseTitle}</td>
                    <td className='p-4 text-gray-500'>
                      {lesson.estimatedDuration ? `${lesson.estimatedDuration} min` : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
