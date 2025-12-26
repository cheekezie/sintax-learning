// LessonCard.tsx
type Props = {
  title: string;
  instructor: string;
  time: string;
  duration: string;
  color?: 'green' | 'blue' | 'gray';
};

const colorMap = {
  green: 'border-l-green-700 bg-green-50 text-green-900',
  blue: 'border-l-blue-700 bg-blue-50 text-blue-900',
  gray: 'border-l-gray-400 bg-gray-50 text-gray-800',
};

const ScheduleCard = ({ title, instructor, time, duration, color = 'gray' }: Props) => {
  return (
    <div className={`rounded-lg border-l-4 p-3 mb-3 shadow-sm ${colorMap[color]}`}>
      <p className='text-sm font-semibold'>{time}</p>
      <p className='text-base font-bold'>{title}</p>
      <p className='text-sm opacity-80'>{instructor}</p>
      <p className='text-xs mt-1'>{duration}</p>
    </div>
  );
};

export default ScheduleCard;
