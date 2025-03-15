
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePageTransition, useSectionTransition } from '../utils/animations';

interface WelcomeSectionProps {
  onStartQuestionnaire: () => void;
}

const WelcomeSection = ({ onStartQuestionnaire }: WelcomeSectionProps) => {
  const { pageTransitionClass } = usePageTransition();
  const { sectionTransitionClass: section1Class } = useSectionTransition(200);
  const { sectionTransitionClass: section2Class } = useSectionTransition(400);
  const { sectionTransitionClass: section3Class } = useSectionTransition(600);
  
  return (
    <div className={`w-full flex flex-col items-center ${pageTransitionClass}`}>
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 pt-16 pb-24">
        <div className={section1Class}>
          <div className="inline-block mb-4">
            <div className="chip bg-blue-light text-blue-dark font-medium">
              Early Detection Tool
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900 mb-6">
            Autism Screening for Toddlers
          </h1>
          <p className="text-lg text-neutral-800 max-w-2xl mx-auto mb-10">
            A simple, evidence-informed questionnaire to help identify potential signs of autism 
            spectrum disorder in toddlers between 16-30 months of age.
          </p>
        </div>
        
        <div className={section2Class}>
          <Button 
            onClick={onStartQuestionnaire}
            className="text-base bg-blue-primary hover:bg-blue-dark text-white shadow-button hover:shadow-button-hover transform hover:-translate-y-0.5 transition-all duration-250"
            size="lg"
          >
            Start Screening
          </Button>
          <p className="text-xs text-neutral-600 mt-4">
            Takes approximately 5 minutes to complete
          </p>
        </div>
      </div>
      
      <div className={`w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 ${section3Class}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-elevation-1 card-hover">
            <div className="w-10 h-10 bg-blue-light rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-primary font-medium">1</span>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Answer Questions</h3>
            <p className="text-neutral-600 text-sm">
              Respond to 10 simple questions about your child's behavior and development.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-elevation-1 card-hover">
            <div className="w-10 h-10 bg-blue-light rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-primary font-medium">2</span>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Get Results</h3>
            <p className="text-neutral-600 text-sm">
              Receive instant feedback about potential risk levels based on your responses.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-elevation-1 card-hover">
            <div className="w-10 h-10 bg-blue-light rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-primary font-medium">3</span>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Explore Resources</h3>
            <p className="text-neutral-600 text-sm">
              Find appropriate next steps and treatment options based on your child's results.
            </p>
          </div>
        </div>
        
        <div className="mt-12 bg-blue-light rounded-2xl p-6 border border-blue-medium/20">
          <p className="text-sm text-neutral-800 italic">
            <strong>Note:</strong> This screening tool is not a diagnostic test. It is designed to help 
            identify children who may benefit from a more comprehensive evaluation by healthcare professionals. 
            Always consult with your pediatrician about any developmental concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
