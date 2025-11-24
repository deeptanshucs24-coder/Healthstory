const questions = [
  { id: 'meals', category: 'Nutrition' },
  { id: 'sleepHours', category: 'Sleep' },
  { id: 'phoneBeforeSleep', category: 'Sleep' },
  { id: 'water', category: 'Hydration' },
  { id: 'screenTime', category: 'Digital Health' },
  { id: 'mentalExhaustion', category: 'Mental Health' },
  { id: 'midnight', category: 'Sleep' },
  { id: 'caffeine', category: 'Energy' },
  { id: 'convenience', category: 'Lifestyle' },
  { id: 'procrastination', category: 'Mental Health' },
  { id: 'movement', category: 'Physical Activity' },
  { id: 'carbsVsProtein', category: 'Nutrition' },
  { id: 'overthinking', category: 'Sleep' },
  { id: 'afternoonExhaustion', category: 'Energy' },
  { id: 'phoneBreaks', category: 'Digital Health' },
  { id: 'sunlight', category: 'Lifestyle' },
  { id: 'posture', category: 'Physical Health' }
];

const calculateAnalysis = (answers) => {
  const categoryScores = {};
  const categoryMaxScores = {};
  
  questions.forEach(q => {
    if (!categoryScores[q.category]) {
      categoryScores[q.category] = 0;
      categoryMaxScores[q.category] = 0;
    }
    const answer = answers[q.id] || 0;
    categoryScores[q.category] += answer;
    categoryMaxScores[q.category] += 4;
  });

  const categoryPercentages = {};
  Object.keys(categoryScores).forEach(cat => {
    categoryPercentages[cat] = Math.round((categoryScores[cat] / categoryMaxScores[cat]) * 100);
  });

  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxScore = questions.length * 4;
  const overallPercentage = Math.round((totalScore / maxScore) * 100);

  const habits = {
    mustImprove: [],
    easierToStart: [],
    easiestToMaintain: []
  };

  Object.entries(categoryPercentages).forEach(([cat, pct]) => {
    if (pct < 50) {
      habits.mustImprove.push({ category: cat, score: pct });
    } else if (pct >= 50 && pct < 75) {
      habits.easierToStart.push({ category: cat, score: pct });
    } else {
      habits.easiestToMaintain.push({ category: cat, score: pct });
    }
  });

  return { categoryPercentages, overallPercentage, habits };
};

