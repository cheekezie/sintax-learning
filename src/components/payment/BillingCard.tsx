import { ArrowRight, Download } from 'lucide-react';

export interface prop {
  plan: string;
  title: string;
  status: string;
  amountDue: number;
  nextDueDate: string;
  totalAmount: number;
  paid: number;
}

const statusColors: any = {
  pending: 'bg-orange-100 text-orange-700',
  progress: 'bg-blue-100 text-blue-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
};

const BillingCard = ({ plan, title, totalAmount, status, amountDue, paid, nextDueDate }: prop) => {
  const payNow = () => {};
  return (
    <div
      className={`p-5 rounded-2xl border bg-white relative overflow-hidden flex flex-col justify-between shadow-light`}
    >
      <div>
        <div className='flex justify-between'>
          {/* Plan badge */}
          <span className='text-xs px-3 py-1 bg-gray-900 text-white rounded-full'>{plan}</span>

          {/* Status badge with dynamic colors */}
          <span
            className={`text-xs px-3 py-1 rounded-full capitalize ${
              statusColors[status] || 'bg-gray-200 text-gray-700'
            }`}
          >
            {status}
          </span>
        </div>

        {/* Title */}
        <h3 className='mt-4 text-lg font-semibold'>{title}</h3>
      </div>

      <div className='border-b border-b-gray-300 my-3' />
      <div className='flex justify-between mb-3'>
        <span className='text-md'>Total Amount</span>
        <span className='text-md font-semibold'>₦{totalAmount.toLocaleString()}</span>
      </div>
      <div className='flex justify-between mb-3'>
        <span className='text-md'>Total Paid</span>
        <span className='text-md font-semibold'>₦{paid.toLocaleString()}</span>
      </div>
      <div className='flex justify-between mb-3'>
        <span className='text-md'>Total Due</span>
        <span className='text-md font-semibold'>₦{amountDue.toLocaleString()}</span>
      </div>
      <div className='flex justify-between mb-3'>
        <span className='text-md'>Next Due Date</span>
        <span className='text-md font-semibold'>{nextDueDate}</span>
      </div>
      <div className='border-b border-b-gray-300 my-3' />
      <div>
        <div className='flex items-center justify-between mt-4'>
          <button className='flex items-center gap-2 text-secondary font-semibold hover:underline text-md'>
            Receipt <Download className='w-4 h-4' />
          </button>

          <button className='bg-primary text-white text-md py-2 px-4 rounded-full flex items-center' onClick={payNow}>
            Pay Now
            <ArrowRight className='w-4 h-4 ml-2' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingCard;
