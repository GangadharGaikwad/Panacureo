/**
 * Disease data model
 * Each disease has:
 * - id: unique identifier
 * - name: disease name
 * - category: disease category (Cardiovascular, Respiratory, etc.)
 * - description: brief description of the disease
 * - symptoms: array of symptoms
 * - causes: description of causes
 * - riskFactors: array of risk factors
 * - prevention: array of prevention tips
 * - treatment: array of treatment options
 * - whenToSeeDoctor: description of when to seek medical attention
 * - relatedDiseases: array of related disease IDs
 * - featured: boolean to indicate if it's a featured/common disease
 * - sources: array of reference sources
 */

// Categories for diseases
export const diseaseCategories = [
  { id: "cardiovascular", name: "Cardiovascular", icon: "heart" },
  { id: "respiratory", name: "Respiratory", icon: "lungs" },
  { id: "digestive", name: "Digestive", icon: "stomach" },
  { id: "neurological", name: "Neurological", icon: "brain" },
  { id: "infectious", name: "Infectious Diseases", icon: "virus" },
  { id: "mental", name: "Mental Health", icon: "mind" },
  { id: "endocrine", name: "Endocrine", icon: "thyroid" },
  { id: "skeletal", name: "Skeletal & Muscular", icon: "bone" },
  { id: "skin", name: "Skin Conditions", icon: "skin" },
  { id: "immune", name: "Immune Disorders", icon: "shield" }
];

