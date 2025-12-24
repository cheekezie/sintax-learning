import { Logo } from '@/assets';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Laptop className='h-5 w-5' />,
    title: 'Role-based learning paths',
    desc: 'Frontend, backend, cloud, data, product, and support tracks tailored to your teams.',
  },
  {
    icon: <Users className='h-5 w-5' />,
    title: 'Instructor-led + self-paced',
    desc: 'Blended delivery for busy teams: live sessions, labs, projects, and recordings.',
  },
  {
    icon: <BarChart3 className='h-5 w-5' />,
    title: 'Progress & performance reporting',
    desc: 'Cohort dashboards, attendance, assessments, and completion analytics.',
  },
  {
    icon: <ShieldCheck className='h-5 w-5' />,
    title: 'Enterprise support & governance',
    desc: 'Dedicated success manager, onboarding, policy-friendly access, and learner management.',
  },
];

const tracks = [
  'Web Development (React, Node.js)',
  'Mobile Development (React Native)',
  'Cloud & DevOps (AWS, CI/CD)',
  'Data & Analytics (SQL, BI)',
  'Cybersecurity Fundamentals',
  'Product & Project (Agile, Delivery)',
];

const steps = [
  {
    title: 'Discover',
    desc: 'We assess your goals, roles, and current skill level across departments.',
  },
  {
    title: 'Design',
    desc: 'We build a tailored curriculum, timeline, and success metrics for your cohorts.',
  },
  {
    title: 'Deliver',
    desc: 'Hands-on training with projects, mentorship, and assessments.',
  },
  {
    title: 'Measure',
    desc: 'Reports, feedback loops, and continuous improvement to maximize outcomes.',
  },
];

