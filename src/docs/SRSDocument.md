
# Software Requirements Specification (SRS)
# ToddlerGuardian: Autism Screening Tool

## 1. Introduction

### 1.1 Purpose
This document specifies the software requirements for the ToddlerGuardian application, an online autism screening tool designed to help parents and caregivers identify potential signs of autism spectrum disorder in young children.

### 1.2 Document Conventions
- **SHALL**: Indicates a mandatory requirement
- **SHOULD**: Indicates a recommended but not mandatory requirement
- **MAY**: Indicates an optional requirement

### 1.3 Intended Audience and Reading Suggestions
This document is intended for:
- Project developers and designers
- Quality assurance testers
- Project evaluators (professors and academic staff)
- Potential stakeholders (healthcare professionals)

### 1.4 Project Scope
ToddlerGuardian is a web-based application that provides a screening questionnaire based on established autism assessment criteria. The system evaluates user responses to provide a preliminary risk assessment and recommended next steps, including treatment options. The application focuses on early detection to promote timely intervention.

### 1.5 References
- Q-CHAT-10 (Quantitative Checklist for Autism in Toddlers)
- American Academy of Pediatrics autism screening guidelines
- DSM-5 criteria for Autism Spectrum Disorder

## 2. Overall Description

### 2.1 Product Perspective
ToddlerGuardian is a standalone web application that operates without external system dependencies, except for optional machine learning prediction services. The system is designed to be accessible across different devices and platforms.

### 2.2 Product Features
- User-friendly questionnaire
- Basic demographic information collection
- Automatic scoring and risk assessment
- Results interpretation
- Treatment recommendations based on risk level
- Educational resources on autism spectrum disorder

### 2.3 User Classes and Characteristics
- **Primary Users**: Parents and caregivers of young children (ages 16-30 months)
- **Secondary Users**: Healthcare providers, early intervention specialists, educators
- Users are expected to have basic computer literacy but no specialized knowledge

### 2.4 Operating Environment
- Web browsers: Chrome, Firefox, Safari, Edge (latest two versions)
- Devices: Desktop computers, laptops, tablets, and mobile phones
- Operating Systems: Windows, macOS, iOS, Android

### 2.5 Design and Implementation Constraints
- Compliance with accessibility guidelines (WCAG 2.1)
- Responsive design for all screen sizes
- No requirement for user accounts or data persistence between sessions
- Machine learning model integration is optional but recommended

### 2.6 User Documentation
- In-app educational content about autism spectrum disorder
- Guidelines for interpreting screening results
- Disclaimer about the screening tool's limitations
- Resources for seeking professional evaluation

### 2.7 Assumptions and Dependencies
- Users have access to a device with an internet connection
- Users can read and comprehend English at an 8th-grade reading level
- Machine learning prediction service may be unavailable, requiring fallback to local calculation

## 3. System Features

### 3.1 Welcome Section
#### 3.1.1 Description
The landing page introduces users to the screening tool, its purpose, and limitations.

#### 3.1.2 Functional Requirements
- SHALL display an introduction to the screening tool
- SHALL provide a clear call-to-action to begin the questionnaire
- SHALL include a disclaimer about the tool's educational nature

### 3.2 Questionnaire Section
#### 3.2.1 Description
Users answer a series of questions about their child's behavior and development, along with basic demographic information.

#### 3.2.2 Functional Requirements
- SHALL present 10 behavioral questions from the Q-CHAT-10 assessment
- SHALL collect basic demographic information (age, sex, ethnicity, etc.)
- SHALL validate that all required questions are answered
- SHALL allow users to navigate back to previous questions
- SHALL display progress indicator showing completion status
- SHALL provide brief descriptions/examples for each question to aid understanding

### 3.3 Results Section
#### 3.3.1 Description
The system processes user responses to generate a preliminary risk assessment.

#### 3.3.2 Functional Requirements
- SHALL calculate a risk score based on answer patterns
- SHALL classify results into risk categories (low, medium, high)
- SHALL display the score and risk level clearly
- SHALL provide an interpretation of the results
- SHALL offer specific recommendations based on the risk level
- SHALL emphasize the non-diagnostic nature of the screening
- SHALL provide options to restart or view treatment information
- SHOULD attempt to use machine learning prediction if available
- SHALL fallback to local calculation if prediction service is unavailable

### 3.4 Treatment Section
#### 3.4.1 Description
This section provides information about potential treatment and intervention options based on the child's risk level.

#### 3.4.2 Functional Requirements
- SHALL display treatment options relevant to the identified risk level
- SHALL provide brief descriptions of each treatment approach
- SHALL include links to educational resources
- SHALL allow navigation back to results or restart the process

