
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ProgressIndicator from './ui/ProgressIndicator';
import { questions } from '../utils/questionData';
import { usePageTransition } from '../utils/animations';

interface QuestionnaireSectionProps {
  onComplete: (answers: number[]) => void;
  onBack: () => void;
}

const QuestionnaireSection = ({ onComplete, onBack }: QuestionnaireSectionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [currentAnswer, setCurrentAnswer] = useState<number>(-1);
  const [animating, setAnimating] = useState(false);
  const { pageTransitionClass } = usePageTransition();
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // When the question changes, load the previous answer if it exists
  useEffect(() => {
    setCurrentAnswer(answers[currentQuestionIndex]);
  }, [currentQuestionIndex, answers]);
  
  const handleOptionSelect = (value: string) => {
    setCurrentAnswer(parseInt(value, 10));
  };
  
  const handleNext = () => {
    // Update answers array with current selection
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question with animation
      setAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnimating(false);
      }, 350);
    } else {
      // Questionnaire completed
      onComplete(newAnswers);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Update answers array with current selection
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = currentAnswer;
      setAnswers(newAnswers);
      
      // Move to previous question with animation
      setAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setAnimating(false);
      }, 350);
    } else {
      // Go back to welcome screen
      onBack();
    }
  };
  
  return (
    <div className={`w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 ${pageTransitionClass}`}>
      <div className="mb-12">
        <ProgressIndicator 
          currentStep={currentQuestionIndex + 1} 
          totalSteps={questions.length}
        />
      </div>
      
      <div className={`transition-all duration-350 ease-in-out-expo ${animating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
        <div className="mb-8">
          <div className="chip bg-blue-light text-blue-dark mb-2">Question {currentQuestionIndex + 1}</div>
          <h2 className="text-2xl font-display font-medium text-neutral-900 mb-3">
            {currentQuestion.text}
          </h2>
          {currentQuestion.description && (
            <p className="text-neutral-600 text-base">
              {currentQuestion.description}
            </p>
          )}
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-elevation-1 mb-8">
          <RadioGroup 
            value={currentAnswer.toString()} 
            onValueChange={handleOptionSelect}
            className="space-y-5"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-light/20 transition-colors">
                <RadioGroupItem 
                  value={option.value.toString()} 
                  id={`option-${index}`} 
                  className="mt-1"
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="cursor-pointer font-normal leading-relaxed"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="flex justify-between">
          <Button 
            onClick={handlePrevious}
            variant="outline"
            className="border-blue-primary text-blue-primary hover:bg-blue-light"
          >
            {currentQuestionIndex === 0 ? 'Back to Start' : 'Previous Question'}
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={currentAnswer === -1}
            className="bg-blue-primary hover:bg-blue-dark text-white shadow-button hover:shadow-button-hover transform hover:-translate-y-0.5 transition-all duration-250"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit & See Results' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireSection;
