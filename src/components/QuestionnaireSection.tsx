import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProgressIndicator from './ui/ProgressIndicator';
import { questions, basicInfoQuestions } from '../utils/questionData';
import { usePageTransition } from '../utils/animations';

interface QuestionnaireSectionProps {
  onComplete: (answers: number[], basicInfo: Record<string, any>) => void;
  onBack: () => void;
  isLoading?: boolean;
}

type QuestionnaireStep = 'basic-info' | 'screening';

const QuestionnaireSection = ({ onComplete, onBack, isLoading = false }: QuestionnaireSectionProps) => {
  const [currentStep, setCurrentStep] = useState<QuestionnaireStep>('basic-info');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [currentAnswer, setCurrentAnswer] = useState<number>(-1);
  const [basicInfo, setBasicInfo] = useState<Record<string, any>>({});
  const [animating, setAnimating] = useState(false);
  const { pageTransitionClass } = usePageTransition();
  
  const currentQuestion = questions[currentQuestionIndex];
  
  useEffect(() => {
    if (currentStep === 'screening') {
      setCurrentAnswer(answers[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, answers, currentStep]);
  
  const handleOptionSelect = (value: string) => {
    setCurrentAnswer(parseInt(value, 10));
  };
  
  const handleBasicInfoChange = (id: string, value: any) => {
    setBasicInfo(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleStartScreening = () => {
    const isBasicInfoComplete = basicInfoQuestions.every(q => 
      !q.required || (basicInfo[q.id] !== undefined && basicInfo[q.id] !== '')
    );
    
    if (isBasicInfoComplete) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep('screening');
        setAnimating(false);
      }, 350);
    } else {
      alert("Please complete all required fields before proceeding.");
    }
  };
  
  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnimating(false);
      }, 350);
    } else {
      onComplete(newAnswers, basicInfo);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep === 'screening') {
      if (currentQuestionIndex > 0) {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = currentAnswer;
        setAnswers(newAnswers);
        
        setAnimating(true);
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
          setAnimating(false);
        }, 350);
      } else {
        setAnimating(true);
        setTimeout(() => {
          setCurrentStep('basic-info');
          setAnimating(false);
        }, 350);
      }
    } else {
      onBack();
    }
  };
  
  const renderBasicInfoSection = () => {
    return (
      <div className={`transition-all duration-350 ${animating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
        <div className="mb-8">
          <h2 className="text-2xl font-display font-medium text-neutral-900 mb-3">
            Child's Basic Information
          </h2>
          <p className="text-neutral-600 text-base">
            Please provide the following information about your child before proceeding to the screening questions.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-elevation-1 mb-8">
          <div className="space-y-6">
            {basicInfoQuestions.map((question) => (
              <div key={question.id} className="space-y-2">
                <Label htmlFor={question.id} className="font-medium">
                  {question.text} {question.required && <span className="text-red-500">*</span>}
                </Label>
                
                {question.type === 'number' && (
                  <Input
                    id={question.id}
                    type="number"
                    value={basicInfo[question.id] || ''}
                    onChange={(e) => handleBasicInfoChange(question.id, e.target.value)}
                    className="w-full"
                    required={question.required}
                  />
                )}
                
                {question.type === 'text' && (
                  <Input
                    id={question.id}
                    type="text"
                    value={basicInfo[question.id] || ''}
                    onChange={(e) => handleBasicInfoChange(question.id, e.target.value)}
                    className="w-full"
                    required={question.required}
                  />
                )}
                
                {question.type === 'radio' && question.options && (
                  <RadioGroup
                    value={basicInfo[question.id] || ''}
                    onValueChange={(value) => handleBasicInfoChange(question.id, value)}
                    className="space-y-3"
                  >
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-light/20 transition-colors">
                        <RadioGroupItem 
                          value={option.value} 
                          id={`${question.id}-option-${index}`} 
                          className="mt-1"
                        />
                        <Label 
                          htmlFor={`${question.id}-option-${index}`} 
                          className="cursor-pointer font-normal leading-relaxed"
                        >
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                
                {question.type === 'select' && question.options && (
                  <Select
                    value={basicInfo[question.id] || ''}
                    onValueChange={(value) => handleBasicInfoChange(question.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {question.description && (
                  <p className="text-sm text-neutral-500 mt-1">{question.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            onClick={onBack}
            variant="outline"
            className="border-blue-primary text-blue-primary hover:bg-blue-light"
          >
            Back to Start
          </Button>
          
          <Button 
            onClick={handleStartScreening}
            className="bg-blue-primary hover:bg-blue-dark text-white shadow-button hover:shadow-button-hover transform hover:-translate-y-0.5 transition-all duration-250"
          >
            Continue to Screening
          </Button>
        </div>
      </div>
    );
  };
  
  const renderScreeningSection = () => {
    return (
      <>
        <div className="mb-12">
          <ProgressIndicator 
            currentStep={currentQuestionIndex + 1} 
            totalSteps={questions.length}
          />
        </div>
        
        <div className={`transition-all duration-350 ${animating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
          <div className="mb-8">
            <div className="chip bg-blue-light text-blue-dark mb-2">Screening Question {currentQuestionIndex + 1}</div>
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
              disabled={isLoading}
            >
              {currentQuestionIndex === 0 ? 'Back to Basic Info' : 'Previous Question'}
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={currentAnswer === -1 || isLoading}
              className="bg-blue-primary hover:bg-blue-dark text-white shadow-button hover:shadow-button-hover transform hover:-translate-y-0.5 transition-all duration-250"
            >
              {currentQuestionIndex === questions.length - 1 ? 
                (isLoading ? 'Processing...' : 'Submit & See Results') : 
                'Next Question'}
            </Button>
          </div>
        </div>
      </>
    );
  };
  
  return (
    <div className={`w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 ${pageTransitionClass}`}>
      {currentStep === 'basic-info' ? renderBasicInfoSection() : renderScreeningSection()}
    </div>
  );
};

export default QuestionnaireSection;
