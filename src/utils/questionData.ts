
export interface Question {
  id: number;
  text: string;
  description?: string;
  options: {
    text: string;
    value: number;
  }[];
  type?: 'radio' | 'text' | 'select';
}

export interface BasicInfo {
  id: string;
  text: string;
  description?: string;
  type: 'number' | 'radio' | 'select' | 'text';
  options?: {
    text: string;
    value: string;
  }[];
  required?: boolean;
}

export const basicInfoQuestions: BasicInfo[] = [
  {
    id: "age",
    text: "What is your child's age (in months)?",
    type: "number",
    required: true
  },
  {
    id: "sex",
    text: "What is your child's sex?",
    type: "radio",
    options: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" }
    ],
    required: true
  },
  {
    id: "ethnicity",
    text: "What is your child's ethnicity?",
    type: "select",
    options: [
      { text: "Asian", value: "asian" },
      { text: "African", value: "african" },
      { text: "Caucasian", value: "caucasian" },
      { text: "Hispanic", value: "hispanic" },
      { text: "Middle Eastern", value: "middle_eastern" },
      { text: "Other", value: "other" }
    ],
    required: true
  },
  {
    id: "jaundice",
    text: "Was your child born with jaundice?",
    type: "radio",
    options: [
      { text: "Yes", value: "yes" },
      { text: "No", value: "no" }
    ],
    required: true
  },
  {
    id: "family_asd",
    text: "Does your child have an immediate family member with Autism Spectrum Disorder (ASD)?",
    type: "radio",
    options: [
      { text: "Yes", value: "yes" },
      { text: "No", value: "no" }
    ],
    required: true
  },
  {
    id: "respondent",
    text: "Who is completing this screening test?",
    type: "select",
    options: [
      { text: "Parent", value: "parent" },
      { text: "Caregiver", value: "caregiver" },
      { text: "Medical Staff", value: "medical_staff" },
      { text: "Clinician", value: "clinician" },
      { text: "Other", value: "other" }
    ],
    required: true
  }
];

export const questions: Question[] = [
  {
    id: 1,
    text: "Does your child look at you when you call his/her name?",
    description: "Observe how your child responds when you call their name.",
    options: [
      { text: "Yes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    id: 2,
    text: "How easy is it for you to get eye contact with your child?",
    description: "Consider how readily your child makes eye contact during interactions.",
    options: [
      { text: "Yes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    id: 3,
    text: "Does your child point to indicate that they want something?",
    description: "For example, pointing at a toy that is out of reach.",
    options: [
      { text: "Yes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    id: 4,
    text: "Does your child point to share interest with you?",
    description: "For example, pointing at an interesting sight or object to direct your attention to it.",
    options: [
      { text: "Yes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    id: 5,
    text: "Does your child pretend play?",
    description: "For example, caring for dolls or talking on a toy phone.",
    options: [
      { text: "Yes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    id: 6,
    text: "Does your child follow where you're looking?",
    description: "Notice if your child follows your gaze or looks where you are looking.",
    options: [
      { text: "Yes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    id: 7,
    text: "If someone in the family is visibly upset, does your child show signs of wanting to comfort them?",
    description: "For example, stroking hair, hugging them, or showing concern.",
    options: [
      { text: "Yes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    id: 8,
    text: "Would you describe your child's first words as delayed?",
    description: "Consider the timing and quality of your child's early language development.",
    options: [
      { text: "Yes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    id: 9,
    text: "Does your child use simple gestures?",
    description: "For example, waving goodbye or nodding yes.",
    options: [
      { text: "Yes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
  {
    id: 10,
    text: "Does your child stare at nothing with no apparent purpose?",
    description: "Notice if your child appears to fixate on empty space or stares without focus.",
    options: [
      { text: "Yes", value: 1 },
      { text: "No", value: 0 },
    ],
  },
];
