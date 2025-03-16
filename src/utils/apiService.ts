
import axios from 'axios';

interface PredictionResponse {
  prediction: string;
  risk_questions: string[];
  score: number;
  risk_level: string;
}

export const sendScreeningData = async (
  answers: number[],
  basicInfo: Record<string, any>
): Promise<PredictionResponse> => {
  try {
    // In the form, user selects "Yes" (1) or "No" (0)
    // The backend expects 1 for concerning answers and 0 for non-concerning answers
    
    // For Q-CHAT-10, questions 1-7 and 9, "No" (0) is concerning
    // For questions 8 and 10, "Yes" (1) is concerning
    
    // We need to map the answers to the format expected by the backend
    const mappedAnswers = [...answers];
    
    // For questions 1-7 and 9, we need to invert the answers (0→1, 1→0)
    // because in our UI, 1 is "Yes" and 0 is "No", but for these questions,
    // "No" answers indicate risk
    [0, 1, 2, 3, 4, 5, 6, 8].forEach(index => {
      // Invert answers for questions 1-7 and 9
      mappedAnswers[index] = answers[index] === 1 ? 0 : 1;
    });
    
    // No inversion needed for questions 8 and 10 (indices 7 and 9)
    // as "Yes" answers already indicate risk
    
    // Format the data as expected by the backend
    const formattedData = {
      A1: mappedAnswers[0],
      A2: mappedAnswers[1],
      A3: mappedAnswers[2],
      A4: mappedAnswers[3],
      A5: mappedAnswers[4],
      A6: mappedAnswers[5],
      A7: mappedAnswers[6],
      A8: mappedAnswers[7],
      A9: mappedAnswers[8],
      A10: mappedAnswers[9],
      
      // Map demographic information
      Age_Mons: parseInt(basicInfo.age, 10),
      Sex: basicInfo.sex === 'male' ? 1 : 0, // Assuming male=1, female=0 in your model
      Ethnicity: mapEthnicity(basicInfo.ethnicity),
      Jaundice: basicInfo.jaundice === 'yes' ? 1 : 0,
      Family_mem_with_ASD: basicInfo.family_asd === 'yes' ? 1 : 0,
      'Who completed the test': mapRespondent(basicInfo.respondent)
    };

    console.log("Sending data to backend:", formattedData);
    console.log("Original answers:", answers);
    console.log("Mapped answers for backend:", mappedAnswers);
    
    // Send data to backend API
    const response = await axios.post('http://localhost:5000/predict', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error sending data to backend:', error);
    throw error;
  }
};

// Map ethnicity to numeric values as expected by the model
const mapEthnicity = (ethnicity: string): number => {
  const ethnicityMap: Record<string, number> = {
    'asian': 0,
    'african': 1,
    'caucasian': 2,
    'hispanic': 3,
    'middle_eastern': 4,
    'other': 5
  };
  
  return ethnicityMap[ethnicity] || 5; // Default to 'other' if not found
};

// Map respondent to numeric values as expected by the model
const mapRespondent = (respondent: string): number => {
  const respondentMap: Record<string, number> = {
    'parent': 0,
    'caregiver': 1,
    'medical_staff': 2,
    'clinician': 3,
    'other': 4
  };
  
  return respondentMap[respondent] || 4; // Default to 'other' if not found
};