// Sample diseases data
export const diseases = [
  {
    id: "hypertension",
    name: "Hypertension (High Blood Pressure)",
    category: "cardiovascular",
    description: "Hypertension, or high blood pressure, is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease.",
    symptoms: [
      "Most people with high blood pressure have no signs or symptoms, even if blood pressure readings reach dangerously high levels",
      "Some may experience headaches",
      "Shortness of breath",
      "Nosebleeds",
      "These symptoms typically aren't specific and usually don't occur until high blood pressure has reached a severe or life-threatening stage"
    ],
    causes: "For most adults, there's no identifiable cause of high blood pressure. This type of high blood pressure, called primary (essential) hypertension, tends to develop gradually over many years. Some people have high blood pressure caused by an underlying condition. This type of high blood pressure, called secondary hypertension, tends to appear suddenly and cause higher blood pressure than does primary hypertension.",
    riskFactors: [
      "Age (The risk increases as you age)",
      "Race (High blood pressure is particularly common among people of African heritage)",
      "Family history",
      "Being overweight or obese",
      "Not being physically active",
      "Using tobacco",
      "Too much salt (sodium) in your diet",
      "Too little potassium in your diet",
      "Drinking too much alcohol",
      "Stress",
      "Certain chronic conditions"
    ],
    prevention: [
      "Maintain a healthy weight",
      "Eat a heart-healthy diet with reduced sodium",
      "Regular physical activity",
      "Limit alcohol consumption",
      "Don't smoke",
      "Manage stress",
      "Monitor your blood pressure regularly"
    ],
    treatment: [
      "Lifestyle changes as mentioned in prevention",
      "Diuretics",
      "ACE inhibitors",
      "Angiotensin II receptor blockers",
      "Calcium channel blockers",
      "Beta-blockers",
      "Regular monitoring and medication adjustment as needed"
    ],
    whenToSeeDoctor: "If you think you might have high blood pressure or are at risk for developing it, see your doctor to have your blood pressure checked. Even if you've been diagnosed with high blood pressure and are receiving treatment, you should regularly check your blood pressure at home according to your doctor's advice and schedule regular appointments with your doctor.",
    relatedDiseases: ["heart-disease", "stroke", "kidney-disease"],
    featured: true,
    sources: [
      "American Heart Association",
      "Mayo Clinic",
      "National Heart, Lung, and Blood Institute"
    ]
  },
  {
    id: "diabetes-type-2",
    name: "Type 2 Diabetes",
    category: "endocrine",
    description: "Type 2 diabetes is a chronic condition that affects the way your body metabolizes sugar (glucose) — an important source of fuel for your body. With type 2 diabetes, your body either resists the effects of insulin — a hormone that regulates the movement of sugar into your cells — or doesn't produce enough insulin to maintain normal glucose levels.",
    symptoms: [
      "Increased thirst",
      "Frequent urination",
      "Increased hunger",
      "Unintended weight loss",
      "Fatigue",
      "Blurred vision",
      "Slow-healing sores",
      "Frequent infections",
      "Areas of darkened skin, usually in the armpits and neck"
    ],
    causes: "Type 2 diabetes develops when the body becomes resistant to insulin or when the pancreas is unable to produce enough insulin. Exactly why this happens is unknown, although genetic and environmental factors, such as being overweight and inactive, seem to be contributing factors.",
    riskFactors: [
      "Weight (The more fatty tissue you have, the more resistant your cells become to insulin)",
      "Inactivity",
      "Family history",
      "Race and ethnicity (People of certain races and ethnicities are at higher risk)",
      "Age (Risk increases as you get older)",
      "Prediabetes",
      "Gestational diabetes",
      "Polycystic ovary syndrome"
    ],
    prevention: [
      "Eat healthy foods",
      "Get active (aim for 30 minutes of moderate physical activity a day)",
      "Lose excess weight",
      "Get regular checkups",
      "Have your blood sugar checked if you're at risk"
    ],
    treatment: [
      "Healthy eating",
      "Regular exercise",
      "Weight loss",
      "Blood sugar monitoring",
      "Diabetes medications or insulin therapy",
      "Bariatric surgery in some cases"
    ],
    whenToSeeDoctor: "See your doctor if you notice any of the symptoms of type 2 diabetes or if you're concerned about your diabetes risk. Ask your doctor about diabetes testing if you have any risk factors for diabetes, such as if you're overweight or have a family history of the disease.",
    relatedDiseases: ["heart-disease", "hypertension", "obesity"],
    featured: true,
    sources: [
      "American Diabetes Association",
      "Mayo Clinic",
      "Centers for Disease Control and Prevention"
    ]
  },
  {
    id: "asthma",
    name: "Asthma",
    category: "respiratory",
    description: "Asthma is a condition in which your airways narrow and swell and produce extra mucus. This can make breathing difficult and trigger coughing, wheezing and shortness of breath. For some people, asthma is a minor nuisance. For others, it can be a major problem that interferes with daily activities and may lead to a life-threatening asthma attack.",
    symptoms: [
      "Shortness of breath",
      "Chest tightness or pain",
      "Wheezing when exhaling, which is a common sign of asthma in children",
      "Trouble sleeping caused by shortness of breath, coughing or wheezing",
      "Coughing or wheezing attacks that are worsened by a respiratory virus"
    ],
    causes: "Asthma is thought to be caused by a combination of genetic and environmental factors. Exposure to various irritants and substances that trigger allergies (allergens) can trigger signs and symptoms of asthma.",
    riskFactors: [
      "Family history of asthma",
      "Having another allergic condition, such as atopic dermatitis or allergic rhinitis",
      "Being overweight",
      "Being a smoker",
      "Exposure to secondhand smoke",
      "Exposure to exhaust fumes or other types of pollution",
      "Exposure to occupational triggers, such as chemicals used in farming, hairdressing and manufacturing"
    ],
    prevention: [
      "Identify and avoid asthma triggers",
      "Get vaccinated for influenza and pneumonia",
      "Identify and treat attacks early",
      "Take your medication as prescribed",
      "Monitor your breathing",
      "Identify and treat attacks early"
    ],
    treatment: [
      "Quick-relief (rescue) medications such as short-acting beta agonists",
      "Long-term control medications such as inhaled corticosteroids",
      "Combination inhalers that contain both a corticosteroid and a long-acting beta agonist",
      "Leukotriene modifiers",
      "Theophylline",
      "Biologics for severe asthma"
    ],
    whenToSeeDoctor: "Seek emergency treatment if you have signs of an asthma attack and your symptoms don't improve with your medication. Signs of an asthma emergency include rapid worsening of shortness of breath or wheezing, no improvement even after using a quick-relief inhaler, shortness of breath when you are doing minimal physical activity.",
    relatedDiseases: ["allergic-rhinitis", "copd", "respiratory-infections"],
    featured: true,
    sources: [
      "American Lung Association",
      "Mayo Clinic",
      "National Heart, Lung, and Blood Institute"
    ]
  },
  {
    id: "heart-disease",
    name: "Coronary Artery Disease",
    category: "cardiovascular",
    description: "Coronary artery disease (CAD) is the most common type of heart disease. It occurs when the arteries that supply blood to the heart muscle become hardened and narrowed due to the buildup of cholesterol and other material, called plaque, on their inner walls.",
    symptoms: [
      "Chest pain (angina)",
      "Shortness of breath",
      "Pain, numbness, weakness or coldness in your legs or arms",
      "Pain in the neck, jaw, throat, upper abdomen or back",
      "Fluttering in your chest (heart palpitations)"
    ],
    causes: "CAD develops when the major blood vessels that supply your heart become damaged or diseased. Cholesterol-containing deposits (plaque) in your arteries and inflammation are usually to blame for coronary artery disease.",
    riskFactors: [
      "Age (Men 45 or older, women 55 or older)",
      "Family history",
      "Smoking",
      "High blood pressure",
      "High blood cholesterol levels",
      "Diabetes",
      "Overweight or obesity",
      "Physical inactivity",
      "Stress",
      "Unhealthy diet"
    ],
    prevention: [
      "Quit smoking",
      "Control conditions such as high blood pressure, high cholesterol and diabetes",
      "Stay physically active",
      "Eat a diet low in salt, added sugars, saturated fat and trans fat",
      "Maintain a healthy weight",
      "Reduce and manage stress",
      "Get good quality sleep",
      "Get regular health screenings"
    ],
    treatment: [
      "Lifestyle changes",
      "Medications including aspirin, cholesterol-modifying medications, beta blockers, nitroglycerin",
      "Procedures such as angioplasty and stent placement",
      "Coronary artery bypass surgery",
      "Cardiac rehabilitation"
    ],
    whenToSeeDoctor: "If you suspect you're having a heart attack, immediately call 911 or your local emergency number. If you're concerned about your risk of heart disease, talk to your doctor. They may suggest steps to reduce your risk, such as testing your cholesterol and blood pressure, or they might suggest lifestyle changes.",
    relatedDiseases: ["hypertension", "stroke", "heart-failure"],
    featured: true,
    sources: [
      "American Heart Association",
      "Mayo Clinic",
      "National Heart, Lung, and Blood Institute"
    ]
  },
  {
    id: "depression",
    name: "Major Depressive Disorder",
    category: "mental",
    description: "Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. Also called major depressive disorder or clinical depression, it affects how you feel, think and behave and can lead to a variety of emotional and physical problems.",
    symptoms: [
      "Feelings of sadness, tearfulness, emptiness or hopelessness",
      "Angry outbursts, irritability or frustration, even over small matters",
      "Loss of interest or pleasure in most or all normal activities",
      "Sleep disturbances, including insomnia or sleeping too much",
      "Tiredness and lack of energy",
      "Changes in appetite — reduced appetite and weight loss or increased cravings for food and weight gain",
      "Anxiety, agitation or restlessness",
      "Slowed thinking, speaking or body movements",
      "Feelings of worthlessness or guilt, fixating on past failures or self-blame",
      "Trouble thinking, concentrating, making decisions and remembering things",
      "Frequent or recurrent thoughts of death, suicidal thoughts, suicide attempts or suicide",
      "Unexplained physical problems, such as back pain or headaches"
    ],
    causes: "The exact cause of depression isn't known. As with many mental disorders, a variety of factors may be involved, such as biological differences, brain chemistry, hormones, and inherited traits.",
    riskFactors: [
      "Personal or family history of depression",
      "Major life changes, trauma, or stress",
      "Physical illness and medications",
      "Gender (women are more likely to experience depression)",
      "Certain personality traits such as low self-esteem",
      "Blood relatives with a history of depression, bipolar disorder, alcoholism or suicide",
      "Being lesbian, gay, bisexual, transgender, or questioning"
    ],
    prevention: [
      "Get regular exercise",
      "Sleep well",
      "Build strong relationships",
      "Reduce stress",
      "Practice mindfulness and meditation",
      "Avoid alcohol and recreational drugs",
      "Seek treatment at the earliest sign of a problem"
    ],
    treatment: [
      "Psychotherapy (talk therapy)",
      "Medications such as antidepressants",
      "Combination of medication and psychotherapy",
      "Electroconvulsive therapy (ECT)",
      "Transcranial magnetic stimulation (TMS)",
      "Self-help strategies including regular physical activity, good sleep hygiene, and building social connections"
    ],
    whenToSeeDoctor: "If you feel depressed, make an appointment to see your doctor or mental health professional as soon as you can. If you're reluctant to seek treatment, talk to a friend or loved one, any health care professional, a faith leader, or someone else you trust. If you have suicidal thoughts, call a crisis hotline like the National Suicide Prevention Lifeline at 1-800-273-TALK (1-800-273-8255).",
    relatedDiseases: ["anxiety-disorders", "bipolar-disorder", "post-traumatic-stress-disorder"],
    featured: true,
    sources: [
      "American Psychiatric Association",
      "Mayo Clinic",
      "National Institute of Mental Health"
    ]
  },
  {
    id: "osteoarthritis",
    name: "Osteoarthritis",
    category: "skeletal",
    description: "Osteoarthritis is the most common form of arthritis, affecting millions of people worldwide. It occurs when the protective cartilage that cushions the ends of your bones wears down over time. Although osteoarthritis can damage any joint, the disorder most commonly affects joints in your hands, knees, hips and spine.",
    symptoms: [
      "Pain during or after movement",
      "Joint stiffness upon awakening or after inactivity",
      "Joint tenderness when applying light pressure",
      "Loss of flexibility and range of motion",
      "Grating sensation during joint movement",
      "Bone spurs (extra bits of bone that form around the joint)",
      "Swelling caused by soft tissue inflammation around the joint"
    ],
    causes: "Osteoarthritis occurs when the cartilage that cushions the ends of bones in your joints gradually deteriorates. Cartilage is a firm, slippery tissue that enables nearly frictionless joint motion. Eventually, if the cartilage wears down completely, bone will rub on bone.",
    riskFactors: [
      "Older age",
      "Sex (women are more likely to develop osteoarthritis)",
      "Obesity",
      "Joint injuries",
      "Repeated stress on the joint",
      "Genetics",
      "Bone deformities",
      "Certain metabolic diseases"
    ],
    prevention: [
      "Exercise regularly",
      "Maintain a healthy weight",
      "Control blood sugar",
      "Stretch",
      "Avoid injury and repetitive strain on your joints",
      "Consider avoiding high-impact activities if you're at risk"
    ],
    treatment: [
      "Exercise and physical therapy",
      "Weight loss if needed",
      "Over-the-counter pain relievers like acetaminophen and NSAIDs",
      "Prescription medications such as duloxetine (Cymbalta)",
      "Topical treatments like creams containing NSAIDs",
      "Cortisone injections",
      "Hyaluronic acid injections",
      "Joint replacement surgery in severe cases"
    ],
    whenToSeeDoctor: "If you have joint pain or stiffness that doesn't go away, make an appointment with your doctor. Early diagnosis and treatment can help manage symptoms and prevent the condition from worsening.",
    relatedDiseases: ["rheumatoid-arthritis", "gout", "pseudogout"],
    featured: false,
    sources: [
      "Arthritis Foundation",
      "Mayo Clinic",
      "National Institute of Arthritis and Musculoskeletal and Skin Diseases"
    ]
  },
  {
    id: "influenza",
    name: "Influenza (Flu)",
    category: "infectious",
    description: "Influenza, commonly known as the flu, is a contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness, and at times can lead to death. Flu is different from a cold and usually comes on suddenly.",
    symptoms: [
      "Fever or feeling feverish/chills",
      "Cough",
      "Sore throat",
      "Runny or stuffy nose",
      "Muscle or body aches",
      "Headaches",
      "Fatigue (tiredness)",
      "Vomiting and diarrhea (more common in children than adults)"
    ],
    causes: "Influenza viruses travel through the air in droplets when someone with the infection coughs, sneezes or talks. You can inhale the droplets directly, or you can pick up the germs from an object — such as a telephone or computer keyboard — and then transfer them to your eyes, nose or mouth.",
    riskFactors: [
      "Age (very young children and older adults)",
      "Living or working conditions (shared spaces)",
      "Weakened immune system",
      "Chronic illnesses, such as asthma, diabetes, or heart disease",
      "Pregnancy",
      "Obesity"
    ],
    prevention: [
      "Annual flu vaccination",
      "Frequent handwashing",
      "Avoid touching your face",
      "Cover coughs and sneezes",
      "Clean and disinfect surfaces",
      "Avoid crowds during flu season",
      "Practice good health habits like getting adequate sleep"
    ],
    treatment: [
      "Rest and adequate fluid intake",
      "Over-the-counter pain relievers like acetaminophen and NSAIDs",
      "Antiviral drugs (prescription medications)",
      "Treatments to relieve symptoms"
    ],
    whenToSeeDoctor: "If you have flu symptoms and are at risk of complications, see your doctor right away. Taking antiviral drugs within the first 48 hours after you first notice symptoms may reduce the length of your illness and help prevent more serious problems. Seek emergency medical attention if you have difficulty breathing, persistent pain or pressure in the chest or abdomen, persistent dizziness or confusion, seizures, or severe weakness or muscle pain.",
    relatedDiseases: ["common-cold", "pneumonia", "covid-19"],
    featured: true,
    sources: [
      "Centers for Disease Control and Prevention",
      "Mayo Clinic",
      "World Health Organization"
    ]
  },
  {
    id: "stroke",
    name: "Stroke",
    category: "neurological",
    description: "A stroke occurs when the blood supply to part of your brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Brain cells begin to die in minutes. A stroke is a medical emergency, and prompt treatment is crucial. Early action can reduce brain damage and other complications.",
    symptoms: [
      "Trouble speaking and understanding what others are saying",
      "Paralysis or numbness of the face, arm or leg",
      "Trouble seeing in one or both eyes",
      "Headache (sudden, severe headache, possibly with vomiting)",
      "Trouble walking (sudden dizziness, loss of balance or coordination)"
    ],
    causes: "There are two main causes of stroke: a blocked artery (ischemic stroke) or leaking or bursting of a blood vessel (hemorrhagic stroke). Some people may have only a temporary disruption of blood flow to the brain, known as a transient ischemic attack (TIA), that doesn't cause lasting symptoms.",
    riskFactors: [
      "High blood pressure",
      "Smoking",
      "Diabetes",
      "High cholesterol",
      "Obesity",
      "Cardiovascular disease",
      "Personal or family history of stroke",
      "Age (risk increases with age)",
      "Race (African Americans have higher risk)",
      "Gender (men have higher risk overall, but women have higher mortality)",
      "Use of birth control pills or hormone therapies with estrogen",
      "Heavy alcohol use",
      "Use of illegal drugs"
    ],
    prevention: [
      "Control high blood pressure",
      "Lower cholesterol and saturated fat in your diet",
      "Quit smoking",
      "Control diabetes",
      "Maintain a healthy weight",
      "Exercise regularly",
      "Eat a diet rich in fruits and vegetables",
      "Avoid alcohol, or drink in moderation",
      "Treat obstructive sleep apnea",
      "Avoid illegal drugs"
    ],
    treatment: [
      "Emergency treatment (clot-busting medications, procedures to remove clot or stop bleeding)",
      "Medications to prevent blood clots",
      "Anti-hypertensive medications",
      "Statins to lower cholesterol",
      "Rehabilitation (physical therapy, occupational therapy, speech therapy)",
      "Lifestyle changes"
    ],
    whenToSeeDoctor: "Seek immediate medical attention if you notice any signs or symptoms of a stroke, even if they seem to come and go or they disappear completely. Think \"FAST\": Face drooping, Arm weakness, Speech difficulty, Time to call 911. The longer a stroke goes untreated, the greater the potential for brain damage and disability.",
    relatedDiseases: ["heart-disease", "hypertension", "diabetes-type-2"],
    featured: true,
    sources: [
      "American Stroke Association",
      "Mayo Clinic",
      "National Institute of Neurological Disorders and Stroke"
    ]
  },
  {
    id: "copd",
    name: "Chronic Obstructive Pulmonary Disease (COPD)",
    category: "respiratory",
    description: "Chronic obstructive pulmonary disease (COPD) is a chronic inflammatory lung disease that causes obstructed airflow from the lungs. Symptoms include breathing difficulty, cough, mucus (sputum) production and wheezing. It's typically caused by long-term exposure to irritating gases or particulate matter, most often from cigarette smoke.",
    symptoms: [
      "Shortness of breath, especially during physical activities",
      "Wheezing",
      "Chest tightness",
      "Chronic cough that may produce mucus",
      "Frequent respiratory infections",
      "Lack of energy",
      "Unintended weight loss (in later stages)",
      "Swelling in ankles, feet or legs"
    ],
    causes: "In developed countries, tobacco smoking is the most common cause of COPD. In the developing world, exposure to fumes from burning fuel for cooking and heating in poorly ventilated homes is a significant contributor. Long-term exposure to workplace irritants like dust, chemical fumes, or vapors can also cause COPD.",
    riskFactors: [
      "Tobacco smoke",
      "People with asthma who smoke",
      "Occupational exposure to dusts and chemicals",
      "Exposure to indoor and outdoor air pollution",
      "Genetic factors"
    ],
    prevention: [
      "Don't smoke or stop smoking",
      "Avoid secondhand smoke and other lung irritants",
      "Get vaccination against flu and pneumonia",
      "Avoid indoor and outdoor air pollution"
    ],
    treatment: [
      "Smoking cessation",
      "Medications (bronchodilators, inhaled steroids, combination inhalers)",
      "Lung therapies (oxygen therapy, pulmonary rehabilitation)",
      "Managing exacerbations",
      "Surgery in severe cases (lung volume reduction surgery, lung transplant)"
    ],
    whenToSeeDoctor: "See your doctor if you have persistent symptoms of COPD or think you might be at risk of the disease, especially if you're a smoker or ex-smoker. Seek immediate medical care if you can't catch your breath, you experience severe blueness of your lips or fingernail beds (cyanosis), you're not mentally alert, or your heartbeat is very fast.",
    relatedDiseases: ["asthma", "bronchitis", "emphysema"],
    featured: false,
    sources: [
      "American Lung Association",
      "Mayo Clinic",
      "Global Initiative for Chronic Obstructive Lung Disease"
    ]
  },
  {
    id: "alzheimers",
    name: "Alzheimer's Disease",
    category: "neurological",
    description: "Alzheimer's disease is a progressive neurologic disorder that causes the brain to shrink (atrophy) and brain cells to die. It is the most common cause of dementia — a continuous decline in thinking, behavioral and social skills that affects a person's ability to function independently.",
    symptoms: [
      "Memory loss that disrupts daily life",
      "Challenges in planning or solving problems",
      "Difficulty completing familiar tasks",
      "Confusion with time or place",
      "Trouble understanding visual images and spatial relationships",
      "New problems with words in speaking or writing",
      "Misplacing things and losing the ability to retrace steps",
      "Decreased or poor judgment",
      "Withdrawal from work or social activities",
      "Changes in mood and personality"
    ],
    causes: "Scientists believe that for most people, Alzheimer's disease is caused by a combination of genetic, lifestyle and environmental factors that affect the brain over time. Less than 1% of the time, Alzheimer's is caused by specific genetic changes that guarantee a person will develop the disease.",
    riskFactors: [
      "Age (risk increases significantly after age 65)",
      "Family history and genetics",
      "Down syndrome",
      "Sex (women are more likely to develop Alzheimer's)",
      "Mild cognitive impairment",
      "Past head trauma",
      "Poor sleep patterns",
      "Lifestyle and heart health (factors that damage heart may damage brain)",
      "Lifelong learning and social engagement (may reduce risk)"
    ],
    prevention: [
      "Regular physical exercise",
      "Healthy diet (Mediterranean-style diet rich in fruits, vegetables, lean protein)",
      "Cognitive stimulation (reading, puzzles, games, learning)",
      "Social engagement",
      "Managing cardiovascular risk factors (blood pressure, cholesterol, diabetes)",
      "Avoiding smoking and excessive alcohol consumption",
      "Getting quality sleep",
      "Managing depression"
    ],
    treatment: [
      "Medications to temporarily improve or stabilize symptoms (cholinesterase inhibitors, memantine)",
      "Medications to treat behavioral changes",
      "Creating a safe and supportive environment",
      "Exercise and nutrition",
      "Cognitive training",
      "Alternative treatments (ongoing research)"
    ],
    whenToSeeDoctor: "If you're concerned about memory problems or other cognitive changes in yourself or a loved one, talk to your doctor. Memory problems can have many causes, including some that are easily treatable, so it's important to get a prompt assessment. Early diagnosis of Alzheimer's can help with managing symptoms and planning for the future.",
    relatedDiseases: ["parkinsons-disease", "dementia", "vascular-dementia"],
    featured: true,
    sources: [
      "Alzheimer's Association",
      "Mayo Clinic",
      "National Institute on Aging"
    ]
  }
];

// Helper functions for diseases

// Get disease by ID
export const getDiseaseById = (id) => {
  return diseases.find(disease => disease.id === id) || null;
};

// Get diseases by category
export const getDiseasesByCategory = (categoryId) => {
  return diseases.filter(disease => disease.category === categoryId);
};

// Get featured diseases
export const getFeaturedDiseases = () => {
  return diseases.filter(disease => disease.featured);
};

// Get related diseases for a given disease ID
export const getRelatedDiseases = (diseaseId) => {
  const disease = getDiseaseById(diseaseId);
  if (!disease) return [];
  
  return disease.relatedDiseases
    .map(id => getDiseaseById(id))
    .filter(Boolean);
};

// Search diseases by name or description
export const searchDiseases = (query) => {
  const searchTerm = query.toLowerCase();
  return diseases.filter(disease => 
    disease.name.toLowerCase().includes(searchTerm) ||
    disease.description.toLowerCase().includes(searchTerm)
  );
};

// Get diseases sorted alphabetically
export const getDiseasesAlphabetically = () => {
  return [...diseases].sort((a, b) => a.name.localeCompare(b.name));
}; 