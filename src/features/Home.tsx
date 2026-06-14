import Feature from '@/components/home/Feature';
import HomeHero from '@/components/home/HomeHero';
import Services from '@/components/home/Services';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/NavBar';

const Home = () => {
  return (
    <>
      <NavBar />

      <HomeHero />

      <Feature />
      <Services />

      <Footer />
    </>
  );
};

export default Home;
