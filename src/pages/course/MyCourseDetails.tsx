import { useState } from 'react';
import LessonList from '../../components/course/LessonList';
import Assignments from '../../components/course/Assignments';
import Instrcutors from '../../components/course/Instructors';
import Projects from '../../components/course/Projects';

const tabs = ['Lessons', 'Assignments', 'Projects', 'Instructors'];

const course = {
  category: 'software',
  title: 'Fullstack development bootcamp',
  description: 'Fullstack development bootcamp',
  lessonsDone: 0,
  totalLessons: 10,
  duration: '2 mins',
  color: 'yellow',
  instructor: 'Harrison Ugwu',
  banner:
    'https://store.altschoolafrica.com/docs/alt-Cybersecurity-Networking-and-System-Security-1757513056032639352.jpg',
  avatars: [
    'https://randomuser.me/api/portraits/women/10.jpg',
    'https://randomuser.me/api/portraits/men/12.jpg',
    'https://randomuser.me/api/portraits/women/15.jpg',
    'https://randomuser.me/api/portraits/men/16.jpg',
    'https://randomuser.me/api/portraits/men/17.jpg',
  ],
};
export default function MyCourseDetails() {
  const [activeTab, setActiveTab] = useState('Lessons');

  return (
    <div className='w-full space-y-8'>
      {/* Course Header Card */}
      <div className='w-full bg-white rounded-2xl border shadow-sm p-6'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          {/* Text Section */}
          <div>
            <span className='text-xs px-3 py-1 bg-gray-900 text-white rounded-full'>{course.category}</span>

            <h1 className='text-2xl font-semibold text-gray-900 mt-3'>{course.title}</h1>

            <p className='text-gray-600 mt-2 max-w-2xl'>{course.description}</p>

            <div className='flex items-center gap-4 mt-4 text-sm text-gray-700'>
              <span>{course.totalLessons} Lessons</span>
              <span>•</span>
              <span>{course.duration}</span>
              <span>•</span>
              <span>By {course.instructor}</span>
            </div>
          </div>

          {/* Image */}
          <img src={course.banner} alt={course.title} className='w-full md:w-60 h-32 object-cover rounded-xl border' />
        </div>
      </div>

      {/* Content */}
      <div>
        {/* Tabs */}
        <div className='border-b border-gray-200 flex gap-8 text-sm overflow-x-auto'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 whitespace-nowrap ${
                activeTab === tab
                  ? 'font-semibold text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className='mt-4'>
          {activeTab === 'Lessons' && <LessonList />}
          {activeTab === 'Assignments' && <Assignments />}
          {activeTab === 'Projects' && <Projects />}
          {activeTab === 'Instructors' && <Instrcutors />}
        </div>
      </div>
    </div>
  );
}
