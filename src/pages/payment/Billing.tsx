import BillingCard from '@/components/payment/BillingCard';
import { ArrowRight } from 'lucide-react';

const MyCourses: any[] = [
  {
    plan: 'full payment',
    title: 'Fullstack development bootcamp',
    amountDue: 300000,
    status: 'pending',
    nextDueDate: '30th january 2026',
    totalAmount: 300000,
    paid: 0,
  },
  {
    plan: 'installment',
    title: 'UI/UX mastery',
    amountDue: 300,
    nextDueDate: '30th january 2026',
    totalAmount: 3000,
    status: 'in-progress',
    paid: 50000,
  },
];

const Billing = () => {
  return (
    <section>
      <h2 className='text-2xl font-semibold mb-4'>Billing</h2>

      <div className={`grid gap-4 ${MyCourses.length > 3 ? 'md:grid-cols-3' : `md:grid-cols-${MyCourses.length}`}`}>
        {MyCourses.map((bill, i) => (
          <BillingCard
            key={i}
            plan={bill.plan}
            title={bill.title}
            amountDue={bill.amountDue}
            totalAmount={bill.totalAmount}
            paid={bill.paid}
            nextDueDate={bill.nextDueDate}
            status={bill.status}
          />
        ))}
      </div>
      <section className='mt-8'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold'>Transactions</h2>
        </div>

        <div className='rounded-2xl border bg-white overflow-hidden'>
          <table className='w-full text-left'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='p-4'>Description</th>
                <th className='p-4'>Amount</th>
                <th className='p-4'>Status</th>
                <th className='p-4'>Date</th>
                <th className='p-4'>---</th>
              </tr>
            </thead>

            <tbody className='text-md'>
              <tr className='border-t'>
                <td className='p-4'>Full stack development</td>
                <td className='p-4'>200,000</td>
                <td className='p-4'>Pending</td>
                <td className='p-4'>12 January 2026, 12pm</td>
                <td className='p-4'>
                  <button className='bg-secondary text-white text-sm py-2 px-3 rounded-full flex items-center'>
                    Pay
                    <ArrowRight className='w-3 h-3 ml-2' />
                  </button>
                </td>
              </tr>
              <tr className='border-t'>
                <td className='p-4'>Full stack development</td>
                <td className='p-4'>200,000</td>
                <td className='p-4'>Pending</td>
                <td className='p-4'>12 January 2026, 12pm</td>
                <td className='p-4'>
                  <button className='bg-secondary text-white text-sm py-2 px-3 rounded-full flex items-center'>
                    Pay
                    <ArrowRight className='w-3 h-3 ml-2' />
                  </button>
                </td>
              </tr>
              <tr className='border-t'>
                <td className='p-4'>Full stack development</td>
                <td className='p-4'>200,000</td>
                <td className='p-4'>Pending</td>
                <td className='p-4'>12 January 2026, 12pm</td>
                <td className='p-4'>
                  <button className='bg-secondary text-white text-sm py-2 px-3 rounded-full flex items-center'>
                    Pay
                    <ArrowRight className='w-3 h-3 ml-2' />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default Billing;
