import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import { GraduationCap, Users, Laptop, CheckCircle2, ArrowRight, Briefcase, Upload, Banknote } from 'lucide-react';

const BecomeInstructor = () => {
  return (
    <>
      <NavBar showSearch={false} />
      <div className='min-h-screen bg-white text-slate-900'>
        {/* Hero */}
        <section className='border-b border-slate-100 bg-slate-50  pt-20'>
          <div className='mx-auto max-w-6xl px-4 py-16'>
            <div className='max-w-3xl mx-auto'>
              <div className='flex justify-center'>
                <div className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600'>
                  <GraduationCap className='h-4 w-4' />
                  Instructor Opportunities
                </div>
              </div>

              <h1 className='mt-4 text-3xl font-bold tracking-tight md:text-5xl'>
                Teach. Mentor. Shape the next generation of tech talents.
              </h1>

              <p className='mt-4 text-lg text-slate-600'>
                At <span className='font-semibold'>Sintax Learning</span>, we partner with experienced professionals to
                deliver high-impact tech education to schools, individuals, and enterprise teams.
              </p>

              <div className='mt-6 flex flex-col gap-3 sm:flex-row justify-center'>
                <a
                  href='#apply'
                  className='inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800'
                >
                  Apply to teach <ArrowRight className='h-4 w-4' />
                </a>
                <a
                  href='#why'
                  className='inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50'
                >
                  Why Sintax Learning
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why teach with us */}
        <section id='why' className='bg-white'>
          <div className='mx-auto max-w-6xl px-4 py-14'>
            <h2 className='text-2xl font-bold md:text-3xl'>Why teach with Sintax Learning?</h2>

            <div className='mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4'>
              {[
                {
                  icon: <Users className='h-5 w-5' />,
                  title: 'Teach real learners',
                  desc: 'Work with motivated students, schools, and enterprise teams solving real-world problems.',
                },
                {
                  icon: <Laptop className='h-5 w-5' />,
                  title: 'Hands-on delivery',
                  desc: 'Focus on practical labs, projects, and mentorship — not theory-heavy teaching.',
                },
                {
                  icon: <Briefcase className='h-5 w-5' />,
                  title: 'Flexible engagement',
                  desc: 'Remote, hybrid, or on-site teaching depending on programs and availability.',
                },
                {
                  icon: <Banknote className='h-5 w-5' />,
                  title: 'Competitive pay',
                  desc: 'Earn market-aligned hourly rates based on your experience, expertise, and engagement type.',
                },
              ].map((item) => (
                <div key={item.title} className='rounded-3xl border border-slate-100 bg-white p-6 shadow-sm'>
                  <div className='grid h-10 w-10 place-items-center rounded-xl bg-secondary text-white'>
                    {item.icon}
                  </div>
                  <p className='mt-4 text-base font-semibold'>{item.title}</p>
                  <p className='mt-2 text-sm text-slate-600'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who we're looking for */}
        <section className='border-t border-slate-100 bg-slate-50'>
          <div className='mx-auto max-w-6xl px-4 py-14'>
            <h2 className='text-2xl font-bold md:text-3xl'>Who we’re looking for</h2>

            <div className='mt-6 grid gap-4 md:grid-cols-2'>
              <div className='rounded-3xl border border-slate-100 bg-white p-6'>
                <p className='text-sm font-semibold'>Ideal instructors</p>
                <ul className='mt-4 space-y-3 text-sm text-slate-700'>
                  {[
                    '3+ years professional experience in tech',
                    'Strong communication and mentoring skills',
                    'Comfortable teaching beginners to intermediates',
                    'Passion for impact and learning outcomes',
                  ].map((x) => (
                    <li key={x} className='flex items-start gap-2'>
                      <CheckCircle2 className='mt-0.5 h-4 w-4 text-primary' />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className='rounded-3xl border border-slate-100 bg-white p-6'>
                <p className='text-sm font-semibold'>Common expertise areas</p>
                <ul className='mt-4 space-y-3 text-sm text-slate-700'>
                  {[
                    'Web Development (React, Node.js)',
                    'Mobile Development (React Native)',
                    'Cloud & DevOps (AWS, CI/CD)',
                    'Data & Analytics',
                    'Cybersecurity & IT Support',
                  ].map((x) => (
                    <li key={x} className='flex items-start gap-2'>
                      <CheckCircle2 className='mt-0.5 h-4 w-4 text-primary' />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application form */}
        <section id='apply' className='border-t border-slate-100 bg-white'>
          <div className='mx-auto max-w-6xl px-4 py-14'>
            <div className='grid gap-8 md:grid-cols-2'>
              <div>
                <h2 className='text-2xl font-bold md:text-3xl'>Apply to become an instructor</h2>
                <p className='mt-3 text-slate-600'>
                  Complete the form and our team will review your application. Shortlisted instructors will be contacted
                  for the next steps.
                </p>
              </div>

              <form
                className='rounded-3xl border border-slate-100 bg-white p-6 shadow-sm'
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Application submitted! Connect this to your backend.');
                }}
              >
                <div className='grid gap-4 sm:grid-cols-2'>
                  <Field label='Full name' />
                  <Field label='Email address' type='email' />
                  <Field label='Phone number' />
                  <Field label='Primary skill' placeholder='e.g. Frontend, Cloud' />
                </div>
                <div className='mt-4 w-full'>
                  <label className='text-sm font-semibold'>Upload your CV</label>

                  <label className='mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-6 text-center hover:border-primary-500 hover:bg-primary-50 transition'>
                    <input type='file' accept='.pdf,.doc,.docx' className='hidden' />

                    <Upload className='text-gray' />

                    <p className='text-sm font-medium text-gray-700'>Click to upload</p>
                    <p className='mt-1 text-xs text-gray-500'>PDF, DOC, or DOCX (max 5MB)</p>
                  </label>
                </div>
                <div className='mt-4'>
                  <label className='text-sm font-semibold'>Years of experience</label>
                  <select className='mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm'>
                    <option>1–2 years</option>
                    <option>3–5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>

                <div className='mt-4'>
                  <label className='text-sm font-semibold'>Why do you want to teach with us?</label>
                  <textarea
                    className='mt-2 h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm'
                    placeholder='Tell us about your motivation and teaching experience'
                  />
                </div>

                <button
                  type='submit'
                  className='mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800'
                >
                  Submit application <ArrowRight className='h-4 w-4' />
                </button>

                <p className='mt-3 text-center text-xs text-slate-500'>We review applications on a rolling basis.</p>
              </form>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

function Field({ label, placeholder, type = 'text' }: { label: string; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className='text-sm font-semibold'>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className='mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400'
      />
    </div>
  );
}

export default BecomeInstructor;
