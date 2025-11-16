import { Code, Server, Layout, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const cards = [
    {
      title: 'Software Development',
      icon: <Code className='w-6 h-6 text-primary' />,
      description:
        'Build scalable, high-quality applications with best practices, modern frameworks, and robust architectures.',
    },
    {
      title: 'Product Design',
      icon: <Layout className='w-6 h-6 text-primary' />,
      description:
        'Create intuitive and visually appealing products with user-centered design principles and innovative thinking.',
    },
    {
      title: 'IT Support',
      icon: <Server className='w-6 h-6 text-primary' />,
      description:
        'Reliable IT solutions, troubleshooting, and technical support to keep systems running smoothly 24/7.',
    },
    {
      title: 'Customer Support',
      icon: <Headphones className='w-6 h-6 text-primary' />,
      description:
        'Provide professional and empathetic support to clients, ensuring satisfaction and long-term loyalty.',
    },
  ];

  return (
    <section
      className='bg-secondary py-[100px] px-8 relative overflow-hidden'
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for subtle darkening */}
      <div className='absolute inset-0 bg-black/30'></div>

      {/* Overlay for subtle darkening */}
      <div className='absolute inset-0 bg-secondary/90'></div>

      {/* Bouncing Circle */}
      <motion.div
        className='absolute w-5 h-5 bg-primary rounded-full'
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '20%', left: '10%' }}
      />
      {/* Bouncing Circle */}
      <motion.div
        className='absolute w-5 h-5 bg-primary rounded-full'
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '20%', right: '10%' }}
      />

      <div className='relative mx-auto grid md:grid-cols-4 gap-6 max-w-[1200px] items-start mb-6'>
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className='h-[250px] rounded-2xl bg-off-white py-6 px-5 shadow-lg relative z-10 cursor-pointer'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.7, ease: 'easeOut' }}
            whileHover={{ y: -10, scale: 1.03, boxShadow: '0 15px 25px rgba(0,0,0,0.2)' }}
            viewport={{ once: false }}
          >
            <div className='flex items-center mb-4'>
              {card.icon}
              <h1 className='font-semibold ml-3 text-lg'>{card.title}</h1>
            </div>
            <p className='text-gray-600'>{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
