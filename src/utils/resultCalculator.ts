
export interface Result {
  score: number;
  maxScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  interpretation: string;
  recommendations: string[];
}

export const calculateResults = (answers: number[]): Result => {
  // Calculate total score (the sum of all answers)
  const score = answers.reduce((acc, current) => acc + current, 0);
  
  // Maximum possible score
  const maxScore = 10; // 10 questions, max 1 point each
  
  // Determine risk level based on score
  let riskLevel: 'low' | 'medium' | 'high';
  let interpretation: string;
  let recommendations: string[];
  
  if (score <= 3) {
    riskLevel = 'low';
    interpretation = "Based on your responses using the Q-chat-10-Toddler screening tool, your child currently shows few behavioral indicators that are commonly associated with autism spectrum disorder. This suggests a low risk level.";
    recommendations = [
      "Continue monitoring your child's development",
      "Engage in interactive play and communication activities",
      "Discuss any new concerns with your pediatrician at regular check-ups",
      "Consider a follow-up screening in 6-12 months"
    ];
  } else if (score <= 6) {
    riskLevel = 'medium';
    interpretation = "Your child's responses on the Q-chat-10-Toddler screening tool indicate some behavioral patterns that may be associated with autism spectrum disorder. This suggests a medium risk level that warrants attention.";
    recommendations = [
      "Schedule an evaluation with a developmental pediatrician",
      "Consider a comprehensive assessment by a multidisciplinary team",
      "Look into early intervention services in your area",
      "Focus on engagement and communication in daily activities",
      "Join parent support groups for additional resources"
    ];
  } else {
    riskLevel = 'high';
    interpretation = "Your responses on the Q-chat-10-Toddler screening tool indicate several behavioral patterns that are commonly associated with autism spectrum disorder. This suggests a higher risk level that requires prompt professional attention.";
    recommendations = [
      "Seek immediate evaluation with a developmental specialist",
      "Contact your local early intervention program for an assessment",
      "Request referrals to autism specialists (developmental pediatrician, child psychologist)",
      "Begin researching evidence-based intervention approaches",
      "Connect with autism support organizations for guidance and resources",
      "Remember that early intervention can significantly improve outcomes"
    ];
  }
  
  return {
    score,
    maxScore,
    riskLevel,
    interpretation,
    recommendations
  };
};

export const getTreatmentOptions = (riskLevel: 'low' | 'medium' | 'high'): any[] => {
  const commonTreatments = [
    {
      title: "Applied Behavior Analysis (ABA)",
      description: "A therapy based on learning and behavior principles that focuses on improving specific behaviors such as communication, social skills, learning, and adaptive behaviors.",
      suitable: ['medium', 'high'],
    },
    {
      title: "Speech-Language Therapy",
      description: "Helps with language development, communication skills, and social interaction. Can be beneficial for children with various communication challenges.",
      suitable: ['low', 'medium', 'high'],
    },
    {
      title: "Occupational Therapy",
      description: "Focuses on developing fine motor skills, sensory processing, and daily living skills to increase independence and participation.",
      suitable: ['medium', 'high'],
    },
    {
      title: "Early Intervention Programs",
      description: "Specialized programs for children under 3 years that include a range of therapies and support services tailored to developmental needs.",
      suitable: ['medium', 'high'],
    },
    {
      title: "Social Skills Training",
      description: "Structured teaching of social interaction skills, understanding social cues, and developing relationships with peers.",
      suitable: ['low', 'medium', 'high'],
    },
    {
      title: "Parent-Mediated Intervention",
      description: "Programs that train parents to implement therapeutic practices at home, enhancing learning in natural environments.",
      suitable: ['low', 'medium', 'high'],
    },
    {
      title: "Developmental, Individual Differences, Relationship-Based Approach (DIR/Floortime)",
      description: "A relationship-based therapy that focuses on following the child's lead during play to develop social, emotional, and intellectual capacities.",
      suitable: ['low', 'medium', 'high'],
    },
    {
      title: "Picture Exchange Communication System (PECS)",
      description: "A visual communication system that helps children communicate by exchanging pictures for items or activities they want.",
      suitable: ['medium', 'high'],
    },
  ];
  
  return commonTreatments.filter(treatment => treatment.suitable.includes(riskLevel));
};
