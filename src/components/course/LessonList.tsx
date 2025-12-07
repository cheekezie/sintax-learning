const LessonList = () => {
  return (
    <div className='rounded-xl border bg-white overflow-hidden'>
      <table className='w-full text-left'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-4'>Lesson</th>
            <th className='p-4'>Teacher</th>
            <th className='p-4'>Date</th>
            <th className='p-4'>Duration</th>
            <th className='p-4'>Status</th>
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
            <td className='p-4'>completed</td>
          </tr>

          <tr className='border-t'>
            <td className='p-4'>
              <p className='font-medium'>03. Foundations of Public Speaking</p>
              <p className='text-sm text-gray-500'>Public Speaking and Leadership</p>
            </td>
            <td className='p-4'>Saira Goodman</td>
            <td className='p-4'>12 January 2026</td>
            <td className='p-4'>40 min</td>
            <td className='p-4'>missed</td>
          </tr>

          <tr className='border-t'>
            <td className='p-4'>
              <p className='font-medium'>05. Getting to know Adobe Illustrator</p>
              <p className='text-sm text-gray-500'>Digital Illustration with Adobe Illustrator</p>
            </td>
            <td className='p-4'>Tony Ware</td>
            <td className='p-4'>12 January 2026</td>
            <td className='p-4'>1h 08 min</td>
            <td className='p-4'>upcoming</td>
          </tr>

          <tr className='border-t'>
            <td className='p-4'>
              <p className='font-medium'>11. Understanding audience psychology</p>
              <p className='text-sm text-gray-500'>Public Speaking: Basic course</p>
            </td>
            <td className='p-4'>Mya Guzman</td>
            <td className='p-4'>12 January 2026</td>
            <td className='p-4'>26 min</td>
            <td className='p-4'>upcoming</td>
          </tr>

          <tr className='border-t'>
            <td className='p-4'>
              <p className='font-medium'>04. The importance of self reflection</p>
              <p className='text-sm text-gray-500'>Psychology of influence</p>
            </td>
            <td className='p-4'>Zohaib Osborn</td>
            <td className='p-4'>12 January 2026</td>
            <td className='p-4'>23 min</td>
            <td className='p-4'>upcoming</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LessonList;
