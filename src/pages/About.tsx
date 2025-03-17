
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useSectionTransition } from '../utils/animations';

const About = () => {
  const { sectionTransitionClass } = useSectionTransition(200);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className={`max-w-3xl mx-auto px-4 py-16 ${sectionTransitionClass}`}>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-medium text-blue-dark mb-4">
              About <span className="text-blue-primary">Our Team</span>
            </h1>
            <div className="w-20 h-1 bg-blue-primary mx-auto rounded-full mb-6"></div>
            <p className="text-neutral-700 mb-12">
              Meet the team behind ToddlerGuardian
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-elevation-1 transform transition-all duration-300 hover:shadow-elevation-2 hover:-translate-y-1">
              <h2 className="text-xl font-medium text-blue-primary mb-1">Shaik Irfan Baba</h2>
              <p className="text-neutral-600 font-medium">(227Z1A66B5)</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-elevation-1 transform transition-all duration-300 hover:shadow-elevation-2 hover:-translate-y-1">
              <h2 className="text-xl font-medium text-blue-primary mb-1">Vinjamuri Siri Vennela</h2>
              <p className="text-neutral-600 font-medium">(227Z1A66C6)</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-elevation-1 transform transition-all duration-300 hover:shadow-elevation-2 hover:-translate-y-1">
              <h2 className="text-xl font-medium text-blue-primary mb-1">Sarva Darhsan</h2>
              <p className="text-neutral-600 font-medium">(227Z1A66B4)</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
