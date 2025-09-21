// src/pages/Home.jsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import BlogPreview from '../components/BlogPreview';
import FAQ from '../components/FAQ';
import Partners from '../components/Partners';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

import React from 'react'; // ✅ Añade esta línea

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <Newsletter />
      <BlogPreview />
      <FAQ />
      <Partners />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;