
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WelcomeSection from '@/components/WelcomeSection';
import QuestionnaireSection from '@/components/QuestionnaireSection';
import ResultsSection from '@/components/ResultsSection';
import TreatmentSection from '@/components/TreatmentSection';
import { calculateResults, Result } from '@/utils/resultCalculator';
import { sendScreeningData } from '@/utils/apiService';
import { useToast } from '@/hooks/use-toast';

type AppSection = 'welcome' | 'questionnaire' | 'results' | 'treatment';

interface ScreeningData {
  answers: number[];
  basicInfo: Record<string, any>;
}

interface ModelPrediction {
  prediction: string;
  risk_questions: string[];
  score: number;
  risk_level: string;
}

const Index = () => {
  const [searchParams] = useSearchParams();
  const [currentSection, setCurrentSection] = useState<AppSection>('welcome');
  const [screeningData, setScreeningData] = useState<ScreeningData>({
    answers: [],
    basicInfo: {}
  });
  const [result, setResult] = useState<Result | null>(null);
  const [modelPrediction, setModelPrediction] = useState<ModelPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Check URL parameters on initial load
  useEffect(() => {
    const sectionParam = searchParams.get('section');
    if (sectionParam === 'treatment') {
      // For the treatments link in the header, we'll show a general treatment overview
      // with moderate risk level as default when no specific result is available
      if (!result) {
        // Create a placeholder result with medium risk
        const placeholderResult: Result = {
          score: 5,
          maxScore: 10,
          riskLevel: 'medium', 
          interpretation: 'This is an overview of potential treatment options.',
          recommendations: [],
          answerArray: []
        };
        setResult(placeholderResult);
      }
      setCurrentSection('treatment');
    }
  }, [searchParams, result]);
  
  const handleStartQuestionnaire = () => {
    setCurrentSection('questionnaire');
    // Scroll to top when starting questionnaire
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleQuestionnaireBacked = () => {
    setCurrentSection('welcome');
  };
  
  const handleQuestionnaireCompleted = async (answers: number[], basicInfo: Record<string, any>) => {
    setScreeningData({ answers, basicInfo });
    setIsLoading(true);
    
    try {
      // First, calculate results using the frontend logic
      const frontendResults = calculateResults(answers);
      setResult(frontendResults);
      
      // Then attempt to get a prediction from the ML model
      const prediction = await sendScreeningData(answers, basicInfo);
      setModelPrediction(prediction);
      
      console.log('Model prediction:', prediction);
      
      // Log the complete screening data with both frontend and backend results
      console.log('Complete screening data:', {
        answers,
        basicInfo,
        frontendResults,
        modelPrediction: prediction
      });
      
      setCurrentSection('results');
      
    } catch (error) {
      console.error('Failed to get prediction from ML model:', error);
      toast({
        title: "Unable to connect to prediction service",
        description: "Using built-in screening algorithm instead.",
        variant: "destructive"
      });
      
      // Still show results using the frontend calculation
      setCurrentSection('results');
    } finally {
      setIsLoading(false);
      // Scroll to top when showing results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleRestartQuestionnaire = () => {
    setCurrentSection('welcome');
    setScreeningData({
      answers: [],
      basicInfo: {}
    });
    setResult(null);
    setModelPrediction(null);
    // Scroll to top when restarting
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleShowTreatment = () => {
    setCurrentSection('treatment');
    // Scroll to top when showing treatment options
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBackToResults = () => {
    setCurrentSection('results');
    // Scroll to top when going back to results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Helper function to convert risk level to expected format
  const normalizeRiskLevel = (level: string): 'low' | 'medium' | 'high' => {
    const lowerLevel = level.toLowerCase();
    if (lowerLevel === 'low') return 'low';
    if (lowerLevel === 'medium') return 'medium'; 
    if (lowerLevel === 'high') return 'high';
    return 'low'; // Default to low if unknown
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Header />
      
      <main className="flex-grow">
        {currentSection === 'welcome' && (
          <WelcomeSection onStartQuestionnaire={handleStartQuestionnaire} />
        )}
        
        {currentSection === 'questionnaire' && (
          <QuestionnaireSection 
            onComplete={handleQuestionnaireCompleted} 
            onBack={handleQuestionnaireBacked}
            isLoading={isLoading}
          />
        )}
        
        {currentSection === 'results' && result && (
          <ResultsSection 
            result={result}
            modelPrediction={modelPrediction}
            onRestart={handleRestartQuestionnaire} 
            onTreatment={handleShowTreatment} 
          />
        )}
        
        {currentSection === 'treatment' && result && (
          <TreatmentSection 
            riskLevel={normalizeRiskLevel(modelPrediction?.risk_level || result.riskLevel)} 
            onBack={currentSection === 'results' ? handleBackToResults : handleRestartQuestionnaire} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
