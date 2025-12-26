import { useMemo, useState } from 'react';

/* ================= TYPES ================= */

type LessonColor = 'green' | 'blue' | 'gray';

interface LessonI {
  id: number;
  title: string;
  instructor: string;
  time?: string; // optional → TBD
  duration: string;
  date: string;
  color: LessonColor;
}

/* ================= DATA ================= */

const lessons: LessonI[] = [
  {
    id: 1,
    title: 'Test API',
    instructor: 'Stephen',
    time: '14:00',
    duration: '1h',
    date: '2025-12-01',
    color: 'green',
  },
  {
    id: 1,
    title: 'Test API',
    instructor: 'Stephen',
    time: '14:00',
    duration: '1h',
    date: '2025-12-02',
    color: 'green',
  },
  {
    id: 1,
    title: 'Test API',
    instructor: 'Stephen',
    time: '14:00',
    duration: '1h',
    date: '2025-12-10',
    color: 'green',
  },
  {
    id: 2,
    title: 'Meeting',
    instructor: 'Unassigned',
    duration: '1h',
    date: '2025-12-27',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Client meeting',
    instructor: 'Mico',
    time: '09:00',
    duration: '2h',
    date: '2025-12-27',
    color: 'green',
  },
];

/* ================= STYLES ================= */

const colorMap: Record<LessonColor, string> = {
  green: 'border-l-green-700 bg-green-50',
  blue: 'border-l-blue-700 bg-blue-50',
  gray: 'border-l-gray-400 bg-gray-50',
};

/* ================= HELPERS ================= */

const startOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay() || 7; // Sunday = 7
  if (day !== 1) d.setDate(d.getDate() - (day - 1));
  d.setHours(0, 0, 0, 0);
  return d;
};

const getMonthWeeks = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const weeks: Date[] = [];
  let current = startOfWeek(firstDay);

  while (current <= lastDay) {
    weeks.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }

  return weeks.slice(0, 4); // default 4 weeks
};

/* ================= COMPONENT ================= */

const LessonCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const weeks = useMemo(() => getMonthWeeks(year, month), [year, month]);

  const lessonsByWeek = (weekStart: Date) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.date);
      return lessonDate >= weekStart && lessonDate <= weekEnd;
    });
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <button onClick={() => changeMonth(-1)} className='px-3 py-1 rounded bg-white shadow'>
          ←
        </button>

        <h1 className='text-xl font-bold'>
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h1>

        <button onClick={() => changeMonth(1)} className='px-3 py-1 rounded bg-white shadow'>
          →
        </button>
      </div>

      {/* Weeks */}
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {weeks.map((weekStart, index) => {
          const weekLessons = lessonsByWeek(weekStart);

          return (
            <div key={index} className='bg-white rounded-xl shadow p-4'>
              <p className='font-semibold mb-3'>
                Week {index + 1} <span className='text-sm text-gray-500'>({weekStart.toDateString()})</span>
              </p>

              {weekLessons.length === 0 && <p className='text-sm text-gray-400'>No lessons</p>}

              {weekLessons.map((lesson) => (
                <div key={lesson.id} className={`border-l-4 p-3 mb-3 rounded ${colorMap[lesson.color]}`}>
                  <p className='text-xs text-gray-500'>
                    {new Date(lesson.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                    })}
                  </p>

                  <p className='font-semibold'>{lesson.title}</p>

                  <p className='text-sm text-gray-700'>{lesson.time ?? 'TBD'}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonCalendar;
