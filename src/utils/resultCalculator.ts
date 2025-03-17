
export interface Result {
  score: number;
  maxScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  interpretation: string;
  recommendations: string[];
  answerArray: number[]; // Add the original answer array
}

export interface TreatmentOption {
  title: string;
  description: string;
  resourceLink?: string; // Add optional resource link
}

export const calculateResults = (answers: number[]): Result => {
  // Count the score according to the scoring system
  let score = 0;
  
  // For questions 1-7 and 9, "No" answers (0) are concerning
  // For questions 8 and 10, "Yes" answers (1) are concerning
  
  // Calculate score for questions 1-7 and 9
  [0, 1, 2, 3, 4, 5, 6, 8].forEach(index => {
    if (answers[index] === 0) score += 1; // "No" answer scores a point
  });
  
  // Calculate score for questions 8 and 10
  [7, 9].forEach(index => {
    if (answers[index] === 1) score += 1; // "Yes" answer scores a point
  });
  
  // Determine risk level based on score
  // Q-CHAT-10 thresholds: Low Risk (0-3), Medium Risk (4-7), High Risk (8-10)
  let riskLevel: 'low' | 'medium' | 'high';
  if (score <= 3) {
    riskLevel = 'low';
  } else if (score <= 7) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }
  
  // Generate interpretation and recommendations based on risk level
  let interpretation = '';
  let recommendations: string[] = [];
  
  switch (riskLevel) {
    case 'low':
      interpretation = `Your child scored ${score} out of 10, which indicates a low risk for autism spectrum disorder. This suggests typical development for their age.`;
      recommendations = [
        "Continue monitoring your child's development.",
        "Follow standard well-child visit schedules with your pediatrician.",
        "Engage in regular interactive play and communication activities with your child.",
        "If you notice any developmental concerns in the future, revisit this screening tool."
      ];
      break;
    
    case 'medium':
      interpretation = `Your child scored ${score} out of 10, which suggests a moderate risk for autism spectrum disorder. This indicates some behaviors that may require further assessment.`;
      recommendations = [
        "Schedule an appointment with your child's pediatrician to discuss these results.",
        "Consider a referral to a developmental pediatrician or child psychologist for further evaluation.",
        "Continue to engage in activities that promote social interaction and communication.",
        "Document any specific behaviors you notice that may be concerning."
      ];
      break;
    
    case 'high':
      interpretation = `Your child scored ${score} out of 10, which indicates a higher risk for autism spectrum disorder. This suggests the presence of several behaviors commonly associated with ASD.`;
      recommendations = [
        "Promptly schedule an evaluation with a developmental pediatrician, child neurologist, or child psychologist specializing in autism.",
        "Contact your local early intervention program for an assessment (available for children under 3 years).",
        "Consider autism-specific screening or diagnostic assessments such as the ADOS-2 or ADI-R.",
        "Join a parent support group to connect with other families navigating similar situations.",
        "Begin researching early intervention approaches and therapies."
      ];
      break;
  }
  
  return {
    score,
    maxScore: 10,
    riskLevel,
    interpretation,
    recommendations,
    answerArray: answers // Include the original answers array
  };
};

export const getTreatmentOptions = (riskLevel: 'low' | 'medium' | 'high'): TreatmentOption[] => {
  const commonOptions: TreatmentOption[] = [
    {
      title: "Parent Education and Training",
      description: "Learning strategies to support your child's development, communication, and behavior management at home.",
      resourceLink: "https://www.youtube.com/watch?v=ubflRfUOByI"
    },
    {
      title: "Speech and Language Therapy",
      description: "Helps develop communication skills, language comprehension, and social use of language.",
      resourceLink: "https://www.youtube.com/watch?v=pSGVb60-BSw"
    }
  ];

  switch (riskLevel) {
    case 'low':
      return [
        ...commonOptions,
        {
          title: "Developmental Monitoring",
          description: "Regular check-ups with pediatrician to track developmental milestones and address any concerns early.",
          resourceLink: "https://www.verywellmind.com/signs-of-autism-in-babies-7486843"
        },
        {
          title: "Social Engagement Activities",
          description: "Playgroups, storytime sessions, and other activities that promote social interaction and engagement.",
          resourceLink: "https://www.autismspeaks.org/science-news/autism-speaks-releases-new-cst-caregiver-quick-tips-videos-support-parents-and"
        }
      ];
    
    case 'medium':
      return [
        ...commonOptions,
        {
          title: "Occupational Therapy",
          description: "Addresses sensory processing, fine motor skills, and daily living activities to improve function and independence.",
          resourceLink: "https://www.youtube.com/channel/UChdlLGmro7NzDgCEF5SoLsQ"
        },
        {
          title: "Play Therapy",
          description: "Uses play to help children express themselves, develop social skills, and address emotional or behavioral challenges.",
          resourceLink: "https://www.youtube.com/watch?v=i0PPjK0lc9A"
        },
        {
          title: "Developmental Preschool",
          description: "Structured programs designed to support children with developmental concerns in a supportive educational environment.",
          resourceLink: "https://www.childrens.com/specialties-services/specialty-centers-and-programs/center-for-autism-care-parent-education-videos"
        }
      ];
    
    case 'high':
      return [
        ...commonOptions,
        {
          title: "Applied Behavior Analysis (ABA)",
          description: "Evidence-based therapy that focuses on improving specific behaviors such as communication, social skills, learning, and adaptive living skills.",
          resourceLink: "https://www.youtube.com/channel/UChdlLGmro7NzDgCEF5SoLsQ"
        },
        {
          title: "Occupational Therapy",
          description: "Addresses sensory processing, fine motor skills, and daily living activities to improve function and independence.",
          resourceLink: "https://www.youtube.com/channel/UChdlLGmro7NzDgCEF5SoLsQ"
        },
        {
          title: "Social Skills Training",
          description: "Structured teaching of social interaction, communication, and emotional understanding in individual or group settings.",
          resourceLink: "https://autismtherapies.com/parent-resources/video"
        },
        {
          title: "Early Intensive Behavioral Intervention",
          description: "Comprehensive treatment programs for young children, typically involving 25-40 hours of therapy per week.",
          resourceLink: "https://www.youtube.com/watch?v=L-aohWG5do0"
        },
        {
          title: "Assistive Technology",
          description: "Communication devices, visual supports, and other tools that can help with communication and learning.",
          resourceLink: "https://en.wikipedia.org/wiki/Video_modeling"
        }
      ];
  }
};
