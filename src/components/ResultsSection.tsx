
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePageTransition, useSectionTransition } from '../utils/animations';
import { Result } from '../utils/resultCalculator';

interface ModelPrediction {
  prediction: string;
  risk_questions: string[];
  score: number;
  risk_level: string;
}

interface ResultsSectionProps {
  result: Result;
  modelPrediction: ModelPrediction | null;
  onRestart: () => void;
  onTreatment: () => void;
}

const ResultsSection = ({ result, modelPrediction, onRestart, onTreatment }: ResultsSectionProps) => {
  const { pageTransitionClass } = usePageTransition();
  const { sectionTransitionClass: section1Class } = useSectionTransition(200);
  const { sectionTransitionClass: section2Class } = useSectionTransition(400);
  const { sectionTransitionClass: section3Class } = useSectionTransition(600);
  
  const getRiskColor = (riskLevel: 'low' | 'medium' | 'high') => {
    switch (riskLevel) {
      case 'low':
        return 'bg-risk-low';
      case 'medium':
        return 'bg-risk-medium';
      case 'high':
        return 'bg-risk-high';
      default:
        return 'bg-blue-primary';
    }
  };
  
  const getRiskTextColor = (riskLevel: 'low' | 'medium' | 'high') => {
    switch (riskLevel) {
      case 'low':
        return 'text-green-800';
      case 'medium':
        return 'text-amber-800';
      case 'high':
        return 'text-red-800';
      default:
        return 'text-blue-800';
    }
  };
  
  const riskLevelText = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk'
  };
  
  return (
    <div className={`w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 ${pageTransitionClass}`}>
      <div className={section1Class}>
        <div className="text-center mb-12">
          <div className="chip bg-blue-light text-blue-dark mb-2">Results</div>
          <h2 className="text-3xl font-display font-medium text-neutral-900 mb-6">
            Your Screening Results
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Based on your responses, we've generated the following assessment.
            Remember that this is not a diagnostic tool.
          </p>
        </div>
      </div>
      
      <div className={`bg-white rounded-2xl shadow-elevation-2 overflow-hidden mb-8 ${section2Class}`}>
        <div className="p-6 sm:p-8 border-b border-neutral-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-medium text-neutral-900 mb-1">Risk Assessment</h3>
              <p className="text-neutral-600 text-sm">
                Score: {result.score} out of {result.maxScore} points
              </p>
            </div>
            <div className={`chip ${getRiskColor(result.riskLevel)} ${getRiskTextColor(result.riskLevel)} text-sm font-medium px-4 py-1.5`}>
              {riskLevelText[result.riskLevel]}
            </div>
          </div>
        </div>
        
        <div className="p-6 sm:p-8 border-b border-neutral-200">
          <h4 className="text-lg font-medium text-neutral-900 mb-3">Interpretation</h4>
          <p className="text-neutral-800 leading-relaxed">
            {result.interpretation}
          </p>
        </div>
        
        <div className="p-6 sm:p-8">
          <h4 className="text-lg font-medium text-neutral-900 mb-3">Recommended Next Steps</h4>
          <ul className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-5 h-5 bg-blue-light rounded-full flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center text-xs text-blue-primary font-medium">
                  {index + 1}
                </span>
                <span className="text-neutral-800">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className={`flex flex-col sm:flex-row gap-4 justify-center ${section3Class}`}>
        <Button 
          onClick={onTreatment}
          className="bg-blue-primary hover:bg-blue-dark text-white shadow-button hover:shadow-button-hover transform hover:-translate-y-0.5 transition-all duration-250"
          size="lg"
        >
          View Treatment Options
        </Button>
        
        <Button 
          onClick={onRestart}
          variant="outline"
          className="border-blue-primary text-blue-primary hover:bg-blue-light"
          size="lg"
        >
          Restart Screening
        </Button>
      </div>
      
      <div className={`mt-8 bg-neutral-100 rounded-2xl p-6 ${section3Class}`}>
        <p className="text-sm text-neutral-800">
          <strong>Important Disclaimer:</strong> This screening tool provides an initial assessment based on your responses.
          It is not a diagnostic instrument and should not replace professional medical advice.
          If you have concerns about your child's development, please consult with a healthcare professional
          for a comprehensive evaluation.
        </p>
      </div>
    </div>
  );
};

export default ResultsSection;
