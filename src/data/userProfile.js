const userProfile = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  gender: "male",
  age: 32,
  height: 175, // in cm
  weight: 75, // in kg
  profileImage: "/images/profile-placeholder.jpg",
  joinDate: "2023-02-15",
  preferences: {
    notifications: true,
    theme: "light",
    privacyLevel: "friends",
    measurementUnit: "metric"
  },
  healthGoals: [
    {
      id: "goal1",
      name: "Weight Loss",
      category: "weight",
      target: 70,
      currentValue: 75,
      unit: "kg",
      progress: 45,
      startDate: "2023-07-01",
      targetDate: "2023-12-31",
      status: "in-progress"
    },
    {
      id: "goal2",
      name: "Daily Steps",
      category: "fitness",
      target: 10000,
      currentValue: 7500,
      unit: "steps",
      progress: 75,
      startDate: "2023-06-15",
      targetDate: "2023-12-31",
      status: "in-progress"
    },
    {
      id: "goal3",
      name: "Sleep Duration",
      category: "wellness",
      target: 8,
      currentValue: 6.5,
      unit: "hours",
      progress: 81,
      startDate: "2023-08-01",
      targetDate: "2023-10-31",
      status: "at-risk"
    },
    {
      id: "goal4",
      name: "Lower Blood Pressure",
      category: "medical",
      target: 120,
      currentValue: 135,
      unit: "mmHg",
      progress: 30,
      startDate: "2023-05-01",
      targetDate: "2023-11-30",
      status: "in-progress"
    }
  ],
  medicalInfo: {
    allergies: ["Peanuts", "Penicillin"],
    conditions: ["Mild Asthma"],
    bloodType: "A+",
    medications: ["Albuterol (as needed)"]
  },
  healthMetrics: {
    lastUpdated: "2023-09-15",
    bloodPressure: {
      systolic: 135,
      diastolic: 85,
      history: [
        { date: "2023-09-15", systolic: 135, diastolic: 85 },
        { date: "2023-09-08", systolic: 138, diastolic: 87 },
        { date: "2023-09-01", systolic: 140, diastolic: 90 }
      ]
    },
    heartRate: {
      current: 72,
      history: [
        { date: "2023-09-15", value: 72 },
        { date: "2023-09-08", value: 75 },
        { date: "2023-09-01", value: 78 }
      ]
    },
    weight: {
      current: 75,
      history: [
        { date: "2023-09-15", value: 75 },
        { date: "2023-09-08", value: 75.5 },
        { date: "2023-09-01", value: 76 }
      ]
    },
    sleep: {
      avgDuration: 6.5,
      history: [
        { date: "2023-09-15", duration: 6.5, quality: "good" },
        { date: "2023-09-14", duration: 6, quality: "fair" },
        { date: "2023-09-13", duration: 7, quality: "good" }
      ]
    },
    activity: {
      dailySteps: 7500,
      caloriesBurned: 350,
      activeMinutes: 45,
      history: [
        { date: "2023-09-15", steps: 7500, calories: 350, activeMinutes: 45 },
        { date: "2023-09-14", steps: 6800, calories: 320, activeMinutes: 40 },
        { date: "2023-09-13", steps: 8200, calories: 380, activeMinutes: 55 }
      ]
    }
  },
  fitnessData: {
    workouts: [
      {
        id: "workout1",
        type: "running",
        date: "2023-09-15",
        duration: 30, // minutes
        distance: 5, // km
        caloriesBurned: 350
      },
      {
        id: "workout2",
        type: "strength",
        date: "2023-09-13",
        duration: 45,
        exercises: ["bench press", "squats", "deadlifts"],
        caloriesBurned: 280
      }
    ],
    weeklyActivity: {
      totalMinutes: 180,
      totalCalories: 1200,
      workoutFrequency: 4
    }
  },
  nutritionData: {
    dailyCalorieTarget: 2000,
    currentDailyAverage: 2200,
    dailyProteinTarget: 120, // grams
    dailyWaterTarget: 3000, // ml
    recentMeals: [
      {
        id: "meal1",
        date: "2023-09-15",
        type: "breakfast",
        foods: ["oatmeal", "banana", "coffee"],
        calories: 450,
        macros: {
          protein: 15,
          carbs: 65,
          fat: 10
        }
      },
      {
        id: "meal2",
        date: "2023-09-15",
        type: "lunch",
        foods: ["grilled chicken", "salad", "rice"],
        calories: 650,
        macros: {
          protein: 40,
          carbs: 70,
          fat: 15
        }
      }
    ]
  },
  completedTests: [
    {
      id: "test1",
      name: "Heart Health Assessment",
      date: "2023-08-10",
      score: 85,
      insights: ["Good overall cardiovascular health", "Room for improvement in resting heart rate"]
    },
    {
      id: "test2",
      name: "Stress Level Assessment",
      date: "2023-07-05",
      score: 65,
      insights: ["Moderate stress levels", "Consider more relaxation activities"]
    }
  ]
};

export default userProfile; 