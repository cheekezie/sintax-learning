interface prop {
  type?: 'enrolled' | 'default';
}
export default function CourseCardSkeleton({ type = 'default' }: prop) {
  if (type === 'enrolled') {
    return (
      <div className='animate-pulse rounded-xl border border-gray-200 p-4'>
        {/* Image */}
        <div className='h-40 w-full rounded-lg bg-gray-200 mb-4' />

        {/* Title */}
        <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />
        {/* Description */}
        <div className='h-3 bg-gray-200 rounded w-1/2 mb-4' />

        {/* Meta */}
        <div className='flex gap-2'>
          <div className='h-3 bg-gray-200 rounded w-full' />
          <div className='h-3 bg-gray-200 rounded w-full' />
        </div>
        {/* Button */}
        <div className='flex justify-end mt-4 mb-3'>
          <div className='h-3 bg-gray-200 rounded w-20' />
        </div>
      </div>
    );
  }

  return (
    <div className='animate-pulse rounded-xl border border-gray-200 p-4'>
      {/* Image */}
      <div className='h-40 w-full rounded-lg bg-gray-200 mb-4' />

      {/* Title */}
      <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />

      {/* Description */}
      <div className='h-3 bg-gray-200 rounded w-3.5/4 mb-4' />

      {/* Meta */}
      <div className='flex gap-2'>
        <div className='h-3 bg-gray-200 rounded w-full' />
        <div className='h-3 bg-gray-200 rounded w-full' />
      </div>
      {/* Button */}
      <div className='flex justify-end mt-4 mb-3'>
        <div className='h-3 bg-gray-200 rounded w-20' />
      </div>
    </div>
  );
}
