
export interface Question {
  id: number;
  text: string;
  description?: string;
  options: {
    text: string;
    value: number;
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Does your child look at you when you call his/her name?",
    description: "Observe how your child responds when you call their name.",
    options: [
      { text: "Rarely or never", value: 1 },
      { text: "Sometimes, but inconsistently", value: 0.5 },
      { text: "Often or always", value: 0 },
    ],
  },
  {
    id: 2,
    text: "How easy is it for you to get eye contact with your child?",
    description: "Consider how readily your child makes eye contact during interactions.",
    options: [
      { text: "Very difficult", value: 1 },
      { text: "Somewhat difficult", value: 0.5 },
      { text: "Easy, no difficulty", value: 0 },
    ],
  },
  {
    id: 3,
    text: "Does your child point to indicate that s/he wants something?",
    description: "For example, pointing at a toy that is out of reach.",
    options: [
      { text: "Rarely or never points", value: 1 },
      { text: "Sometimes points", value: 0.5 },
      { text: "Regularly points to indicate wants", value: 0 },
    ],
  },
  {
    id: 4,
    text: "Does your child point to share interest with you?",
    description: "For example, pointing at an interesting sight or object to direct your attention to it.",
    options: [
      { text: "Rarely or never", value: 1 },
      { text: "Sometimes", value: 0.5 },
      { text: "Often or always", value: 0 },
    ],
  },
  {
    id: 5,
    text: "Does your child pretend?",
    description: "For example, caring for dolls or talking on a toy phone.",
    options: [
      { text: "Rarely or never", value: 1 },
      { text: "Sometimes, limited pretend play", value: 0.5 },
      { text: "Regularly engages in pretend play", value: 0 },
    ],
  },
  {
    id: 6,
    text: "Does your child follow where you're looking?",
    description: "Notice if your child follows your gaze or looks where you are looking.",
    options: [
      { text: "Rarely or never", value: 1 },
      { text: "Sometimes", value: 0.5 },
      { text: "Often or always", value: 0 },
    ],
  },
  {
    id: 7,
    text: "If you or someone else in the family is visibly upset, does your child show signs of wanting to comfort them?",
    description: "For example, stroking hair, hugging them, or showing concern.",
    options: [
      { text: "Rarely or never", value: 1 },
      { text: "Sometimes", value: 0.5 },
      { text: "Often shows comforting behavior", value: 0 },
    ],
  },
  {
    id: 8,
    text: "Would you describe your child's first words as:",
    description: "Consider the quality and context of your child's early language.",
    options: [
      { text: "Unusual or absent", value: 1 },
      { text: "Somewhat typical", value: 0.5 },
      { text: "Completely typical", value: 0 },
    ],
  },
  {
    id: 9,
    text: "Does your child use simple gestures?",
    description: "For example, waving goodbye or nodding yes.",
    options: [
      { text: "Rarely or never", value: 1 },
      { text: "Sometimes", value: 0.5 },
      { text: "Regularly uses gestures", value: 0 },
    ],
  },
  {
    id: 10,
    text: "Does your child stare at nothing with no apparent purpose?",
    description: "Notice if your child appears to fixate on empty space or stares without focus.",
    options: [
      { text: "Often", value: 1 },
      { text: "Sometimes", value: 0.5 },
      { text: "Rarely or never", value: 0 },
    ],
  },
];
