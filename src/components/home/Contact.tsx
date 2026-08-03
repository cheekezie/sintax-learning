import { Mail, Phone } from 'lucide-react';

export default function Contact() {
  const details = [
    {
      icon: <Phone className='w-6 h-6 text-primary' />,
      label: 'Call us',
      value: '07337636205',
      href: 'tel:+447337636205',
    },
    {
      icon: <Mail className='w-6 h-6 text-primary' />,
      label: 'Email us',
      value: 'learning@sintax.co.uk',
      href: 'mailto:learning@sintax.co.uk',
    },
  ];

  return (
    <section id='contact' className='py-[80px] px-8'>
      <div className='mx-auto max-w-[1200px] text-center'>
        <h2 className='text-2xl md:text-3xl font-bold'>Get in Touch</h2>
        <p className='text-gray-600 mt-3 max-w-xl mx-auto'>
          Have a question about our courses? Reach out and our team will get back to you.
        </p>

        <div className='mt-10 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto'>
          {details.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className='flex items-center gap-4 rounded-2xl bg-off-white py-6 px-6 shadow-lg hover:-translate-y-1 transition'
            >
              <div className='flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm shrink-0'>
                {item.icon}
              </div>
              <div className='text-left'>
                <p className='text-sm text-gray-500'>{item.label}</p>
                <p className='font-semibold'>{item.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
