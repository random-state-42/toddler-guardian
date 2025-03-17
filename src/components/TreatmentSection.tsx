
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePageTransition, useSectionTransition, useStaggeredEntrance } from '../utils/animations';
import { getTreatmentOptions } from '../utils/resultCalculator';
import { ExternalLink } from 'lucide-react';

interface TreatmentSectionProps {
  riskLevel: 'low' | 'medium' | 'high';
  onBack: () => void;
}

const TreatmentSection = ({ riskLevel, onBack }: TreatmentSectionProps) => {
  const { pageTransitionClass } = usePageTransition();
  const { sectionTransitionClass } = useSectionTransition(100);
  
  // Normalize the risk level to make sure it's one of the expected values
  const normalizedRiskLevel = (['low', 'medium', 'high'].includes(riskLevel as string) 
    ? riskLevel 
    : (riskLevel?.toLowerCase() === 'high' ? 'high' : 
       riskLevel?.toLowerCase() === 'medium' ? 'medium' : 'low')) as 'low' | 'medium' | 'high';
  
  const treatmentOptions = getTreatmentOptions(normalizedRiskLevel);
  const { isItemVisible } = useStaggeredEntrance(treatmentOptions, 100);
  
  return (
    <div className={`w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 ${pageTransitionClass}`}>
      <div className={`text-center mb-12 ${sectionTransitionClass}`}>
        <div className="chip bg-blue-light text-blue-dark mb-2">Treatment</div>
        <h2 className="text-3xl font-display font-medium text-neutral-900 mb-6">
          Potential Treatment Options
        </h2>
        <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
          Here are evidence-based approaches that may benefit your child
          based on the screening results.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {treatmentOptions.map((treatment, index) => (
          <div 
            key={index}
            className={`bg-white rounded-2xl p-6 shadow-elevation-1 border border-neutral-200 transition-all duration-450 ease-in-out-expo ${
              isItemVisible(index) 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            }`}
          >
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              {treatment.title}
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-3">
              {treatment.description}
            </p>
            {treatment.resourceLink && (
              <a 
                href={treatment.resourceLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-primary hover:text-blue-dark transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View Resource
              </a>
            )}
          </div>
        ))}
      </div>
      
      <div className={`bg-blue-light rounded-2xl p-6 border border-blue-medium/20 mb-8 ${sectionTransitionClass}`}>
        <h3 className="text-lg font-medium text-neutral-900 mb-2">Finding Professionals</h3>
        <p className="text-neutral-800 text-sm leading-relaxed mb-4">
          To access these treatments, consider these resources for finding qualified professionals:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="inline-block w-5 h-5 bg-white rounded-full flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center text-xs text-blue-primary font-medium">•</span>
            <span>Consult with your child's pediatrician for referrals</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-5 h-5 bg-white rounded-full flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center text-xs text-blue-primary font-medium">•</span>
            <span>Contact your local early intervention program</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-5 h-5 bg-white rounded-full flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center text-xs text-blue-primary font-medium">•</span>
            <span>Reach out to autism support organizations like Autism Speaks</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block w-5 h-5 bg-white rounded-full flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center text-xs text-blue-primary font-medium">•</span>
            <span>Check with your health insurance provider for covered specialists</span>
          </li>
        </ul>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onBack}
          className="bg-blue-primary hover:bg-blue-dark text-white shadow-button hover:shadow-button-hover transform hover:-translate-y-0.5 transition-all duration-250"
        >
          Return to Results
        </Button>
      </div>
    </div>
  );
};

export default TreatmentSection;