const faqs = [
  {
    q: 'Who is this for?',
    a: 'Schools (staff development, ICT teams, digital curriculum support) and corporates (engineering, IT support, operations, and product teams).',
  },
  {
    q: 'Do you offer on-site training?',
    a: 'Yes. We deliver remotely, on-site, or hybrid depending on your location and preference.',
  },
  {
    q: 'How do you measure success?',
    a: 'We track attendance, assessment scores, project delivery, and role-readiness metrics with cohort reports.',
  },
  {
    q: 'Can we customize the curriculum?',
    a: 'Absolutely. We tailor content to your stack, workflows, and business goals.',
  },
];

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const BusinessTraining = () => {
  return (
    <>
      <div className='min-h-screen bg-white text-secondary'>
        {/* Top bar */}
        <header className='sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur'>
          <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
            <div className='flex items-center gap-2'>
              <Link to={'/'}>
                <img src={Logo} alt='Sintax Logo' className='h-6 md:h-8 w-auto cursor-pointer' />
              </Link>
            </div>

            <nav className='hidden items-center gap-6 md:flex'>
              <a className='text-sm text-slate-600 hover:text-secondary' href='#solutions'>
                Solutions
              </a>
              <a className='text-sm text-slate-600 hover:text-secondary' href='#tracks'>
                Tracks
              </a>
              <a className='text-sm text-slate-600 hover:text-secondary' href='#how'>
                How it works
              </a>
              <a className='text-sm text-slate-600 hover:text-secondary' href='#faq'>
                FAQ
              </a>
            </nav>

            <div className='flex items-center gap-2'>
              <a
                href='#contact'
                className='inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800'
              >
                Request a demo <ArrowRight className='h-4 w-4' />
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className='relative overflow-hidden'>
          <div className='pointer-events-none absolute inset-0 -z-10'>
            <div className='absolute -top-24 left-1/2 h-72 w-240 -translate-x-1/2 rounded-full bg-slate-100 blur-3xl' />
            <div className='absolute -bottom-24 left-1/2 h-72 w-240 -translate-x-1/2 rounded-full bg-slate-50 blur-3xl' />
          </div>

          <div className='mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:py-20'>
            <div>
              <div className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600'>
                <span className='inline-block h-2 w-2 rounded-full bg-primary' />
                Enterprise-scale training for Schools & Corporates
              </div>

              <h1 className='mt-4 text-3xl font-bold tracking-tight md:text-5xl'>
                Upskill your workforce
                <span className='block text-gray-500 mt-4'>Transform your business with skill acquisition today.</span>
              </h1>

              <p className='mt-4 text-base text-slate-600 md:text-lg'>
                Let’s partner with you to train and develop your talent in high-impact areas of technology — driving
                efficiency, innovation, and growth across your organisation.
              </p>

              <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                <a
                  href='#contact'
                  className='inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800'
                >
                  Talk to our team <ArrowRight className='h-4 w-4' />
                </a>
                <a
                  href='#solutions'
                  className='inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50'
                >
                  Explore solutions
                </a>
              </div>

              <div className='mt-8 grid grid-cols-2 gap-4 md:grid-cols-3'>
                {[
                  { label: 'Cohort-based', value: 'Training' },
                  { label: 'Hands-on', value: 'Projects' },
                  { label: 'Measurable', value: 'Outcomes' },
                ].map((s) => (
                  <div key={s.label} className='rounded-2xl border border-slate-100 bg-white p-4'>
                    <p className='text-xs text-slate-500'>{s.label}</p>
                    <p className='mt-1 text-sm font-semibold'>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div className='rounded-3xl border border-slate-100 bg-white p-6 shadow-sm'>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-semibold'>Enterprise Scale Plan</p>
                <span className='rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary'>
                  Best for teams
                </span>
              </div>

              <div className='mt-5 grid gap-3'>
                {[
                  'Dedicated Success Manager',
                  'Cohort onboarding & learner management',
                  'Assessments, projects & certification',
                  'Reporting dashboards & progress insights',
                  'Hybrid delivery (remote / on-site)',
                ].map((item) => (
                  <div key={item} className='flex items-start gap-2'>
                    <CheckCircle2 className='mt-0.5 h-5 w-5 text-primary' />
                    <p className='text-sm text-slate-700'>{item}</p>
                  </div>
                ))}
              </div>

              <div className='mt-6 rounded-2xl bg-slate-50 p-4'>
                <p className='text-sm font-semibold'>Perfect for</p>
                <div className='mt-3 grid gap-3 sm:grid-cols-2'>
                  <div className='flex items-center gap-3 rounded-2xl bg-white p-4'>
                    <div className='grid h-10 w-10 place-items-center rounded-xl bg-secondary text-white'>
                      <GraduationCap className='h-5 w-5' />
                    </div>
                    <div>
                      <p className='text-sm font-semibold'>Schools</p>
                      <p className='text-xs text-slate-500'>Students & ICT teams</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 rounded-2xl bg-white p-4'>
                    <div className='grid h-10 w-10 place-items-center rounded-xl bg-secondary text-white'>
                      <Building2 className='h-5 w-5' />
                    </div>
                    <div>
                      <p className='text-sm font-semibold'>Corporates</p>
                      <p className='text-xs text-slate-500'>Teams & departments</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href='#contact'
                className='mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary'
              >
                Get a proposal <ArrowRight className='h-4 w-4' />
              </a>

              <p className='mt-3 text-center text-xs text-slate-500'>
                Custom pricing based on cohort size, delivery mode, and duration.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section id='solutions' className='border-t border-slate-100 bg-white'>
          <div className='mx-auto max-w-6xl px-4 py-14'>
            <div className='max-w-2xl'>
              <h2 className='text-2xl font-bold md:text-3xl'>Training that fits your organisation</h2>
              <p className='mt-3 text-slate-600'>
                We help schools and corporates build tech capability at scale — with structured cohorts, practical
                projects, and clear reporting.
              </p>
            </div>

            <div className='mt-10 grid gap-4 md:grid-cols-2'>
              {features.map((f) => (
                <div key={f.title} className='rounded-3xl border border-slate-100 bg-white p-6 shadow-sm'>
                  <div className='flex items-start gap-3'>
                    <div className='grid h-10 w-10 place-items-center rounded-2xl bg-secondary text-white'>
                      {f.icon}
                    </div>
                    <div>
                      <p className='text-base font-semibold'>{f.title}</p>
                      <p className='mt-1 text-sm text-slate-600'>{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-10 grid gap-4 md:grid-cols-2'>
              <div className='rounded-3xl border border-slate-100 bg-slate-50 p-6'>
                <p className='text-sm font-semibold'>For Schools</p>
                <ul className='mt-3 space-y-2 text-sm text-slate-700'>
                  {[
                    'Upskill teachers & ICT staff for modern digital delivery',
                    'Support school systems: portals, payments, data, and admin',
                    'Train students with beginner-to-advanced tech tracks',
                  ].map((x) => (
                    <li key={x} className='flex items-start gap-2'>
                      <CheckCircle2 className='mt-0.5 h-4 w-4 text-primary-600' />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className='rounded-3xl border border-slate-100 bg-slate-50 p-6'>
                <p className='text-sm font-semibold'>For Corporates</p>
                <ul className='mt-3 space-y-2 text-sm text-slate-700'>
                  {[
                    'Train teams for product delivery and operational efficiency',
                    'Improve internal tools, automation, and reporting',
                    'Strengthen security and cloud readiness',
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

        {/* Tracks */}
        <section id='tracks' className='border-t border-slate-100 bg-white'>
          <div className='mx-auto max-w-6xl px-4 py-14'>
            <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
              <div className='max-w-2xl'>
                <h2 className='text-2xl font-bold md:text-3xl'>Popular learning tracks</h2>
                <p className='mt-2 text-slate-600'>
                  Choose from proven pathways or let us build a custom program around your stack.
                </p>
              </div>
              <a
                href='#contact'
                className='inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50'
              >
                Request custom track <ArrowRight className='h-4 w-4' />
              </a>
            </div>

            <div className='mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {tracks.map((t) => (
                <div key={t} className='rounded-3xl border border-slate-100 bg-white p-5 shadow-sm'>
                  <p className='text-sm font-semibold'>{t}</p>
                  <p className='mt-1 text-xs text-slate-500'>Hands-on labs • Projects • Assessments</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id='how' className='border-t border-slate-100 bg-white'>
          <div className='mx-auto max-w-6xl px-4 py-14'>
            <h2 className='text-2xl font-bold md:text-3xl'>How the partnership works</h2>
            <p className='mt-3 max-w-2xl text-slate-600'>
              We run a simple, structured process to ensure training aligns with your goals and produces measurable
              results.
            </p>

            <div className='mt-10 grid gap-4 md:grid-cols-4'>
              {steps.map((s, idx) => (
                <div key={s.title} className='rounded-3xl border border-slate-100 bg-white p-6 shadow-sm'>
                  <div className='flex items-center gap-2'>
                    <span className='grid h-8 w-8 place-items-center rounded-xl bg-secondary text-sm font-semibold text-white'>
                      {idx + 1}
                    </span>
                    <p className='text-base font-semibold'>{s.title}</p>
                  </div>
                  <p className='mt-3 text-sm text-slate-600'>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id='contact' className='border-t border-slate-100 bg-slate-50'>
          <div className='mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:items-start'>
            <div>
              <h2 className='text-2xl font-bold md:text-3xl'>Get an enterprise proposal</h2>
              <p className='mt-3 text-slate-600'>
                Tell us about your organisation and training needs. We’ll respond with a tailored plan for your team or
                school.
              </p>

              <div className='mt-6 grid gap-3'>
                {[
                  { icon: <Users className='h-5 w-5' />, text: 'Cohorts from 10 to 500+ learners' },
                  { icon: <ShieldCheck className='h-5 w-5' />, text: 'Dedicated support and reporting' },
                  { icon: <BarChart3 className='h-5 w-5' />, text: 'Measurable training outcomes' },
                ].map((x) => (
                  <div key={x.text} className='flex items-center gap-3'>
                    <div className='grid h-10 w-10 place-items-center rounded-2xl bg-white text-secondary shadow-sm'>
                      {x.icon}
                    </div>
                    <p className='text-sm text-slate-700'>{x.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <form
              className='rounded-3xl border border-slate-100 bg-white p-6 shadow-sm'
              onSubmit={(e) => {
                e.preventDefault();
                alert('Submitted! Connect this to your API/email service.');
              }}
            >
              <div className='grid gap-4 sm:grid-cols-2'>
                <Field label='Full name' placeholder='Your name' />
                <Field label='Work email' type='email' placeholder='you@company.com' />
                <Field label='Organisation' placeholder='School / Company name' />
                <Field label='Phone number' placeholder='+234...' />
              </div>

              <div className='mt-4'>
                <label className='text-sm font-semibold'>Organisation type</label>
                <div className='mt-2 grid grid-cols-2 gap-3'>
                  <Pill name='orgType' value='school' label='School' />
                  <Pill name='orgType' value='corporate' label='Corporate' />
                </div>
              </div>

              <div className='mt-4'>
                <label className='text-sm font-semibold'>Tell us what you want to achieve</label>
                <textarea
                  className='mt-2 h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400'
                  placeholder='e.g., Train 50 staff on web development + cloud. Need reports and certification.'
                />
              </div>

              <button
                type='submit'
                className='mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800'
              >
                Request proposal <ArrowRight className='h-4 w-4' />
              </button>

              <p className='mt-3 text-center text-xs text-slate-500'>
                By submitting, you agree to be contacted about enterprise training.
              </p>
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section id='faq' className='border-t border-slate-100 bg-white'>
          <div className='mx-auto max-w-6xl px-4 py-14'>
            <h2 className='text-2xl font-bold md:text-3xl'>Frequently asked questions</h2>
            <div className='mt-8 grid gap-4 md:grid-cols-2'>
              {faqs.map((f) => (
                <div key={f.q} className='rounded-3xl border border-slate-100 bg-white p-6 shadow-sm'>
                  <p className='text-sm font-semibold'>{f.q}</p>
                  <p className='mt-2 text-sm text-slate-600'>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
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
        className='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400'
      />
    </div>
  );
}

function Pill({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <label className='cursor-pointer'>
      <input type='radio' name={name} value={value} className='peer sr-only' />
      <div
        className={classNames(
          'rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800',
          'peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white',
          'hover:bg-slate-50'
        )}
      >
        {label}
      </div>
    </label>
  );
}

export default BusinessTraining;
