
# 5. Non-Functional Requirements

## 5.1 Performance Requirements
- SHALL load initial page in under 3 seconds on standard connections
- SHALL process questionnaire submissions in under 2 seconds
- SHALL support at least 100 concurrent users

## 5.2 Safety Requirements
- SHALL include clear disclaimers about the limitations of the screening tool
- SHALL emphasize the importance of professional medical evaluation
- SHALL not store personally identifiable information

## 5.3 Security Requirements
- SHALL not persistently store user responses or results
- SHALL implement CORS policies to prevent unauthorized API access

## 5.4 Software Quality Attributes
- **Reliability**: SHALL provide consistent results for identical inputs
- **Availability**: SHALL be accessible 99.5% of the time
- **Maintainability**: SHALL have modular code structure
- **Portability**: SHALL work across major browsers and devices

## 5.5 Business Rules
- SHALL present scientifically validated screening methods
- SHALL provide balanced and unbiased recommendations
- SHALL clearly state when information is based on opinion vs. evidence
