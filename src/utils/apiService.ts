
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
    // Format the data as expected by the backend
    const formattedData = {
      // Map A1 through A10 questions
      A1: answers[0],
      A2: answers[1],
      A3: answers[2],
      A4: answers[3],
      A5: answers[4],
      A6: answers[5],
      A7: answers[6],
      A8: answers[7],
      A9: answers[8],
      A10: answers[9],
      
      // Map demographic information
      Age_Mons: parseInt(basicInfo.age, 10),
      Sex: basicInfo.sex === 'male' ? 1 : 0, // Assuming male=1, female=0 in your model
      Ethnicity: mapEthnicity(basicInfo.ethnicity),
      Jaundice: basicInfo.jaundice === 'yes' ? 1 : 0,
      Family_mem_with_ASD: basicInfo.family_asd === 'yes' ? 1 : 0,
      'Who completed the test': mapRespondent(basicInfo.respondent)
    };

    console.log("Sending data to backend:", formattedData);
    
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