## 4. External Interface Requirements

### 4.1 User Interfaces
- SHALL implement a clean, simple, and intuitive interface
- SHALL use a color scheme that is accessible to colorblind users
- SHALL maintain consistency across all application sections
- SHALL be responsive and adapt to different screen sizes
- SHALL include clear navigation between sections

### 4.2 Software Interfaces
- SHOULD interface with a machine learning prediction service via REST API
- MAY utilize browser localStorage for temporary session data

### 4.3 Hardware Interfaces
- No specialized hardware interfaces required

### 4.4 Communication Interfaces
- SHALL use HTTPS for secure communication
- SHALL implement proper error handling for API failures

## 5. Non-Functional Requirements

### 5.1 Performance Requirements
- SHALL load initial page in under 3 seconds on standard connections
- SHALL process questionnaire submissions in under 2 seconds
- SHALL support at least 100 concurrent users

### 5.2 Safety Requirements
- SHALL include clear disclaimers about the limitations of the screening tool
- SHALL emphasize the importance of professional medical evaluation
- SHALL not store personally identifiable information

### 5.3 Security Requirements
- SHALL not persistently store user responses or results
- SHALL implement CORS policies to prevent unauthorized API access

### 5.4 Software Quality Attributes
- **Reliability**: SHALL provide consistent results for identical inputs
- **Availability**: SHALL be accessible 99.5% of the time
- **Maintainability**: SHALL have modular code structure
- **Portability**: SHALL work across major browsers and devices

### 5.5 Business Rules
- SHALL present scientifically validated screening methods
- SHALL provide balanced and unbiased recommendations
- SHALL clearly state when information is based on opinion vs. evidence

## 6. Hardware Requirements

### 6.1 Development Environment
- **Processor**: Intel Core i5 or equivalent (8th gen or newer)
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 256GB SSD
- **Display**: 1080p resolution minimum
- **Network**: Broadband internet connection

### 6.2 Production Environment
- **Server**: Virtual private server with:
  - 2 vCPUs minimum
  - 4GB RAM minimum
  - 20GB storage minimum
  - Linux-based OS
- **Network**: 
  - Bandwidth to support estimated user load
  - 99.9% uptime SLA

### 6.3 End-User Requirements
- **Device**: Any device capable of running a modern web browser
- **Screen**: Minimum 320px width for mobile devices
- **Connection**: 1Mbps internet connection minimum

## 7. Planning and Analysis

### 7.1 Project Timeline
- **Phase 1 (2 weeks)**: Requirements gathering and analysis
- **Phase 2 (3 weeks)**: Design and prototype development
- **Phase 3 (4 weeks)**: Core functionality implementation
- **Phase 4 (2 weeks)**: Integration with machine learning model
- **Phase 5 (2 weeks)**: Testing and quality assurance
- **Phase 6 (1 week)**: Deployment and documentation

### 7.2 Risk Analysis
| Risk | Probability | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| ML model unavailability | Medium | Medium | Implement local calculation fallback |
| Poor user experience on mobile | Low | High | Thorough responsive testing |
| Misinterpretation of results | Medium | High | Clear disclaimers and guidance |
| Security vulnerabilities | Low | High | Security audit and testing |
| Browser compatibility issues | Medium | Medium | Cross-browser testing |

### 7.3 Stakeholder Analysis
- **Parents/Caregivers**: Primary users seeking information
- **Healthcare Providers**: May use or recommend the tool
- **Educational Institutions**: Project evaluators
- **Child Development Specialists**: Domain experts for validation

### 7.4 Cost-Benefit Analysis
- **Development Costs**: 
  - Developer time (approximately 300 hours)
  - Design assets and resources
  - Hosting and infrastructure
- **Benefits**:
  - Educational value for parents
  - Earlier identification of potential developmental concerns
  - Accessible screening tool for underserved populations
  - Academic project with real-world application

### 7.5 Success Criteria
- Completion of all core functionality
- Positive user feedback on usability
- Accuracy of screening results compared to established tools
- Achievement of educational objectives
- Responsive design working across all target devices

## 8. Appendices

### 8.1 Glossary
- **ASD**: Autism Spectrum Disorder
- **Screening**: Preliminary assessment to identify potential risks
- **Q-CHAT-10**: Quantitative Checklist for Autism in Toddlers (10-item version)
- **Risk Level**: Categorization of screening results (low, medium, high)

### 8.2 Supporting Documents
- User flow diagrams
- UI/UX wireframes
- API specifications for ML model integration
- Testing plan and protocols
