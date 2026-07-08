import PaymentModal from '@/components/modals/PaymentModal';
import BillingCard from '@/components/payment/BillingCard';
import { ComponentLoading } from '@/components/ui/LoadingSpinner';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/dateFormatter';
import { ArrowRight, ReceiptText } from 'lucide-react';
import { useState } from 'react';
import { useGetBilling } from '../payment.query';
import type { BillingI } from '../payment.type';

const Billing = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<BillingI | null>(null);

  const { data, isLoading } = useGetBilling();
  const billings = data?.data?.billing ?? [];
  const transactions = data?.data?.transactions ?? [];

  const handlePayNow = (billing: BillingI) => {
    setSelectedBilling(billing);
    setIsPaymentOpen(true);
  };

  return (
    <>
      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} billing={selectedBilling} />

      <section>
        <h2 className='text-2xl font-semibold mb-4'>Billing</h2>

        {isLoading ? (
          <div className='flex justify-center py-12'>
            <ComponentLoading size='lg' />
          </div>
        ) : billings.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-gray-400'>
            <ReceiptText className='w-12 h-12 mb-3' />
            <p className='text-lg font-medium'>No billing records</p>
            <p className='text-sm'>Your enrollment billing will appear here.</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${billings.length >= 3 ? 'md:grid-cols-3' : `md:grid-cols-${billings.length}`}`}>
            {billings.map((bill) => (
              <BillingCard
                key={bill.enrollmentId}
                plan={bill.paymentPlan}
                title={bill.course.title}
                amountDue={bill.totalDue}
                totalAmount={bill.totalAmount}
                paid={bill.totalPaid}
                currency={bill.currency}
                nextDueDate={formatDate(bill.nextDueDate, 'long')}
                status={bill.status}
                onPayNow={() => handlePayNow(bill)}
              />
            ))}
          </div>
        )}

        <section className='mt-8'>
          <h2 className='text-xl font-semibold mb-4'>Transactions</h2>

          <div className='rounded-2xl border bg-white overflow-hidden'>
            <table className='w-full text-left'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='p-4 text-sm font-semibold text-gray-600'>Description</th>
                  <th className='p-4 text-sm font-semibold text-gray-600'>Amount</th>
                  <th className='p-4 text-sm font-semibold text-gray-600'>Channel</th>
                  <th className='p-4 text-sm font-semibold text-gray-600'>Date</th>
                  <th className='p-4 text-sm font-semibold text-gray-600'></th>
                </tr>
              </thead>

              <tbody className='text-sm'>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className='p-8 text-center text-gray-400'>
                      <ComponentLoading size='sm' />
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className='p-10 text-center text-gray-400'>
                      No transactions yet.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr key={tx.reference} className='border-t hover:bg-gray-50 transition-colors'>
                      <td className='p-4'>
                        <p className='font-medium text-gray-800'>{tx.customer_name || '—'}</p>
                        <p className='text-xs text-gray-400'>{tx.reference}</p>
                      </td>
                      <td className='p-4 font-semibold'>{formatCurrency(tx.amount)}</td>
                      <td className='p-4 capitalize text-gray-600'>{tx.channel || tx.bank_name || '—'}</td>
                      <td className='p-4 text-gray-500'>{formatDate(tx.date, 'datetime')}</td>
                      <td className='p-4'>
                        <button className='bg-secondary text-white text-xs py-1.5 px-3 rounded-full flex items-center gap-1 hover:opacity-90 transition-opacity'>
                          View
                          <ArrowRight className='w-3 h-3' />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </>
  );
};

export default Billing;
