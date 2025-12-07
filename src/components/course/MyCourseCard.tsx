import { Link } from 'react-router-dom';

export interface prop {
  category: string;
  title: string;
  lessonsDone: 10;
  totalLessons: 20;
  color: string;
  avatars: string[];
}
const MyCourseCard = ({ category, title, lessonsDone, totalLessons, color = 'yellow', avatars = [] }: prop) => {
  const progress = (lessonsDone / totalLessons) * 100;

  return (
    <div className={`p-5 rounded-2xl border bg-${color}-200 relative overflow-hidden flex flex-col justify-between`}>
      <div>
        {/* Category */}
        <span className='text-xs px-3 py-1 bg-black text-white rounded-full'>{category}</span>

        {/* Title */}
        <h3 className='mt-4 text-lg font-semibold'>{title}</h3>
      </div>

      {/* Bottom Row: Avatars + Continue Button */}
      <div>
        {/* Progress Bar */}
        <div className='mt-4'>
          <div className='flex justify-between mb-2'>
            <span className='text-sm'>Progress</span>
            <span className='text-sm'>
              {' '}
              {lessonsDone}/{totalLessons} lessons
            </span>
          </div>
          <div className='w-full h-2 bg-white rounded-full overflow-hidden'>
            <div className='h-full bg-black' style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className='flex items-center justify-between mt-4'>
          {/* Left avatars */}
          <div className='flex -space-x-3'>
            {avatars.slice(0, 4).map((img, i) => (
              <img key={i} src={img} className='w-8 h-8 rounded-full border-2 border-white' />
            ))}

            {/* Extra count */}
            {avatars.length > 4 && (
              <div className='w-8 h-8 bg-gray-800 text-white flex items-center justify-center rounded-full border-2 border-white text-xs'>
                +{avatars.length - 4}
              </div>
            )}
          </div>

          {/* Continue */}
          <Link to={'/dashboard/course/3333'}>
            <button className='bg-primary text-white text-sm py-2 px-4 rounded-full'>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MyCourseCard;