const generateStory = (analysis) => {
  const { overallPercentage, categoryPercentages } = analysis;
  
  let energyLevel, moodLevel, mobilityLevel, futureOutlook, healthStatus, statusColor, detailedBreakdown;
  
  if (overallPercentage >= 75) {
    energyLevel = 85;
    moodLevel = 90;
    mobilityLevel = 85;
    healthStatus = 'Thriving';
    statusColor = 'from-green-400 to-emerald-500';
    futureOutlook = 'Your future self is smiling! Ten years from now, you wake up refreshed and tackle your day with steady energy. Your body moves with ease, your mind stays sharp, and stress bounces off you like water off a raincoat. Small aches? Rare. Brain fog? Barely there. You have built a foundation that keeps giving back.';
    detailedBreakdown = 'You are in excellent health trajectory. Your consistent healthy habits across sleep, nutrition, and activity are creating a strong foundation for longevity. Your body is efficiently repairing itself, your immune system is robust, and your mental resilience is high. Continue these patterns and you will maintain vitality well into your later years.';
  } else if (overallPercentage >= 50) {
    energyLevel = 55;
    moodLevel = 60;
    mobilityLevel = 65;
    healthStatus = 'At Risk';
    statusColor = 'from-yellow-400 to-orange-500';
    futureOutlook = 'Your future holds promise, but there are warning signs. In ten years, you might notice afternoon energy crashes becoming the norm, mornings feeling stiff, and stress lingering longer than it should. Your body is resilient, but it is working harder than it needs to. The good news? Small shifts today can completely rewrite tomorrow\'s story.';
    detailedBreakdown = 'You are in a critical transition zone. Some habits are protecting you while others are slowly undermining your health. Your body is compensating now, but this becomes harder with age. Prioritize the must improve areas immediately—these are creating the most wear and tear on your system. Within 3-6 months of consistent changes, you will notice dramatic improvements in energy and mood.';
  } else {
    energyLevel = 30;
    moodLevel = 35;
    mobilityLevel = 40;
    healthStatus = 'Critical';
    statusColor = 'from-red-400 to-rose-600';
    futureOutlook = 'Your future self is calling for help. Ten years ahead, simple tasks might feel like mountains—stairs leave you breathless, poor sleep becomes chronic, and fatigue becomes your unwelcome companion. Stress weighs heavier, recovery takes longer, and your body feels older than it should. But here is the truth: change is possible at any moment, and your body is ready to heal.';
    detailedBreakdown = 'Your current habits are accelerating aging and increasing disease risk significantly. Multiple systems are under stress—your metabolism is struggling, inflammation is likely elevated, sleep quality is poor, and mental health is suffering. This is not a life sentence. Your body has remarkable healing capacity. Start with one must improve habit, master it for two weeks, then add another. Professional support from a doctor or health coach could be invaluable.';
  }

  const sleepStory = categoryPercentages.Sleep < 60 
    ? 'Your sleep habits are quietly sabotaging your tomorrow. Poor sleep quality, late nights, racing thoughts, and screen exposure before bed are all preventing deep, restorative sleep. This impacts everything—weight regulation, immune function, memory, mood, and even disease risk. Sleep debt accumulates like financial debt, with interest.' 
    : 'Your sleep patterns are protecting your future. You are giving your body the repair time it needs. Quality rest regulates hormones, consolidates memory, repairs tissues, and resets your stress response. This is your body\'s most critical maintenance window.';

  const nutritionStory = categoryPercentages.Nutrition < 60
    ? 'Your eating patterns are creating internal chaos. Skipping meals, irregular timing, and carb-heavy diets spike insulin, promote fat storage, and leave you on an energy rollercoaster. Your cells are not getting consistent fuel or the nutrients they need to function optimally.'
    : 'Your nutrition habits are stable and nourishing. Regular meals with balanced protein keep your metabolism steady, blood sugar stable, and hunger signals working properly. You are giving your body the building blocks it needs.';

  const activityStory = categoryPercentages['Physical Activity'] < 60
    ? 'Your body is built to move, but it is forgetting how. Lack of movement weakens muscles, stiffens joints, slows circulation, and even impacts brain health. Physical inactivity is as dangerous as smoking for long-term health outcomes.'
    : 'You are keeping your body in motion. Regular activity strengthens your cardiovascular system, maintains muscle mass, keeps joints flexible, and releases brain-protective chemicals. Movement is medicine.';

  const mentalStory = categoryPercentages['Mental Health'] < 60
    ? 'Mental exhaustion and procrastination are more than productivity issues—they signal chronic stress and cognitive overload. This damages focus, weakens emotional regulation, and creates a negative spiral that becomes harder to escape over time.'
    : 'Your mental habits show resilience. Managing stress and maintaining focus protect brain health, support emotional stability, and help you navigate life\'s challenges effectively.';

  const digitalStory = categoryPercentages['Digital Health'] < 60
    ? 'Your digital habits are fragmenting your attention and disrupting your biology. Constant phone use, especially during meals and before bed, prevents mindful living, damages sleep quality, and keeps your brain in a state of perpetual distraction and stress.'
    : 'You are managing your digital life wisely. Setting boundaries with screens protects your sleep, preserves attention span, and allows for genuine rest and connection.';

  const lifestyleStory = categoryPercentages['Lifestyle'] < 60
    ? 'Convenience-first choices, lack of sunlight, and poor posture are slowly degrading your health. Missing sunlight disrupts circadian rhythms and vitamin D production. Poor posture creates chronic pain and breathing restrictions. These minor choices compound over years.'
    : 'Your lifestyle choices support your wellbeing. Regular sunlight, mindful posture, and health-conscious decisions create a strong foundation for vitality and longevity.';

  return {
    overallMessage: futureOutlook,
    energyLevel,
    moodLevel,
    mobilityLevel,
    healthStatus,
    statusColor,
    detailedBreakdown,
    detailedStory: [sleepStory, nutritionStory, activityStory, mentalStory, digitalStory, lifestyleStory].filter(s => s).join(' ')
  };
};

module.exports = { calculateAnalysis, generateStory };

