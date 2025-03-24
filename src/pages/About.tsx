
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
              About <span className="text-blue-primary">ToddlerGuardian</span>
            </h1>
            <div className="w-20 h-1 bg-blue-primary mx-auto rounded-full mb-6"></div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-elevation-1">
            <p className="text-neutral-700 mb-6">
              ToddlerGuardian is an innovative autism screening tool designed to help parents and caregivers identify early signs of autism spectrum disorder in young children. Our mission is to make early detection accessible to everyone, leading to earlier interventions and better outcomes.
            </p>
            
            <p className="text-neutral-700 mb-6">
              This project was developed as part of a college initiative to create technology-driven solutions that can make a positive impact on public health. The screening tool is based on established behavioral markers and assessment criteria used by healthcare professionals.
            </p>
            
            <p className="text-neutral-700 mb-6">
              Key features of ToddlerGuardian include:
            </p>
            
            <ul className="list-disc pl-6 mb-6 text-neutral-700 space-y-2">
              <li>User-friendly questionnaire based on validated screening methods</li>
              <li>Immediate preliminary assessment results</li>
              <li>Information about potential next steps and treatment options</li>
              <li>Educational resources about autism spectrum disorder</li>
            </ul>
            
            <p className="text-neutral-700">
              <strong>Disclaimer:</strong> This tool is meant for educational purposes only and does not replace professional medical advice. Always consult with healthcare providers for proper diagnosis and treatment plans.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
