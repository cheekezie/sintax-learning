import { useNavigate } from 'react-router-dom';
import MyCourseCard from '../../components/course/MyCourseCard';
import PaymentReminder from '../../components/payment/PaymentReminder';

const MyCourses: any[] = [
  {
    category: 'software',
    title: 'Fullstack development bootcamp',
    lessonsDone: 0,
    totalLessons: 10,
    color: 'yellow',
    avatars: [
      'https://randomuser.me/api/portraits/women/10.jpg',
      'https://randomuser.me/api/portraits/men/12.jpg',
      'https://randomuser.me/api/portraits/women/15.jpg',
      'https://randomuser.me/api/portraits/men/16.jpg',
      'https://randomuser.me/api/portraits/men/17.jpg',
    ],
  },
  {
    category: 'software',
    title: 'Frontend development bootcamp',
    lessonsDone: 6,
    totalLessons: 10,
    color: 'yellow',
    avatars: [
      'https://randomuser.me/api/portraits/women/10.jpg',
      'https://randomuser.me/api/portraits/men/12.jpg',
      'https://randomuser.me/api/portraits/women/15.jpg',
      'https://randomuser.me/api/portraits/men/16.jpg',
      'https://randomuser.me/api/portraits/men/17.jpg',
    ],
  },
  {
    category: 'software',
    title: 'Product Design - UI/UX',
    lessonsDone: 0,
    totalLessons: 10,
    color: 'yellow',
    avatars: [
      'https://randomuser.me/api/portraits/women/10.jpg',
      'https://randomuser.me/api/portraits/men/12.jpg',
      'https://randomuser.me/api/portraits/women/15.jpg',
      'https://randomuser.me/api/portraits/men/16.jpg',
      'https://randomuser.me/api/portraits/men/17.jpg',
    ],
  },
];

export default function DashboardHome() {
  const navigate = useNavigate();

  const payNow = () => {
    navigate(`/billing`);
  };

  const goToLessosns = () => {
    navigate(`/my-courses/lessons`);
  };

  return (
    <div className='w-full space-y-10'>
      <PaymentReminder title='You have outstanding payments' total={3000} paid={0} due={3000} onPayNow={payNow} />

      {/* My Courses */}
      <section>
        <h2 className='text-2xl font-semibold mb-4'>My courses</h2>

        <div className={`grid gap-4 ${MyCourses.length > 3 ? 'md:grid-cols-3' : `md:grid-cols-${MyCourses.length}`}`}>
          {/* Course Card */}

          {MyCourses.map((course, i) => (
            <MyCourseCard
              key={i}
              category={course.category}
              title={course.title}
              lessonsDone={course.lessonsDone}
              totalLessons={course.totalLessons}
              color='white'
              avatars={course.avatars}
            />
          ))}
        </div>
      </section>

      {/* My Next Lessons */}
      <section>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-2xl font-semibold'>My next lessons</h2>
          <button className='text-blue-600 font-medium' onClick={goToLessosns}>
            View all lessons
          </button>
        </div>

        <div className='rounded-xl border bg-white overflow-hidden'>
          <table className='w-full text-left'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='p-4'>Lesson</th>
                <th className='p-4'>Teacher</th>
                <th className='p-4'>Date</th>
                <th className='p-4'>Duration</th>
              </tr>
            </thead>

            <tbody className='text-md'>
              <tr className='border-t'>
                <td className='p-4'>
                  <p className='font-medium'>01. Introduction to Creative Writing</p>
                  <p className='text-sm text-gray-500'>Creative writing for beginners</p>
                </td>
                <td className='p-4'>Conner Garcia</td>
                <td className='p-4'>12 January 2026</td>
                <td className='p-4'>22 min</td>
              </tr>

              <tr className='border-t'>
                <td className='p-4'>
                  <p className='font-medium'>03. Foundations of Public Speaking</p>
                  <p className='text-sm text-gray-500'>Public Speaking and Leadership</p>
                </td>
                <td className='p-4'>Saira Goodman</td>
                <td className='p-4'>12 January 2026</td>
                <td className='p-4'>40 min</td>
              </tr>

              <tr className='border-t'>
                <td className='p-4'>
                  <p className='font-medium'>05. Getting to know Adobe Illustrator</p>
                  <p className='text-sm text-gray-500'>Digital Illustration with Adobe Illustrator</p>
                </td>
                <td className='p-4'>Tony Ware</td>
                <td className='p-4'>12 January 2026</td>
                <td className='p-4'>1h 08 min</td>
              </tr>

              <tr className='border-t'>
                <td className='p-4'>
                  <p className='font-medium'>11. Understanding audience psychology</p>
                  <p className='text-sm text-gray-500'>Public Speaking: Basic course</p>
                </td>
                <td className='p-4'>Mya Guzman</td>
                <td className='p-4'>12 January 2026</td>
                <td className='p-4'>26 min</td>
              </tr>

              <tr className='border-t'>
                <td className='p-4'>
                  <p className='font-medium'>04. The importance of self reflection</p>
                  <p className='text-sm text-gray-500'>Psychology of influence</p>
                </td>
                <td className='p-4'>Zohaib Osborn</td>
                <td className='p-4'>12 January 2026</td>
                <td className='p-4'>23 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
