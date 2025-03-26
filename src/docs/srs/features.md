
# 3. System Features

## 3.1 Welcome Section
### 3.1.1 Description
The landing page introduces users to the screening tool, its purpose, and limitations.

### 3.1.2 Functional Requirements
- SHALL display an introduction to the screening tool
- SHALL provide a clear call-to-action to begin the questionnaire
- SHALL include a disclaimer about the tool's educational nature

## 3.2 Questionnaire Section
### 3.2.1 Description
Users answer a series of questions about their child's behavior and development, along with basic demographic information.

### 3.2.2 Functional Requirements
- SHALL present 10 behavioral questions from the Q-CHAT-10 assessment
- SHALL collect basic demographic information (age, sex, ethnicity, etc.)
- SHALL validate that all required questions are answered
- SHALL allow users to navigate back to previous questions
- SHALL display progress indicator showing completion status
- SHALL provide brief descriptions/examples for each question to aid understanding

## 3.3 Results Section
### 3.3.1 Description
The system processes user responses to generate a preliminary risk assessment.

### 3.3.2 Functional Requirements
- SHALL calculate a risk score based on answer patterns
- SHALL classify results into risk categories (low, medium, high)
- SHALL display the score and risk level clearly
- SHALL provide an interpretation of the results
- SHALL offer specific recommendations based on the risk level
- SHALL emphasize the non-diagnostic nature of the screening
- SHALL provide options to restart or view treatment information
- SHOULD attempt to use machine learning prediction if available
- SHALL fallback to local calculation if prediction service is unavailable

## 3.4 Treatment Section
### 3.4.1 Description
This section provides information about potential treatment and intervention options based on the child's risk level.

### 3.4.2 Functional Requirements
- SHALL display treatment options relevant to the identified risk level
- SHALL provide brief descriptions of each treatment approach
- SHALL include links to educational resources
- SHALL allow navigation back to results or restart the process
