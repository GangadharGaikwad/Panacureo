// Sample health data for the Panacureo platform

export const activityData = {
  steps: [
    { date: '2023-04-15', value: 8234 },
    { date: '2023-04-16', value: 7500 },
    { date: '2023-04-17', value: 9120 },
    { date: '2023-04-18', value: 10430 },
    { date: '2023-04-19', value: 8976 },
    { date: '2023-04-20', value: 7654 },
    { date: '2023-04-21', value: 12340 },
  ],
  sleep: [
    { date: '2023-04-15', value: 7.5 },
    { date: '2023-04-16', value: 6.8 },
    { date: '2023-04-17', value: 8.2 },
    { date: '2023-04-18', value: 7.0 },
    { date: '2023-04-19', value: 7.8 },
    { date: '2023-04-20', value: 6.5 },
    { date: '2023-04-21', value: 8.0 },
  ],
  calories: [
    { date: '2023-04-15', value: 2150 },
    { date: '2023-04-16', value: 1850 },
    { date: '2023-04-17', value: 2300 },
    { date: '2023-04-18', value: 2100 },
    { date: '2023-04-19', value: 1950 },
    { date: '2023-04-20', value: 2250 },
    { date: '2023-04-21', value: 2400 },
  ],
  heartRate: [
    { date: '2023-04-15', value: 68 },
    { date: '2023-04-16', value: 72 },
    { date: '2023-04-17', value: 70 },
    { date: '2023-04-18', value: 75 },
    { date: '2023-04-19', value: 73 },
    { date: '2023-04-20', value: 71 },
    { date: '2023-04-21', value: 69 },
  ],
};

export const userProfile = {
  id: 'user123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  joinDate: '2023-01-15',
  avatar: '',
  plan: 'premium',
  personalInfo: {
    dateOfBirth: '1990-05-20',
    gender: 'Male',
    phone: '+1 (555) 123-4567',
    address: '123 Health St, Wellness City, WC 12345',
  },
  healthInfo: {
    height: 180, // cm
    weight: 75, // kg
    bloodType: 'O+',
    allergies: 'None',
    conditions: ['Mild Asthma'],
    medications: [
      { name: 'Vitamin D', dosage: '1000 IU', frequency: 'Daily' },
      { name: 'Multivitamin', dosage: '1 tablet', frequency: 'Daily' },
    ],
  },
  goals: {
    dailySteps: 10000,
    sleepHours: 8,
    calorieIntake: 2200,
    weightGoal: 'maintain',
  },
};

export const appointments = [
  {
    id: 'apt1',
    doctor: 'Dr. Jane Smith',
    specialty: 'General Practitioner',
    date: '2023-05-10',
    time: '10:00 AM',
    location: 'Health Center Building A',
    notes: 'Annual checkup',
  },
  {
    id: 'apt2',
    doctor: 'Dr. Robert Johnson',
    specialty: 'Cardiologist',
    date: '2023-05-17',
    time: '2:30 PM',
    location: 'Medical Plaza, Suite 302',
    notes: 'Follow-up on test results',
  },
  {
    id: 'apt3',
    doctor: 'Dr. Lisa Williams',
    specialty: 'Nutritionist',
    date: '2023-05-25',
    time: '11:15 AM',
    location: 'Wellness Center',
    notes: 'Diet consultation',
  },
];

export const articles = [
  {
    id: 'art1',
    title: 'The Benefits of Regular Exercise',
    excerpt: 'Discover how just 30 minutes of activity each day can transform your health...',
    imageUrl: '', // Would contain actual image URL in real app
    category: 'Fitness',
    date: '2023-04-10',
  },
  {
    id: 'art2',
    title: 'Nutrition Essentials for a Balanced Diet',
    excerpt: 'Learn about the key nutrients your body needs and how to ensure you get them...',
    imageUrl: '', // Would contain actual image URL in real app
    category: 'Nutrition',
    date: '2023-04-12',
  },
  {
    id: 'art3',
    title: 'Quality Sleep: The Forgotten Pillar of Health',
    excerpt: 'Why sleep might be the most important health factor you're neglecting...',
    imageUrl: '', // Would contain actual image URL in real app
    category: 'Wellness',
    date: '2023-04-15',
  },
  {
    id: 'art4',
    title: 'Understanding Your Heart Health Metrics',
    excerpt: 'A guide to the numbers that matter when it comes to your cardiovascular health...',
    imageUrl: '', // Would contain actual image URL in real app
    category: 'Medical',
    date: '2023-04-18',
  },
];