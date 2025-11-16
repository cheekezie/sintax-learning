import CourseCard from '@/components/course/CourseCard';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import { Input } from '@/components/ui';
import { Search } from 'lucide-react';

const List = [
  {
    title: 'Frontend Bootcamp',
    description:
      'Fast track your career in frontend development through this 4-week masterclass and learn the from the industry best',
    start_date: '20th January 2026',
    category: 'Software',
    amount: '£500.00',
    duration: '4 Weeks',
    level: 'Beginner',
    image:
      'https://store.altschoolafrica.com/docs/alt-Cybersecurity-Networking-and-System-Security-1757513056032639352.jpg',
  },
  {
    title: 'Fullstack Development',
    description:
      'Fast track your career in software development through this 12-week masterclass and learn the from the industry best',
    start_date: '20th January 2026',
    category: 'Software',
    amount: '£999.00',
    duration: '12 Weeks',
    level: 'Beginner',
    image: 'https://res.cloudinary.com/talentql-inc/image/upload/v1692886356/website/school_of_engineering_skyqdn.png',
  },
  {
    title: 'Product Design',
    description:
      'Fast track your career in product design through this 12-week masterclass and learn the from the industry best',
    start_date: '20th January 2026',
    category: 'Software',
    amount: '£699.00',
    duration: '12 Weeks',
    level: 'Beginner',
    image: 'https://store.altschoolafrica.com/docs/alt-FoundationsofProductManagement-1757512719639089174.jpg',
  },
  {
    title: 'Customer Support',
    description:
      'Fast track your career in product design through this 12-week masterclass and learn the from the industry best',
    start_date: '20th January 2026',
    category: 'Software',
    amount: '£699.00',
    duration: '12 Weeks',
    level: 'Beginner',
    image: 'https://res.cloudinary.com/talentql-inc/image/upload/v1693385554/mobile_content_Card_ct4ur4.png',
  },
];
const CourseList = () => {
  const searchChanged = () => {};
  return (
    <>
      <NavBar />
      <main className=''>
        <div className='mb-8 bg-secondary py-[50px] px-8'>
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
              {List.map((item, index) => (
                <CourseCard data={item} style='card' key={index} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CourseList;
