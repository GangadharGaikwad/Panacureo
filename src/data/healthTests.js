// We need these icons for future implementation, disabling eslint warnings
/* eslint-disable no-unused-vars */
import { 
  FaWeight, 
  FaBrain, 
  FaHeartbeat, 
  FaLungs, 
  FaAppleAlt, 
  FaBed, 
  FaRunning, 
  FaStethoscope,
  FaAllergies,
  FaThermometerHalf,
  FaEye,
  FaChild
} from 'react-icons/fa';
/* eslint-enable no-unused-vars */

/**
 * Dummy data for health tests
 * Each test has:
 * - id: unique identifier
 * - title: name of the test
 * - description: brief overview
 * - longDescription: detailed explanation
 * - estimatedTime: how long it takes to complete (in minutes)
 * - icon: a React icon component
 * - category: type of test (mental, physical, etc.)
 * - difficulty: how complex the test is (easy, medium, hard)
 * - imageUrl: placeholder image for the test card
 * - featured: whether it's a highlighted test
 * - tags: keywords for filtering
 */
export const healthTests = [
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index to assess your weight category.',
    longDescription: 'Body Mass Index (BMI) is a measurement of body fat based on height and weight. It can help determine if you are underweight, normal weight, overweight, or obese.',
    image: '/assets/images/tests/bmi-calculator.jpg',
    category: 'Physical Health',
    difficulty: 'Easy',
    estimatedTime: 2,
    featured: true
  },
  {
    id: 'heart-rate-variability',
    title: 'Heart Rate Variability',
    description: 'Measure the variation in time between heartbeats to assess stress levels.',
    longDescription: 'Heart Rate Variability (HRV) measures the variation in time between successive heartbeats. It serves as an indicator of your autonomic nervous system function and can reflect stress, recovery status, and overall health.',
    image: '/assets/images/tests/hrv.jpg',
    category: 'Physical Health',
    difficulty: 'Medium',
    estimatedTime: 5,
    featured: true
  },
  {
    id: 'stress-assessment',
    title: 'Stress Assessment',
    description: 'Answer a series of questions to determine your current stress level.',
    longDescription: 'This assessment uses clinically validated questions to help you understand your current stress levels and how they might be affecting your health and wellbeing.',
    image: '/assets/images/tests/stress.jpg',
    category: 'Mental Health',
    difficulty: 'Easy',
    estimatedTime: 8,
    featured: true
  },
  {
    id: 'sleep-quality',
    title: 'Sleep Quality Analysis',
    description: 'Analyze your sleep patterns to improve your sleep quality.',
    longDescription: 'This assessment evaluates your sleep habits and patterns to identify potential issues affecting your sleep quality and provides personalized recommendations.',
    image: '/assets/images/tests/sleep.jpg',
    category: 'Wellbeing',
    difficulty: 'Easy',
    estimatedTime: 5,
    featured: false
  },
  {
    id: 'flexibility-test',
    title: 'Flexibility Assessment',
    description: 'Simple physical tests to measure your body flexibility.',
    longDescription: 'This assessment includes a series of simple stretches and positions to evaluate your flexibility in different muscle groups and joint ranges of motion.',
    image: '/assets/images/tests/flexibility.jpg',
    category: 'Physical Health',
    difficulty: 'Medium',
    estimatedTime: 10,
    featured: false
  },
  {
    id: 'nutrition-assessment',
    title: 'Nutritional Balance',
    description: 'Evaluate your diet and nutritional balance.',
    longDescription: 'This assessment analyzes your typical food intake to identify potential nutritional imbalances and provides personalized recommendations for a healthier diet.',
    image: '/assets/images/tests/nutrition.jpg',
    category: 'Nutrition',
    difficulty: 'Medium',
    estimatedTime: 12,
    featured: false
  },
  {
    id: 'hydration-calculator',
    title: 'Hydration Calculator',
    description: 'Calculate your daily water needs based on your activity level.',
    longDescription: 'This tool helps you determine your optimal daily water intake based on your weight, activity level, and environmental factors to maintain proper hydration.',
    image: '/assets/images/tests/hydration.jpg',
    category: 'Nutrition',
    difficulty: 'Easy',
    estimatedTime: 3,
    featured: false
  },
  {
    id: 'posture-assessment',
    title: 'Posture Assessment',
    description: 'Analyze your posture to prevent pain and injuries.',
    longDescription: 'This assessment guides you through a series of positions and checks to evaluate your posture and provides guidance on correcting potential issues.',
    image: '/assets/images/tests/posture.jpg',
    category: 'Physical Health',
    difficulty: 'Hard',
    estimatedTime: 15,
    featured: false
  },
  {
    id: 'anxiety-screening',
    title: 'Anxiety Screening',
    description: 'Screen for signs of anxiety using clinical questionnaires.',
    longDescription: 'This screening tool uses clinically validated questions to help identify potential anxiety symptoms and their severity.',
    image: '/assets/images/tests/anxiety.jpg',
    category: 'Mental Health',
    difficulty: 'Easy',
    estimatedTime: 7,
    featured: false
  },
  {
    id: 'fitness-level',
    title: 'Fitness Level Test',
    description: 'Assess your current fitness level with simple exercises.',
    longDescription: 'This fitness assessment uses a series of simple exercises to evaluate different aspects of your physical fitness, including strength, endurance, and cardiovascular health.',
    image: '/assets/images/tests/fitness.jpg',
    category: 'Physical Health',
    difficulty: 'Hard',
    estimatedTime: 20,
    featured: false
  }
];

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'physical', label: 'Physical Health' },
  { value: 'mental', label: 'Mental Health' },
  { value: 'cardiovascular', label: 'Cardiovascular' },
  { value: 'respiratory', label: 'Respiratory' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'metabolic', label: 'Metabolic' },
  { value: 'immunology', label: 'Immunology' },
  { value: 'sensory', label: 'Sensory' },
  { value: 'musculoskeletal', label: 'Musculoskeletal' }
];

