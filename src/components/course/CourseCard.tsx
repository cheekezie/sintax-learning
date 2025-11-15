import { BookOpen, Signal, Clock, CalendarDays } from 'lucide-react';

export default function CourseCard() {
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
        <h2 className='text-xl font-semibold mb-1'>C++ Foundations: Memory Management</h2>

        {/* Author */}
        <p className='text-gray-500 text-sm mb-4'>by Kate Gregory</p>

        {/* Tags */}
        <div className='flex items-center gap-2'>
          <span className='bg-lime-300/70 text-black text-xs font-medium px-3 py-1 rounded'>Libraries</span>
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
          Beginner
        </div>

        {/* Duration */}
        <div className='flex items-center gap-2 text-gray-700'>
          <Clock className='w-4 h-4 text-pink-600' />
          1h
        </div>

        {/* Date */}
        <div className='flex items-center gap-2 text-gray-700'>
          <CalendarDays className='w-4 h-4 text-pink-600' />
          19 Dec 2025
        </div>
      </div>
    </div>
  );
}
