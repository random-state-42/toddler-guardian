
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WelcomeSection from '@/components/WelcomeSection';
import QuestionnaireSection from '@/components/QuestionnaireSection';
import ResultsSection from '@/components/ResultsSection';
import TreatmentSection from '@/components/TreatmentSection';
import { calculateResults, Result } from '@/utils/resultCalculator';

type AppSection = 'welcome' | 'questionnaire' | 'results' | 'treatment';

const Index = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>('welcome');
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  
  const handleStartQuestionnaire = () => {
    setCurrentSection('questionnaire');
    // Scroll to top when starting questionnaire
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleQuestionnaireBacked = () => {
    setCurrentSection('welcome');
  };
  
  const handleQuestionnaireCompleted = (answers: number[]) => {
    setAnswers(answers);
    const results = calculateResults(answers);
    setResult(results);
    setCurrentSection('results');
    // Scroll to top when showing results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleRestartQuestionnaire = () => {
    setCurrentSection('welcome');
    setAnswers([]);
    setResult(null);
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
          />
        )}
        
        {currentSection === 'results' && result && (
          <ResultsSection 
            result={result} 
            onRestart={handleRestartQuestionnaire} 
            onTreatment={handleShowTreatment} 
          />
        )}
        
        {currentSection === 'treatment' && result && (
          <TreatmentSection 
            riskLevel={result.riskLevel} 
            onBack={handleBackToResults} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
