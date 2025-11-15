import Feature from '@/components/home/Feature';
import HomeHero from '@/components/home/HomeHero';
import Services from '@/components/home/Services';
import NavBar from '@/components/layout/NavBar';
import { LucideWebhook, UserCheckIcon } from 'lucide-react';

const Home = () => {
  return (
    <>
      <NavBar />

      <HomeHero />

      <Feature />
      <Services />
    </>
  );
};

export default Home;
