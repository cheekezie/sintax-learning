import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Contact from '@/components/home/Contact';
import Feature from '@/components/home/Feature';
import HomeHero from '@/components/home/HomeHero';
import Services from '@/components/home/Services';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, [location]);

  return (
    <>
      <NavBar />

      <HomeHero />

      <Feature />
      <Services />
      <Contact />

      <Footer />
    </>
  );
};

export default Home;
