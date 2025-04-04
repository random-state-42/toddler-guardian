
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePageTransition, useSectionTransition } from '../utils/animations';
import { Result } from '../utils/resultCalculator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { questions } from '../utils/questionData';
import { ShieldCheck } from 'lucide-react';

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
  const { sectionTransitionClass: section4Class } = useSectionTransition(800);
  
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

  const normalizeRiskLevel = (level: string): 'low' | 'medium' | 'high' => {
    const lowerLevel = level?.toLowerCase();
    if (lowerLevel === 'low') return 'low';
    if (lowerLevel === 'medium') return 'medium'; 
    if (lowerLevel === 'high') return 'high';
    return 'low'; // Default to low if unknown
  };
  
  const modelRiskLevel = modelPrediction ? normalizeRiskLevel(modelPrediction.risk_level) : 'low';
  
  const getQuestionText = (questionId: string): string => {
    const questionNumber = parseInt(questionId.replace('A', ''), 10);
    const question = questions.find(q => q.id === questionNumber);
    return question ? question.text : `Question ${questionId}`;
  };
  
  const getUserAnswer = (questionId: string, answers?: number[]): string => {
    if (!modelPrediction) return "Unknown answer";
    
    const questionNumber = parseInt(questionId.replace('A', ''), 10);
    const questionIndex = questionNumber - 1; // Convert to 0-based index
    
    if (answers && answers.length > questionIndex) {
      const actualAnswer = answers[questionIndex] === 1 ? "Yes" : "No";
      return `User answered: ${actualAnswer}`;
    }
    
    return "User answer not available";
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
      
      {modelPrediction && (
        <div className={`bg-white rounded-2xl shadow-elevation-2 overflow-hidden mb-8 ${section2Class}`}>
          <div className="p-6 sm:p-8 border-b border-neutral-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium text-neutral-900 mb-1">AI Model Prediction</h3>
                <p className="text-neutral-600 text-sm">
                  Score: {modelPrediction.score} points
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  className={`${modelPrediction.prediction.toLowerCase() === 'yes' ? 'bg-risk-high text-red-800' : 'bg-risk-low text-green-800'} text-sm font-medium px-4 py-1.5`}
                >
                  Prediction: {modelPrediction.prediction}
                </Badge>
                <div className={`chip ${getRiskColor(modelRiskLevel)} ${getRiskTextColor(modelRiskLevel)} text-sm font-medium px-4 py-1.5`}>
                  {modelPrediction.risk_level} Risk
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 sm:p-8 border-b border-neutral-200">
            <h4 className="text-lg font-medium text-neutral-900 mb-3">Identified Risk Indicators</h4>
            <div className="space-y-3">
              {modelPrediction.risk_questions.map((questionId, index) => (
                <div key={index} className="p-3 rounded-lg bg-risk-high/10 border border-red-200">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <Badge className="bg-risk-high text-red-800 shrink-0 mt-0.5">
                        Question {questionId.replace('A', '')}
                      </Badge>
                      <p className="text-red-800">{getQuestionText(questionId)}</p>
                    </div>
                    <p className="text-sm text-red-700 font-medium ml-10">
                      {getUserAnswer(questionId, result ? result.answerArray : undefined)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Alert className="mt-4 bg-risk-high/10 border-risk-high/30">
              <AlertTitle className="text-red-700">Attention Required</AlertTitle>
              <AlertDescription className="text-red-700/80">
                The AI model has identified these questions as potential indicators of concern. 
                Review these areas with a healthcare professional.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
      
      <div className={`bg-white rounded-2xl shadow-elevation-2 overflow-hidden mb-8 ${section3Class}`}>
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
        
        {result.riskLevel === 'low' && (
          <div className="p-6 sm:p-8 border-b border-neutral-200 bg-risk-low/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-risk-low flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-green-800" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-green-800 mb-1">Your Child Appears to be Safe</h4>
                <p className="text-green-700">
                  A low-risk result suggests that your child's behavior is typical for their age, and no immediate action is needed. 
                  Continue to monitor their development as they grow.
                </p>
              </div>
            </div>
          </div>
        )}
        
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
      
      <div className={`flex flex-col sm:flex-row gap-4 justify-center ${section4Class}`}>
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
      
      {result.riskLevel === 'low' && (
        <div className="text-center mt-3 text-green-700 font-medium">
          Treatment is not required for low-risk results
        </div>
      )}
      
      <div className={`mt-8 bg-neutral-100 rounded-2xl p-6 ${section4Class}`}>
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
