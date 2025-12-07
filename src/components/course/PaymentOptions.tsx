import { useState } from 'react';

export default function PaymentOptions({ baseAmount = 300000 }) {
  const [option, setOption] = useState('full');
  const [plan, setPlan] = useState('3');

  // Calculate pricing
  const fullAmount = baseAmount;

  const flexibleOptions: any = {
    '3': {
      label: 'Pay in 3 installments (+10%)',
      total: baseAmount * 1.1,
      installments: 3,
    },
    '2': {
      label: 'Pay in 2 installments (+5%)',
      total: baseAmount * 1.05,
      installments: 2,
    },
  };

  const selectedPlan = flexibleOptions[plan];
  const installmentAmount = selectedPlan.total / selectedPlan.installments;

  return (
    <div className='space-y-6 '>
      <h2 className='text-base font-semibold mb-4 text-dark'>Choose Payment Option</h2>

      {/* Full Payment */}
      <label className='flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50'>
        <input
          type='radio'
          name='payment'
          value='full'
          checked={option === 'full'}
          onChange={() => setOption('full')}
        />
        <div>
          <p className='font-medium text-lg'>Full Payment</p>
          <p className='text-gray-600'>Pay the full amount upfront.</p>
          <p className='text-green-600 font-semibold mt-1'>₦{fullAmount.toLocaleString()}</p>
        </div>
      </label>

      {/* Flexible Payment */}
      <label className='flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50'>
        <input
          type='radio'
          name='payment'
          value='flex'
          checked={option === 'flex'}
          onChange={() => setOption('flex')}
        />
        <div>
          <p className='font-medium text-lg'>Flexible Payment</p>
          <p className='text-gray-600'>Pay in installments every 2 weeks.</p>
        </div>
      </label>

      {option === 'flex' && (
        <div className='pl-10 space-y-4'>
          {/* Choose plan */}
          <select value={plan} onChange={(e) => setPlan(e.target.value)} className='border p-2 rounded-lg w-full'>
            <option value='3'>3 installments (+10%)</option>
            <option value='2'>2 installments (+5%)</option>
          </select>

          {/* Installment details */}
          <div className='p-4 bg-gray-100 rounded-xl'>
            <p className='font-medium'>{selectedPlan.label}</p>
            <p className='text-gray-700 mt-1'>
              Total: <strong>₦{selectedPlan.total.toLocaleString()}</strong>
            </p>
            <p className='text-gray-700'>
              Installment amount: <strong>₦{installmentAmount.toLocaleString()}</strong>
            </p>
            <p className='text-xs text-gray-500 mt-2'>Payments are due every 14 days (fortnightly).</p>
          </div>
        </div>
      )}
    </div>
  );
}
