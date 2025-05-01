
import streamlit as st
import pandas as pd
import numpy as np
import requests
import json
from PIL import Image
import time

# Configure the Streamlit page
st.set_page_config(
    page_title="ToddlerGuardian - Early Autism Screening",
    page_icon="🧩",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to style the app
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #1A1F2C;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    .sub-header {
        font-size: 1.5rem;
        color: #6E59A5;
        margin-bottom: 1.5rem;
    }
    .info-box {
        background-color: #F1F0FB;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
    }
    .section-header {
        font-size: 1.8rem;
        color: #7E69AB;
        margin-bottom: 1rem;
    }
    .risk-low {
        background-color: #dcf5e7;
        padding: 20px;
        border-radius: 10px;
        border-left: 5px solid #22c55e;
    }
    .risk-medium {
        background-color: #fef7cd;
        padding: 20px;
        border-radius: 10px;
        border-left: 5px solid #eab308;
    }
    .risk-high {
        background-color: #ffdee2;
        padding: 20px;
        border-radius: 10px;
        border-left: 5px solid #ef4444;
    }
    .centered-btn {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    .bottom-margin {
        margin-bottom: 40px;
    }
    .stButton button {
        background-color: #6E59A5;
        color: white;
        border-radius: 8px;
        padding: 10px 24px;
        font-weight: bold;
        border: none;
    }
    .stButton button:hover {
        background-color: #8B5CF6;
    }
    .stProgress .st-bo {
        background-color: #6E59A5;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if "page" not in st.session_state:
    st.session_state.page = "welcome"
if "answers" not in st.session_state:
    st.session_state.answers = [None] * 10
if "basic_info" not in st.session_state:
    st.session_state.basic_info = {
        "age": None,
        "sex": None,
        "ethnicity": None,
        "jaundice": None,
        "family_asd": None,
        "respondent": None
    }
if "current_question" not in st.session_state:
    st.session_state.current_question = 0
if "results" not in st.session_state:
    st.session_state.results = None
if "model_prediction" not in st.session_state:
    st.session_state.model_prediction = None

# Questions data
questions = [
    {
        "id": 1,
        "text": "Does your child look at you when you call his/her name?",
        "description": "Observe how your child responds when you call their name.",
        "options": [
            {"text": "Yes", "value": 1},
            {"text": "No", "value": 0}
        ]
    },
    {
        "id": 2,
        "text": "How easy is it for you to get eye contact with your child?",
        "description": "Consider how readily your child makes eye contact during interactions.",
        "options": [
            {"text": "Yes", "value": 1},
            {"text": "No", "value": 0}
        ]
    },
    {
        "id": 3,
        "text": "Does your child point to indicate that they want something?",
        "description": "For example, pointing at a toy that is out of reach.",
        "options": [
            {"text": "Yes", "value": 1},
            {"text": "No", "value": 0}
        ]
    },
    {
        "id": 4,
        "text": "Does your child point to share interest with you?",
        "description": "For example, pointing at an interesting sight or object to direct your attention to it.",
        "options": [
            {"text": "Yes", "value": 1},
            {"text": "No", "value": 0}
        ]
    },
    {
        "id": 5,
        "text": "Does your child pretend play?",
        "description": "For example, caring for dolls or talking on a toy phone.",
        "options": [
            {"text": "Yes", "value": 1},
            {"text": "No", "value": 0}
        ]
    },
    {
        "id": 6,
        "text": "Does your child follow where you're looking?",
        "description": "Notice if your child follows your gaze or looks where you are looking.",
        "options": [
            {"text": "Yes", "value": 1},
            {"text": "No", "value": 0}
        ]
    },
    {
        "id": 7,
        "text": "If someone in the family is visibly upset, does your child show signs of wanting to comfort them?",
        "description": "For example, stroking hair, hugging them, or showing concern.",
        "options": [
            {"text": "Yes", "value": 1},
            {"text": "No", "value": 0}
        ]
    },
    {
        "id": 8,
        "text": "Would you describe your child's first words as delayed?",
        "description": "Consider the timing and quality of your child's early language development.",
        "options": [
            {"text": "Yes", "value": 1},
            {"text": "No", "value": 0}
        ]
    },
    {
        "id": 9,
        "text": "Does your child use simple gestures?",
        "description": "For example, waving goodbye or nodding yes.",
        "options": [
            {"text": "Yes", "value": 1},
            {"text": "No", "value": 0}
        ]
    },
    {
        "id": 10,
        "text": "Does your child stare at nothing with no apparent purpose?",
        "description": "Notice if your child appears to fixate on empty space or stares without focus.",
        "options": [
            {"text": "Yes", "value": 1},
            {"text": "No", "value": 0}
        ]
    }
]

# Basic info questions
basic_info_questions = [
    {
        "id": "age",
        "text": "What is your child's age (in months)?",
        "type": "number",
        "required": True
    },
    {
        "id": "sex",
        "text": "What is your child's sex?",
        "type": "radio",
        "options": [
            {"text": "Male", "value": "male"},
            {"text": "Female", "value": "female"}
        ],
        "required": True
    },
    {
        "id": "ethnicity",
        "text": "What is your child's ethnicity?",
        "type": "select",
        "options": [
            {"text": "Asian", "value": "asian"},
            {"text": "African", "value": "african"},
            {"text": "Caucasian", "value": "caucasian"},
            {"text": "Hispanic", "value": "hispanic"},
            {"text": "Middle Eastern", "value": "middle_eastern"},
            {"text": "Other", "value": "other"}
        ],
        "required": True
    },
    {
        "id": "jaundice",
        "text": "Was your child born with jaundice?",
        "type": "radio",
        "options": [
            {"text": "Yes", "value": "yes"},
            {"text": "No", "value": "no"}
        ],
        "required": True
    },
    {
        "id": "family_asd",
        "text": "Does your child have an immediate family member with Autism Spectrum Disorder (ASD)?",
        "type": "radio",
        "options": [
            {"text": "Yes", "value": "yes"},
            {"text": "No", "value": "no"}
        ],
        "required": True
    },
    {
        "id": "respondent",
        "text": "Who is completing this screening test?",
        "type": "select",
        "options": [
            {"text": "Parent", "value": "parent"},
            {"text": "Caregiver", "value": "caregiver"},
            {"text": "Medical Staff", "value": "medical_staff"},
            {"text": "Clinician", "value": "clinician"},
            {"text": "Other", "value": "other"}
        ],
        "required": True
    }
]

# Navigation functions
def go_to_welcome():
    st.session_state.page = "welcome"
    st.session_state.current_question = 0
    st.session_state.answers = [None] * 10
    st.session_state.basic_info = {
        "age": None,
        "sex": None,
        "ethnicity": None,
        "jaundice": None,
        "family_asd": None,
        "respondent": None
    }
    st.session_state.results = None
    st.session_state.model_prediction = None

def go_to_basic_info():
    st.session_state.page = "basic_info"

def go_to_questionnaire():
    if all(value is not None for value in st.session_state.basic_info.values()):
        st.session_state.page = "questionnaire"
        st.session_state.current_question = 0
    else:
        st.error("Please complete all basic information fields before proceeding.")

def go_to_results():
    st.session_state.page = "results"
    calculate_results()

def go_to_treatment():
    st.session_state.page = "treatment"

# Results calculation
def calculate_results():
    answers = st.session_state.answers
    
    # Calculate score
    score = 0
    
    # For questions 1-7 and 9, "No" answers (0) are concerning
    for index in [0, 1, 2, 3, 4, 5, 6, 8]:
        if answers[index] == 0:
            score += 1
    
    # For questions 8 and 10, "Yes" answers (1) are concerning
    for index in [7, 9]:
        if answers[index] == 1:
            score += 1
    
    # Determine risk level based on score
    if score <= 3:
        risk_level = "low"
        interpretation = f"Your child scored {score} out of 10, which indicates a low risk for autism spectrum disorder. This suggests typical development for their age."
        recommendations = [
            "Continue monitoring your child's development.",
            "Follow standard well-child visit schedules with your pediatrician.",
            "Engage in regular interactive play and communication activities with your child.",
            "If you notice any developmental concerns in the future, revisit this screening tool."
        ]
    elif score <= 7:
        risk_level = "medium"
        interpretation = f"Your child scored {score} out of 10, which suggests a moderate risk for autism spectrum disorder. This indicates some behaviors that may require further assessment."
        recommendations = [
            "Schedule an appointment with your child's pediatrician to discuss these results.",
            "Consider a referral to a developmental pediatrician or child psychologist for further evaluation.",
            "Continue to engage in activities that promote social interaction and communication.",
            "Document any specific behaviors you notice that may be concerning."
        ]
    else:
        risk_level = "high"
        interpretation = f"Your child scored {score} out of 10, which indicates a higher risk for autism spectrum disorder. This suggests the presence of several behaviors commonly associated with ASD."
        recommendations = [
            "Promptly schedule an evaluation with a developmental pediatrician, child neurologist, or child psychologist specializing in autism.",
            "Contact your local early intervention program for an assessment (available for children under 3 years).",
            "Consider autism-specific screening or diagnostic assessments such as the ADOS-2 or ADI-R.",
            "Join a parent support group to connect with other families navigating similar situations.",
            "Begin researching early intervention approaches and therapies."
        ]
    
    st.session_state.results = {
        "score": score,
        "max_score": 10,
        "risk_level": risk_level,
        "interpretation": interpretation,
        "recommendations": recommendations,
        "answer_array": answers
    }
    
    # Try to get ML model prediction
    try:
        # In a real application, this would be a call to your backend API
        # For now, we'll simulate with local calculation
        st.session_state.model_prediction = {
            "prediction": "ASD" if score > 5 else "Non-ASD",
            "risk_questions": [],  # In real app, backend would provide this
            "score": score,
            "risk_level": risk_level
        }
    except Exception as e:
        st.session_state.model_prediction = None
        st.error(f"Unable to connect to prediction service. Using built-in screening algorithm instead.")

# Get treatment options based on risk level
def get_treatment_options(risk_level):
    common_options = [
        {
            "title": "Parent Education and Training",
            "description": "Learning strategies to support your child's development, communication, and behavior management at home.",
            "resource_link": "https://www.youtube.com/watch?v=ubflRfUOByI"
        },
        {
            "title": "Speech and Language Therapy",
            "description": "Helps develop communication skills, language comprehension, and social use of language.",
            "resource_link": "https://www.youtube.com/watch?v=pSGVb60-BSw"
        }
    ]
    
    if risk_level == "low":
        return common_options + [
            {
                "title": "Developmental Monitoring",
                "description": "Regular check-ups with pediatrician to track developmental milestones and address any concerns early.",
                "resource_link": "https://www.verywellmind.com/signs-of-autism-in-babies-7486843"
            },
            {
                "title": "Social Engagement Activities",
                "description": "Playgroups, storytime sessions, and other activities that promote social interaction and engagement.",
                "resource_link": "https://www.autismspeaks.org/science-news/autism-speaks-releases-new-cst-caregiver-quick-tips-videos-support-parents-and"
            }
        ]
    elif risk_level == "medium":
        return common_options + [
            {
                "title": "Occupational Therapy",
                "description": "Addresses sensory processing, fine motor skills, and daily living activities to improve function and independence.",
                "resource_link": "https://www.youtube.com/channel/UChdlLGmro7NzDgCEF5SoLsQ"
            },
            {
                "title": "Play Therapy",
                "description": "Uses play to help children express themselves, develop social skills, and address emotional or behavioral challenges.",
                "resource_link": "https://www.youtube.com/watch?v=i0PPjK0lc9A"
            },
            {
                "title": "Developmental Preschool",
                "description": "Structured programs designed to support children with developmental concerns in a supportive educational environment.",
                "resource_link": "https://www.childrens.com/specialties-services/specialty-centers-and-programs/center-for-autism-care-parent-education-videos"
            }
        ]
    else:  # high risk
        return common_options + [
            {
                "title": "Applied Behavior Analysis (ABA)",
                "description": "Evidence-based therapy that focuses on improving specific behaviors such as communication, social skills, learning, and adaptive living skills.",
                "resource_link": "https://www.youtube.com/channel/UChdlLGmro7NzDgCEF5SoLsQ"
            },
            {
                "title": "Occupational Therapy",
                "description": "Addresses sensory processing, fine motor skills, and daily living activities to improve function and independence.",
                "resource_link": "https://www.youtube.com/channel/UChdlLGmro7NzDgCEF5SoLsQ"
            },
            {
                "title": "Social Skills Training",
                "description": "Structured teaching of social interaction, communication, and emotional understanding in individual or group settings.",
                "resource_link": "https://autismtherapies.com/parent-resources/video"
            },
            {
                "title": "Early Intensive Behavioral Intervention",
                "description": "Comprehensive treatment programs for young children, typically involving 25-40 hours of therapy per week.",
                "resource_link": "https://www.youtube.com/watch?v=L-aohWG5do0"
            },
            {
                "title": "Assistive Technology",
                "description": "Communication devices, visual supports, and other tools that can help with communication and learning.",
                "resource_link": "https://en.wikipedia.org/wiki/Video_modeling"
            }
        ]

# App Header
def show_header():
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.markdown("<div style='text-align:center'><span style='font-size:2rem; font-weight:bold'><span style='color:#6E59A5'>Toddler</span>Guardian</span> <span class='chip' style='background:#E5DEFF; color:#6E59A5; padding:2px 8px; border-radius:10px; font-size:0.7rem'>Beta</span></div>", unsafe_allow_html=True)

# App Footer
def show_footer():
    st.markdown("---")
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.markdown("<div style='text-align:center; color:#8E9196; font-size:0.8rem;'>© 2025 ToddlerGuardian. This tool is for screening purposes only and not a diagnostic instrument.</div>", unsafe_allow_html=True)

# App Pages
def show_welcome():
    st.markdown("<h1 class='main-header'>Early Autism Screening Tool</h1>", unsafe_allow_html=True)
    st.markdown("<p class='sub-header'>A quick assessment based on the Q-CHAT-10</p>", unsafe_allow_html=True)
    
    col1, col2 = st.columns([3, 2])
    
    with col1:
        st.markdown("""
        <div class='info-box'>
            <h3>What is this tool?</h3>
            <p>ToddlerGuardian offers a preliminary screening for autism spectrum disorder (ASD) in young children. This tool is based on the Q-CHAT-10 (Quantitative Checklist for Autism in Toddlers), designed to identify potential signs of autism in children.</p>
            
            <h3>Who is it for?</h3>
            <p>This screening is designed for children between 18-36 months of age, though it may provide useful insights for children outside this range.</p>
            
            <h3>How does it work?</h3>
            <p>You'll answer 10 simple questions about your child's behavior and development. The tool will then provide a risk assessment based on your answers.</p>
            
            <h3>Important Note</h3>
            <p>This is NOT a diagnostic tool. A positive screening result does not mean your child has autism, and a negative result doesn't rule it out. Always consult healthcare professionals for proper evaluation.</p>
        </div>
        """, unsafe_allow_html=True)
        
    with col2:
        st.image("https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=500", use_column_width=True)
    
    st.markdown("<div class='centered-btn'>", unsafe_allow_html=True)
    if st.button("Start Screening", key="start_btn", use_container_width=False):
        go_to_basic_info()
    st.markdown("</div>", unsafe_allow_html=True)

    # Navigation Links
    col1, col2, col3 = st.columns([1, 1, 1])
    with col1:
        if st.button("About", key="about_btn"):
            st.session_state.page = "about"
    with col2:
        if st.button("Team", key="team_btn"):
            st.session_state.page = "team"
    with col3:
        if st.button("Treatments", key="treatments_btn"):
            # If coming directly to treatments, create a placeholder medium risk result
            if not st.session_state.results:
                st.session_state.results = {
                    "score": 5,
                    "max_score": 10,
                    "risk_level": "medium",
                    "interpretation": "This is an overview of potential treatment options.",
                    "recommendations": [],
                    "answer_array": []
                }
            go_to_treatment()

def show_basic_info():
    st.markdown("<h1 class='section-header'>Basic Information</h1>", unsafe_allow_html=True)
    st.markdown("Please provide some basic information about your child:")
    
    with st.form(key="basic_info_form"):
        for question in basic_info_questions:
            if question["type"] == "number":
                value = st.number_input(
                    question["text"], 
                    min_value=1, 
                    max_value=120,
                    value=st.session_state.basic_info[question["id"]] if st.session_state.basic_info[question["id"]] else 24
                )
                st.session_state.basic_info[question["id"]] = value
                
            elif question["type"] == "radio":
                options = [opt["value"] for opt in question["options"]]
                texts = [opt["text"] for opt in question["options"]]
                index = 0
                if st.session_state.basic_info[question["id"]]:
                    try:
                        index = options.index(st.session_state.basic_info[question["id"]])
                    except:
                        index = 0
                value = st.radio(
                    question["text"],
                    options=texts,
                    index=index
                )
                # Map the displayed text back to the value
                selected_index = texts.index(value)
                st.session_state.basic_info[question["id"]] = options[selected_index]
                
            elif question["type"] == "select":
                options = [opt["value"] for opt in question["options"]]
                texts = [opt["text"] for opt in question["options"]]
                default_ix = 0
                if st.session_state.basic_info[question["id"]]:
                    try:
                        default_ix = options.index(st.session_state.basic_info[question["id"]])
                    except:
                        default_ix = 0
                value = st.selectbox(
                    question["text"],
                    options=texts,
                    index=default_ix
                )
                # Map the displayed text back to the value
                selected_index = texts.index(value)
                st.session_state.basic_info[question["id"]] = options[selected_index]
        
        col1, col2, col3 = st.columns([1, 1, 1])
        with col1:
            if st.form_submit_button("Back", use_container_width=True):
                go_to_welcome()
        with col3:
            if st.form_submit_button("Next", use_container_width=True):
                go_to_questionnaire()

def show_questionnaire():
    question = questions[st.session_state.current_question]
    
    # Progress Bar
    progress = (st.session_state.current_question) / len(questions)
    st.progress(progress)
    st.markdown(f"Question {st.session_state.current_question + 1} of {len(questions)}")
    
    # Question Display
    st.markdown(f"<h2 class='section-header'>{question['text']}</h2>", unsafe_allow_html=True)
    st.markdown(f"<p><em>{question['description']}</em></p>", unsafe_allow_html=True)
    
    # Answer Selection
    option_texts = [opt["text"] for opt in question["options"]]
    option_values = [opt["value"] for opt in question["options"]]
    
    # Determine default index
    default_index = 0
    current_answer = st.session_state.answers[st.session_state.current_question]
    if current_answer is not None:
        try:
            default_index = option_values.index(current_answer)
        except ValueError:
            default_index = 0
    
    answer = st.radio("Select your answer:", options=option_texts, index=default_index)
    selected_index = option_texts.index(answer)
    st.session_state.answers[st.session_state.current_question] = option_values[selected_index]
    
    # Navigation Buttons
    col1, col2, col3 = st.columns([1, 1, 1])
    
    with col1:
        if st.button("Previous", key="prev_btn", disabled=st.session_state.current_question == 0):
            st.session_state.current_question = max(0, st.session_state.current_question - 1)
            st.experimental_rerun()
    
    with col3:
        if st.session_state.current_question < len(questions) - 1:
            next_label = "Next"
            next_action = lambda: setattr(st.session_state, 'current_question', min(len(questions) - 1, st.session_state.current_question + 1))
        else:
            next_label = "Submit"
            next_action = lambda: go_to_results()
            
        if st.button(next_label, key="next_btn"):
            if None in st.session_state.answers[:st.session_state.current_question + 1]:
                st.error("Please answer all questions before proceeding.")
            else:
                next_action()
                st.experimental_rerun()
                
    # Back to basic info option
    if st.button("Back to Basic Info", key="back_to_basics"):
        st.session_state.page = "basic_info"
        st.experimental_rerun()

def show_results():
    results = st.session_state.results
    
    if not results:
        st.error("No results to display. Please complete the screening first.")
        if st.button("Go to Welcome", key="no_results_btn"):
            go_to_welcome()
        return
    
    risk_level = results["risk_level"]
    risk_class = f"risk-{risk_level}"
    
    st.markdown("<h1 class='section-header'>Screening Results</h1>", unsafe_allow_html=True)
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown(f"<div class='{risk_class}'>", unsafe_allow_html=True)
        st.markdown(f"<h3>Risk Assessment: {risk_level.capitalize()}</h3>", unsafe_allow_html=True)
        st.markdown(f"<p>{results['interpretation']}</p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
        
        st.markdown("<h3>Recommendations:</h3>", unsafe_allow_html=True)
        for rec in results["recommendations"]:
            st.markdown(f"- {rec}")
    
    with col2:
        # Score visualization
        st.markdown("<h3>Score Breakdown</h3>", unsafe_allow_html=True)
        
        score = results["score"]
        max_score = results["max_score"]
        
        # Create a gauge chart using st.progress
        st.markdown(f"<p style='text-align:center; font-size:2.5rem; margin:0;'>{score}</p>", unsafe_allow_html=True)
        st.markdown(f"<p style='text-align:center; margin:0;'>out of {max_score}</p>", unsafe_allow_html=True)
        
        progress_val = score / max_score
        st.progress(progress_val)
        
        # Risk level indicator
        color = "#22c55e" if risk_level == "low" else "#eab308" if risk_level == "medium" else "#ef4444"
        st.markdown(f"""
            <div style='background-color:{color}; color:white; padding:10px; border-radius:5px; text-align:center; margin-top:10px;'>
                <strong>{risk_level.capitalize()} Risk</strong>
            </div>
        """, unsafe_allow_html=True)
    
    # Action buttons
    col1, col2 = st.columns(2)
    with col1:
        if st.button("Restart Screening", key="restart_btn", use_container_width=True):
            go_to_welcome()
    with col2:
        if st.button("View Treatment Options", key="treatment_btn", use_container_width=True):
            go_to_treatment()

def show_treatment():
    if not st.session_state.results:
        st.error("No risk assessment available. Please complete the screening first.")
        if st.button("Go to Welcome", key="no_risk_btn"):
            go_to_welcome()
        return
    
    risk_level = st.session_state.results["risk_level"]
    treatment_options = get_treatment_options(risk_level)
    
    st.markdown("<h1 class='section-header'>Treatment & Intervention Options</h1>", unsafe_allow_html=True)
    
    # Introduction based on risk level
    if risk_level == "low":
        st.markdown("""
        <div class='info-box'>
            <p>Based on your child's low risk assessment, the following are general developmental support strategies. 
            These suggestions are meant to encourage healthy development and are beneficial for all children, regardless of risk level.</p>
        </div>
        """, unsafe_allow_html=True)
    elif risk_level == "medium":
        st.markdown("""
        <div class='info-box'>
            <p>Based on your child's moderate risk assessment, the following interventions may be worth discussing with your child's healthcare provider. 
            Early supportive interventions can significantly benefit development, whether or not your child ultimately receives an autism diagnosis.</p>
        </div>
        """, unsafe_allow_html=True)
    else:  # high risk
        st.markdown("""
        <div class='info-box'>
            <p>Based on your child's higher risk assessment, these evidence-based interventions are recommended for discussion with specialists. 
            Research consistently shows that early intervention leads to better outcomes for children with autism spectrum disorder.</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Treatment options
    for option in treatment_options:
        with st.expander(option["title"]):
            st.markdown(option["description"])
            if "resource_link" in option and option["resource_link"]:
                st.markdown(f"[Learn more]({option['resource_link']})")
    
    # Navigation
    if st.button("Back to Results", key="back_to_results"):
        st.session_state.page = "results"

def show_about():
    st.markdown("<h1 class='section-header'>About ToddlerGuardian</h1>", unsafe_allow_html=True)
    
    st.markdown("""
    ### Our Mission
    
    ToddlerGuardian is dedicated to providing accessible early screening tools for autism spectrum disorder. 
    Our goal is to empower parents and caregivers with information that can lead to earlier intervention when needed.
    
    ### About the Assessment
    
    This screening tool is based on the Q-CHAT-10 (Quantitative Checklist for Autism in Toddlers), 
    a validated screening measure developed by autism researchers. Our implementation includes both 
    traditional scoring methods and an optional machine learning model to enhance screening accuracy.
    
    ### Important Disclaimer
    
    This tool is intended for screening purposes only and is not meant to diagnose autism spectrum disorder. 
    A positive screening result indicates that further evaluation by healthcare professionals is recommended, 
    while a negative result does not guarantee the absence of autism or other developmental differences.
    
    Early identification and intervention are key to supporting children with autism in reaching their full potential. 
    If you have concerns about your child's development, please consult with a pediatrician or specialist regardless of this screening's results.
    """)
    
    if st.button("Back to Home", key="back_from_about"):
        go_to_welcome()

def show_team():
    st.markdown("<h1 class='section-header'>Our Team</h1>", unsafe_allow_html=True)
    
    st.markdown("""
    ToddlerGuardian was developed by a multidisciplinary team of child development specialists, 
    data scientists, and software engineers committed to improving early autism screening accessibility.
    
    ### Clinical Advisors
    
    Our clinical team includes pediatric neurologists, developmental psychologists, and 
    speech-language pathologists who provided expert guidance on assessment criteria and recommendations.
    
    ### Technical Team
    
    The technical development of ToddlerGuardian was led by data scientists specializing in machine 
    learning applications in healthcare, alongside engineers experienced in creating accessible digital health tools.
    
    ### Research Foundation
    
    Our approach is grounded in current research on early indicators of autism spectrum disorder 
    and best practices for screening. The Q-CHAT-10, which forms the basis of our assessment, is a 
    validated tool developed by autism researchers at the University of Cambridge.
    
    ### Contact
    
    For questions or feedback about ToddlerGuardian, please contact us at team@toddlerguardian.org
    """)
    
    if st.button("Back to Home", key="back_from_team"):
        go_to_welcome()

# Main app routing
def main():
    show_header()
    
    if st.session_state.page == "welcome":
        show_welcome()
    elif st.session_state.page == "basic_info":
        show_basic_info()
    elif st.session_state.page == "questionnaire":
        show_questionnaire()
    elif st.session_state.page == "results":
        show_results()
    elif st.session_state.page == "treatment":
        show_treatment()
    elif st.session_state.page == "about":
        show_about()
    elif st.session_state.page == "team":
        show_team()
    
    show_footer()

if __name__ == "__main__":
    main()