export const difficulties = [
  { value: 'all', label: 'All Difficulties' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
];

// Get test data by ID
export const getTestById = (id) => {
  return healthTests.find(test => test.id === id);
};

// BMI calculation ranges
export const bmiRanges = [
  {
    category: 'Underweight',
    min: 0,
    max: 18.4,
    description: 'You may need to gain weight. Consult with a healthcare professional.'
  },
  {
    category: 'Normal',
    min: 18.5,
    max: 24.9,
    description: 'You have a healthy weight for your height.'
  },
  {
    category: 'Overweight',
    min: 25,
    max: 29.9,
    description: 'You may need to lose some weight for health reasons.'
  },
  {
    category: 'Obese',
    min: 30,
    max: 34.9,
    description: 'You may be at risk for health problems. Consider consulting a healthcare professional.'
  },
  {
    category: 'Severely Obese',
    min: 35,
    max: 100,
    description: 'Your health may be at risk. Please consult with a healthcare professional.'
  }
];

// Mental health questionnaire
export const mentalHealthQuestions = [
  {
    id: 'q1',
    question: 'Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'q2',
    question: 'Over the past 2 weeks, how often have you felt down, depressed, or hopeless?',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'q3',
    question: 'Over the past 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'q4',
    question: 'Over the past 2 weeks, how often have you felt tired or had little energy?',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'q5',
    question: 'Over the past 2 weeks, how often have you had poor appetite or overeating?',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'q6',
    question: 'Over the past 2 weeks, how often have you felt bad about yourself — or that you are a failure or have let yourself or your family down?',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'q7',
    question: 'Over the past 2 weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'q8',
    question: 'Over the past 2 weeks, how often have you been feeling anxious, nervous, or on edge?',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'q9',
    question: 'Over the past 2 weeks, how often have you been unable to stop or control worrying?',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  },
  {
    id: 'q10',
    question: 'Over the past 2 weeks, how often have you had trouble relaxing?',
    options: [
      { value: 0, text: 'Not at all' },
      { value: 1, text: 'Several days' },
      { value: 2, text: 'More than half the days' },
      { value: 3, text: 'Nearly every day' }
    ]
  }
];

// Mental health score ranges
export const mentalHealthScoreRanges = [
  { range: 'Minimal or No Symptoms', min: 0, max: 4, color: 'green.400', description: 'Your responses suggest minimal or no symptoms of depression or anxiety.' },
  { range: 'Mild Symptoms', min: 5, max: 9, color: 'teal.400', description: 'Your responses suggest mild symptoms that may benefit from monitoring.' },
  { range: 'Moderate Symptoms', min: 10, max: 14, color: 'yellow.400', description: 'Your responses suggest moderate symptoms. Consider consulting a healthcare provider.' },
  { range: 'Moderately Severe Symptoms', min: 15, max: 19, color: 'orange.400', description: 'Your responses suggest moderately severe symptoms. Professional support is recommended.' },
  { range: 'Severe Symptoms', min: 20, max: 30, color: 'red.500', description: 'Your responses suggest severe symptoms. Please seek professional help promptly.' }
];

// Heart disease risk factors
export const heartDiseaseRiskFactors = {
  age: [
    { range: '20-34', value: 0 },
    { range: '35-39', value: 2 },
    { range: '40-44', value: 4 },
    { range: '45-49', value: 6 },
    { range: '50-54', value: 8 },
    { range: '55-59', value: 10 },
    { range: '60-64', value: 12 },
    { range: '65-69', value: 14 },
    { range: '70+', value: 16 }
  ],
  gender: [
    { value: 'male', label: 'Male', factor: 1 },
    { value: 'female', label: 'Female', factor: 0.8 }
  ],
  bloodPressure: [
    { range: 'Normal (Below 120/80)', value: 0 },
    { range: 'Elevated (120-129/<80)', value: 2 },
    { range: 'Stage 1 Hypertension (130-139/80-89)', value: 3 },
    { range: 'Stage 2 Hypertension (140+/90+)', value: 5 },
    { range: 'Hypertensive Crisis (180+/120+)', value: 8 }
  ],
  cholesterol: [
    { range: 'Normal (Total < 200 mg/dL)', value: 0 },
    { range: 'Borderline (Total 200-239 mg/dL)', value: 3 },
    { range: 'High (Total 240+ mg/dL)', value: 6 }
  ],
  hdl: [
    { range: 'Low (< 40 mg/dL)', value: 4 },
    { range: 'Average (40-59 mg/dL)', value: 2 },
    { range: 'Optimal (60+ mg/dL)', value: 0 }
  ],
  smoker: [
    { value: true, label: 'Yes', points: 5 },
    { value: false, label: 'No', points: 0 }
  ],
  diabetes: [
    { value: true, label: 'Yes', points: 5 },
    { value: false, label: 'No', points: 0 }
  ],
  exercise: [
    { range: 'None', value: 4 },
    { range: 'Low (1-2 days/week)', value: 2 },
    { range: 'Moderate (3-4 days/week)', value: 1 },
    { range: 'High (5+ days/week)', value: 0 }
  ],
  bmi: [
    { range: 'Underweight (<18.5)', value: 1 },
    { range: 'Normal (18.5-24.9)', value: 0 },
    { range: 'Overweight (25-29.9)', value: 2 },
    { range: 'Obese (30+)', value: 4 }
  ],
  familyHistory: [
    { value: true, label: 'Yes', points: 4 },
    { value: false, label: 'No', points: 0 }
  ]
};

// Heart disease risk score ranges
export const heartDiseaseRiskRanges = [
  { range: 'Low Risk', min: 0, max: 10, color: 'green.400', description: 'Your estimated 10-year risk of heart disease is low based on the factors you provided.' },
  { range: 'Moderate Risk', min: 11, max: 20, color: 'yellow.400', description: 'Your estimated 10-year risk of heart disease is moderate. Consider lifestyle modifications and regular check-ups.' },
  { range: 'High Risk', min: 21, max: 30, color: 'orange.400', description: 'Your estimated 10-year risk of heart disease is high. Consultation with a healthcare provider is recommended.' },
  { range: 'Very High Risk', min: 31, max: 100, color: 'red.500', description: 'Your estimated 10-year risk of heart disease is very high. Please consult a healthcare provider promptly.' }
];

// Get tests by category
export const getTestsByCategory = (category) => {
  return healthTests.filter(test => test.category === category);
};

// Get featured tests
export const getFeaturedTests = () => {
  return healthTests.filter(test => test.featured);
};

// Get all test categories
export const getTestCategories = () => {
  const categories = new Set();
  healthTests.forEach(test => categories.add(test.category));
  return Array.from(categories);
};

// Get all difficulty levels
export const getDifficultyLevels = () => {
  return ['Easy', 'Medium', 'Hard'];
}; 