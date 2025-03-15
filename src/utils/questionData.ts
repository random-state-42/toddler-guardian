
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
    text: "Does your child make eye contact with you?",
    description: "Observe how your child looks at you during interactions.",
    options: [
      { text: "Rarely or never", value: 2 },
      { text: "Sometimes, but inconsistently", value: 1 },
      { text: "Regularly and appropriately", value: 0 },
    ],
  },
  {
    id: 2,
    text: "Does your child respond to their name when called?",
    description: "Notice if your child turns toward you when you call their name.",
    options: [
      { text: "Rarely or never", value: 2 },
      { text: "Sometimes, but inconsistently", value: 1 },
      { text: "Consistently responds", value: 0 },
    ],
  },
  {
    id: 3,
    text: "Does your child point at objects to show interest?",
    description: "For example, pointing at airplanes, interesting animals, or new toys.",
    options: [
      { text: "Rarely or never points", value: 2 },
      { text: "Sometimes points", value: 1 },
      { text: "Regularly points to show things", value: 0 },
    ],
  },
  {
    id: 4,
    text: "Does your child engage in pretend play?",
    description: "For example, pretending to feed a doll or make toy animals interact.",
    options: [
      { text: "Rarely or never", value: 2 },
      { text: "Limited pretend play", value: 1 },
      { text: "Regularly engages in pretend play", value: 0 },
    ],
  },
  {
    id: 5,
    text: "Does your child show interest in other children?",
    description: "Notice if they watch, approach, or try to play with other children.",
    options: [
      { text: "Shows little interest", value: 2 },
      { text: "Watches but doesn't interact much", value: 1 },
      { text: "Shows clear interest and engagement", value: 0 },
    ],
  },
  {
    id: 6,
    text: "How does your child communicate their needs?",
    description: "Observe how they let you know what they want.",
    options: [
      { text: "Mainly through crying or tantrums", value: 2 },
      { text: "Some gestures or simple words", value: 1 },
      { text: "Using words or clear gestures appropriately", value: 0 },
    ],
  },
  {
    id: 7,
    text: "Does your child have repetitive behaviors or strict routines?",
    description: "Such as lining up toys, repeating actions, or insisting on specific routines.",
    options: [
      { text: "Frequently and is distressed if interrupted", value: 2 },
      { text: "Sometimes engages in repetitive behaviors", value: 1 },
      { text: "Minimal repetitive behaviors", value: 0 },
    ],
  },
  {
    id: 8,
    text: "How does your child react to changes in routine?",
    description: "Notice how they handle transitions or unexpected changes.",
    options: [
      { text: "Often becomes very upset", value: 2 },
      { text: "Sometimes becomes upset", value: 1 },
      { text: "Generally adapts well", value: 0 },
    ],
  },
  {
    id: 9,
    text: "Does your child have unusual sensory interests or sensitivities?",
    description: "Such as being overly sensitive to sounds, fascinated by lights, or seeking deep pressure.",
    options: [
      { text: "Strong sensory sensitivities or interests", value: 2 },
      { text: "Some sensory preferences or sensitivities", value: 1 },
      { text: "No unusual sensory patterns", value: 0 },
    ],
  },
  {
    id: 10,
    text: "How does your child share their joy or interests with you?",
    description: "Notice if they show you things they like or share their excitement.",
    options: [
      { text: "Rarely shares enjoyment or interests", value: 2 },
      { text: "Sometimes shares but inconsistently", value: 1 },
      { text: "Regularly shares enjoyment and interests", value: 0 },
    ],
  },
];
