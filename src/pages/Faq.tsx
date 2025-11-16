import NavBar from '@/components/layout/NavBar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';

const faqs = [
  {
    question: 'How do I register as a Merchant?',
    answer:
      'To register as a merchant, you need to own a valid business registration document and provide your bank account details during signup.',
  },
  {
    question: 'What is a payment gateway?',
    answer:
      'A payment gateway is a secure service that processes online payments by verifying and transferring funds between customers and merchants.',
  },
  {
    question: 'How long does merchant verification take?',
    answer: 'Merchant verification typically takes between 24 to 48 hours after submitting all required documents.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'We support multiple payment methods including debit cards, credit cards, bank transfers, and mobile wallets.',
  },
  {
    question: 'Are there any setup fees?',
    answer: 'No, there are no setup or registration fees. You only pay transaction charges per successful payment.',
  },
  {
    question: 'How secure are transactions?',
    answer:
      'All transactions are encrypted with industry-standard SSL and PCI DSS compliance to ensure maximum security.',
  },
];

const FAQ = () => {
  return (
    <>
      <NavBar />
      <main className=''>
        <div className='mb-8 bg-secondary py-[50px] '>
          <div className='max-w-xl mx-auto'>
            <h1 className='text-center mb-8 text-xl px-4 text-white'>Frequently Asked Questions</h1>
            <p className='text-white text-center'>
              With our competitive prices, you can enjoy more benefits while paying below the industry rate, offering
              you the best value.
            </p>
          </div>
        </div>

        <div className='px-8'>
          <div className='mx-auto max-w-[1200px]'>
            <Accordion type='single' collapsible className='w-full'>
              {faqs.map((item, key) => (
                <AccordionItem value={key.toString()} key={key} className='border-none'>
                  <AccordionTrigger className='bg-gray-100 px-3 mb-2 lg:text-lg cursor-pointer'>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className='px-3'>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
    </>
  );
};

export default FAQ;
