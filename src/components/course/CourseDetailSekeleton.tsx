interface prop {
  type?: 'dashboard' | 'default';
}

export default function CourseDetailSekeleton({ type = 'default' }: prop) {
  if (type === 'dashboard') {
    return (
      <div className='grid md:grid-cols-[1fr_400px] gap-8'>
        <div className='animate-pulse rounded-xl border border-gray-200 p-4'>
          {/* Image */}
          <div className='h-70 w-full rounded-lg bg-gray-200 mb-4' />

          {/* Description */}
          <div className='h-3 bg-gray-200 rounded w-full mb-2' />
          <div className='h-3 bg-gray-200 rounded w-full mb-2' />
          <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />
          <div className='h-4 bg-gray-200 rounded w-2/4 mb-2' />
          <div className='h-4 bg-gray-200 rounded w-1/4 mb-2' />
          {/* Description */}
          <div className='h-3 bg-gray-200 rounded w-1/2 mb-4' />

          {/* Outcomes */}
          <div className='h-4 bg-gray-200 rounded w-2/4 mb-2' />
          <div className='h-4 bg-gray-200 rounded w-2/4 mb-2' />
          <div className='h-4 bg-gray-200 rounded w-2/4 mb-2' />

          {/* Outline */}
          <div className='h-4 bg-gray-200 rounded w-full mb-2' />
          <div className='h-4 bg-gray-200 rounded w-full mb-2' />
          <div className='h-4 bg-gray-200 rounded w-full mb-2' />
        </div>

        <div className='animate-pulse rounded-xl border border-gray-200 p-4'>
          <div className='h-4 bg-gray-200 rounded w-full mb-3' />
          <div className='h-4 bg-gray-200 rounded w-full mb-3' />

          <div className='h-4 bg-gray-200 rounded w-full mb-3' />
          <div className='h-4 bg-gray-200 rounded w-full mb-3' />

          {/* Button */}
          <div className='flex justify-end mt-4 mb-3'>
            <div className='h-3 bg-gray-200 rounded w-20' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='grid md:grid-cols-[1fr_400px] gap-8'>
      <div className='animate-pulse rounded-xl border border-gray-200 p-4'>
        {/* Image */}
        <div className='h-70 w-full rounded-lg bg-gray-200 mb-4' />

        {/* Description */}
        <div className='h-3 bg-gray-200 rounded w-full mb-2' />
        <div className='h-3 bg-gray-200 rounded w-full mb-2' />
        <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />
        <div className='h-4 bg-gray-200 rounded w-2/4 mb-2' />
        <div className='h-4 bg-gray-200 rounded w-1/4 mb-2' />
        {/* Description */}
        <div className='h-3 bg-gray-200 rounded w-1/2 mb-4' />

        {/* Outcomes */}
        <div className='h-4 bg-gray-200 rounded w-2/4 mb-2' />
        <div className='h-4 bg-gray-200 rounded w-2/4 mb-2' />
        <div className='h-4 bg-gray-200 rounded w-2/4 mb-2' />

        {/* Outline */}
        <div className='h-4 bg-gray-200 rounded w-full mb-2' />
        <div className='h-4 bg-gray-200 rounded w-full mb-2' />
        <div className='h-4 bg-gray-200 rounded w-full mb-2' />
      </div>

      <div className='animate-pulse rounded-xl border border-gray-200 p-4'>
        <div className='h-5 bg-gray-200 rounded w-1/2 mb-3 mx-auto' />
        {Array.from({ length: 6 }).map(() => (
          <div className='h-8 bg-gray-200 rounded w-full mb-4' />
        ))}

        {/* Button */}
        <div className='h-10 bg-gray-200 rounded-2xl w-full mb-3 mt-6' />
      </div>
    </div>
  );
}
