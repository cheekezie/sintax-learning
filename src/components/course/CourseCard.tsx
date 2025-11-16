import { BookOpen, Signal, Clock, CalendarDays, ArrowRight, Calendar } from 'lucide-react';

interface prop {
  data: any;
  style: 'card' | 'full';
}
export default function CourseCard({ data, style }: prop) {
  const { title, category, level, description, start_date, duration, image } = data;

  if (style === 'card') {
    return (
      <div className='w-full max-w-sm bg-white rounded-3xl shadow-md overflow-hidden border'>
        {/* IMAGE + TAGS */}
        <div className='relative'>
          <img src={image} alt='Course' className='w-full h-40 object-cover' />

          {/* Category */}
          <span className='absolute top-3 left-3 bg-white text-gray-700 text-sm px-3 py-1 rounded-full shadow'>
            {category}
          </span>

          {/* Credits */}
          <span className='absolute top-3 right-3 bg-white text-gray-700 text-sm px-3 py-1 rounded-full shadow'>
            12 Units
          </span>

          {/* Diploma Tag */}
          <span className='absolute bottom-3 right-3 bg-yellow-400 text-gray-800 text-sm px-3 py-1 rounded-md shadow'>
            Diploma
          </span>
        </div>

        {/* CONTENT */}
        <div className='p-5 border-b'>
          <h2 className='text-lg font-semibold text-gray-900 mb-1 line-clamp-1'>{title}</h2>

          <p className='text-gray-500 text-sm mb-3 line-clamp-2'>{description}</p>

          <div className='flex'>
            <div className='flex items-center text-gray-600 text-sm gap-2 mr-3'>
              <Calendar className='w-4 h-4' />
              {start_date}
            </div>
            <div className='flex items-center text-gray-600 text-sm gap-2'>
              <Clock className='w-4 h-4' />
              {duration}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className='flex items-center justify-between p-4'>
          <span className='text-gray-700 font-medium text-sm'>{level}</span>

          <button className='flex items-center gap-2 text-blue-600 font-semibold hover:underline'>
            Enroll <ArrowRight className='w-4 h-4' />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full rounded-2xl bg-white p-6 shadow-sm border flex items-start justify-between mb-4'>
      {/* LEFT SIDE */}
      <div className='flex-1'>
        {/* Category */}
        <div className='flex items-center text-primary font-medium text-sm mb-2'>
          <BookOpen className='w-4 h-4 mr-2 text-pink-600' />
          Course
        </div>

        {/* Title */}
        <h2 className='text-xl font-semibold mb-1'>{title}</h2>

        <h2 className='text-sm mb-1 truncate'>{description}</h2>

        {/* Author */}
        <p className='text-gray-500 text-sm mb-4'>by Kate Gregory</p>

        {/* Tags */}
        <div className='flex items-center gap-2'>
          <span className='bg-lime-300/70 text-black text-xs font-medium px-3 py-1 rounded'>{category}</span>
          <span className='border text-xs px-3 py-1 rounded font-medium'>Core Tech</span>
        </div>
      </div>

      {/* DIVIDER */}
      <div className='w-px bg-gray-200 mx-6' />

      {/* RIGHT SIDE INFO */}
      <div className='flex flex-col gap-4 text-sm'>
        {/* Level */}
        <div className='flex items-center gap-2 text-gray-700'>
          <Signal className='w-4 h-4 text-pink-600' />
          {level}
        </div>

        {/* Duration */}
        <div className='flex items-center gap-2 text-gray-700'>
          <Clock className='w-4 h-4 text-pink-600' />
          {duration}
        </div>

        {/* Date */}
        <div className='flex items-center gap-2 text-gray-700'>
          <CalendarDays className='w-4 h-4 text-pink-600' />
          {start_date}
        </div>
      </div>
    </div>
  );
}
