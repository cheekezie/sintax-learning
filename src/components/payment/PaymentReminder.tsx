interface prop {
  title: string;
  total: number;
  paid: number;
  due: number;
  onPayNow: () => void;
}

const PaymentReminder = ({ total, paid, onPayNow }: prop) => {
  const due = total - paid;
  const progress = (paid / total) * 100;

  return (
    <div className='w-full rounded-2xl p-6 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-100'>
      {/* Title */}
      <h3 className='text-xl font-semibold text-gray-900 mb-4'>Payment Reminder</h3>

      {/* Numbers */}
      <div className='space-y-3 mb-5'>
        <div className='flex justify-between text-gray-600 text-sm'>
          <span>Total Amount</span>
          <span className='font-semibold text-gray-800 text-md'>₦{total.toLocaleString()}</span>
        </div>

        <div className='flex justify-between text-gray-600 text-sm'>
          <span>Paid</span>
          <span className='font-semibold text-green-600 tex-md'>₦{paid.toLocaleString()}</span>
        </div>
        <div className='flex justify-between text-gray-600 text-sm'>
          <span>Amount Due</span>
          <span className='font-semibold text-green-600 text-base'>₦{due.toLocaleString()}</span>
        </div>
      </div>

      {/* Pay Now */}
      <button onClick={onPayNow} className='w-full py-3 bg-secondary text-white font-medium rounded-full ext-md'>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentReminder;
