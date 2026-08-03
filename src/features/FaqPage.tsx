import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';

const faqs = [
  {
    question: 'Do I need any prior experience to enroll in a course?',
    answer:
      "It depends on the course level. Beginner courses assume no prior experience, while intermediate and advanced courses list specific prerequisites on their course page. Check the course's learning outcomes and curriculum to see if it's the right fit for you.",
  },
  {
    question: "What's the difference between cohort-based and on-demand courses?",
    answer:
      'Cohort-based courses run on a fixed schedule with live, instructor-led sessions alongside a group of peers, and have set start and end dates. On-demand courses are self-paced, pre-recorded, and can be started and completed on your own schedule. Some courses are hybrid, combining both formats.',
  },
  {
    question: 'Will I get a certificate after completing a course?',
    answer:
      "Yes. Once you complete all required lessons and the course project, you'll receive a certificate of completion that you can share on LinkedIn or add to your portfolio.",
  },
  {
    question: 'Are the courses project-based?',
    answer:
      'Most courses include a hands-on project with clear outlines and deliverables so you can apply what you learn to real-world scenarios and build a portfolio piece, not just watch lessons passively.',
  },
  {
    question: 'What payment methods are supported and are there discounts?',
    answer:
      'We support card payments and bank transfers. Discounts are occasionally available on select courses and are shown directly on the course pricing page when applicable.',
  },
  {
    question: 'Can I access course content on mobile?',
    answer:
      'Yes, the platform is fully responsive, so you can watch lessons, track your progress, and access resources from your phone, tablet, or laptop.',
  },
  {
    question: 'What if I get stuck during a lesson?',
    answer:
      'Instructor-led and cohort courses include access to instructors for questions and feedback. For on-demand courses, you can reach out through our support channels for help.',
  },
  {
    question: 'Do you offer refunds if a course is not the right fit?',
    answer:
      "If you're not satisfied with a course, reach out to our support team within the stated refund window for your course and we'll review your request.",
  },
];

const FaqPage = () => {
  return (
    <>
      <NavBar />
      <main className='pb-20'>
        <div className='mb-8 bg-secondary py-[50px] pt-40'>
          <div className='max-w-xl mx-auto'>
            <h1 className='text-center mb-8 text-xl px-4 text-white'>Frequently Asked Questions</h1>
            <p className='text-white text-center'>
              Everything you need to know about our courses, cohorts, and learning experience before you get
              started.
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
      <Footer />
    </>
  );
};

export default FaqPage;
