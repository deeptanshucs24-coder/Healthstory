import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import api from './services/api';

const App = () => {
  const [stage, setStage] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    { id: 'meals', category: 'Nutrition', iconName: 'Activity', question: 'Do you skip meals or eat at irregular times?',
      options: [
        { text: 'Always - I skip meals daily', value: 1 },
        { text: 'Often - Several times a week', value: 2 },
        { text: 'Sometimes - Occasionally', value: 3 },
        { text: 'Rarely - I eat regularly', value: 4 }
      ]
    },
    { id: 'sleepHours', category: 'Sleep', iconName: 'Moon', question: 'How many hours do you sleep on average?',
      options: [
        { text: 'Less than 5 hours', value: 1 },
        { text: '5-6 hours', value: 2 },
        { text: '7-8 hours', value: 4 },
        { text: '9+ hours', value: 3 }
      ]
    },
    { id: 'phoneBeforeSleep', category: 'Sleep', iconName: 'Smartphone', question: 'Do you use your phone before sleeping?',
      options: [
        { text: 'Always - Right until I sleep', value: 1 },
        { text: 'Often - Most nights', value: 2 },
        { text: 'Sometimes - Occasionally', value: 3 },
        { text: 'Rarely - I avoid screens', value: 4 }
      ]
    },
    { id: 'water', category: 'Hydration', iconName: 'Droplets', question: 'How many glasses of water do you drink per day?',
      options: [
        { text: '0-2 glasses', value: 1 },
        { text: '3-4 glasses', value: 2 },
        { text: '5-7 glasses', value: 3 },
        { text: '8+ glasses', value: 4 }
      ]
    },
    { id: 'screenTime', category: 'Digital Health', iconName: 'Smartphone', question: 'How many hours do you spend on screens daily?',
      options: [
        { text: '10+ hours', value: 1 },
        { text: '7-9 hours', value: 2 },
        { text: '4-6 hours', value: 3 },
        { text: 'Less than 4 hours', value: 4 }
      ]
    },
    { id: 'mentalExhaustion', category: 'Mental Health', iconName: 'Brain', question: 'How often do you feel mentally exhausted or drained?',
      options: [
        { text: 'Daily - Almost always', value: 1 },
        { text: 'Often - Several times a week', value: 2 },
        { text: 'Sometimes - Occasionally', value: 3 },
        { text: 'Rarely - I feel energized', value: 4 }
      ]
    },
    { id: 'midnight', category: 'Sleep', iconName: 'Moon', question: 'Do you stay awake past midnight regularly?',
      options: [
        { text: 'Always - Every night', value: 1 },
        { text: 'Often - Most nights', value: 2 },
        { text: 'Sometimes - Occasionally', value: 3 },
        { text: 'Rarely - I sleep early', value: 4 }
      ]
    },
    { id: 'caffeine', category: 'Energy', iconName: 'Coffee', question: 'Do you rely heavily on caffeine or energy drinks to stay active?',
      options: [
        { text: 'Yes - I need it constantly', value: 1 },
        { text: 'Often - Multiple times daily', value: 2 },
        { text: 'Sometimes - Occasionally', value: 3 },
        { text: 'Rarely - I have natural energy', value: 4 }
      ]
    },
    { id: 'convenience', category: 'Lifestyle', iconName: 'TrendingUp', question: 'Do you prioritize convenience over health?',
      options: [
        { text: 'Always - Convenience first', value: 1 },
        { text: 'Often - Most of the time', value: 2 },
        { text: 'Sometimes - Occasionally', value: 3 },
        { text: 'Rarely - Health is priority', value: 4 }
      ]
    },
    { id: 'procrastination', category: 'Mental Health', iconName: 'Brain', question: 'Do you frequently procrastinate important tasks?',
      options: [
        { text: 'Always - I procrastinate daily', value: 1 },
        { text: 'Often - Several times a week', value: 2 },
        { text: 'Sometimes - Occasionally', value: 3 },
        { text: 'Rarely - I stay on track', value: 4 }
      ]
    },
    { id: 'movement', category: 'Physical Activity', iconName: 'Activity', question: 'How many days per week do you move for at least 30 minutes?',
      options: [
        { text: '0-1 days', value: 1 },
        { text: '2-3 days', value: 2 },
        { text: '4-5 days', value: 3 },
        { text: '6-7 days', value: 4 }
      ]
    },
    { id: 'carbsVsProtein', category: 'Nutrition', iconName: 'Activity', question: 'Do you eat more carbs than protein in a typical day?',
      options: [
        { text: 'Yes - Mostly carbs', value: 1 },
        { text: 'Slightly more carbs', value: 2 },
        { text: 'Balanced carbs and protein', value: 3 },
        { text: 'More protein than carbs', value: 4 }
      ]
    },
    { id: 'overthinking', category: 'Sleep', iconName: 'Brain', question: 'Do you overthink before sleeping?',
      options: [
        { text: 'Always - My mind races', value: 1 },
        { text: 'Often - Most nights', value: 2 },
        { text: 'Sometimes - Occasionally', value: 3 },
        { text: 'Rarely - I sleep peacefully', value: 4 }
      ]
    },
    { id: 'afternoonExhaustion', category: 'Energy', iconName: 'Zap', question: 'Do you get mentally exhausted by afternoon?',
      options: [
        { text: 'Always - Every afternoon', value: 1 },
        { text: 'Often - Most days', value: 2 },
        { text: 'Sometimes - Occasionally', value: 3 },
        { text: 'Rarely - I stay energized', value: 4 }
      ]
    },
    { id: 'phoneBreaks', category: 'Digital Health', iconName: 'Smartphone', question: 'Do you scroll your phone during bathroom or meal breaks?',
      options: [
        { text: 'Always - Every break', value: 1 },
        { text: 'Often - Most breaks', value: 2 },
        { text: 'Sometimes - Occasionally', value: 3 },
        { text: 'Rarely - I stay present', value: 4 }
      ]
    },
    { id: 'sunlight', category: 'Lifestyle', iconName: 'Sun', question: 'Do you stay indoors most days without sunlight?',
      options: [
        { text: 'Always - I never go out', value: 1 },
        { text: 'Often - Most days indoors', value: 2 },
        { text: 'Sometimes - Occasional outdoors', value: 3 },
        { text: 'Rarely - Regular sunlight', value: 4 }
      ]
    },
    { id: 'posture', category: 'Physical Health', iconName: 'User', question: 'Do you rarely check or correct your posture?',
      options: [
        { text: 'Always - Never check posture', value: 1 },
        { text: 'Often - Rarely check', value: 2 },
        { text: 'Sometimes - Occasionally check', value: 3 },
        { text: 'Rarely - I maintain good posture', value: 4 }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const submitAssessment = async (finalAnswers) => {
    setLoading(true);
    try {
      const response = await api.post('/assessment/analyze', { answers: finalAnswers });
      setResults(response.data);
      setStage('results');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to analyze results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await api.post('/assessment/download', 
        { results }, 
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `health-report-${Date.now()}.txt`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  const resetApp = () => {
    setStage('welcome');
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Analyzing your health story...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {stage === 'welcome' && <Welcome onStart={() => setStage('questionnaire')} />}
      {stage === 'questionnaire' && (
        <Questionnaire 
          questions={questions}
          currentQuestion={currentQuestion}
          onAnswer={handleAnswer}
        />
      )}
      {stage === 'results' && results && (
        <Results 
          analysis={results.analysis}
          story={results.story}
          onReset={resetApp}
          onDownload={downloadPDF}
        />
      )}
    </>
  );
};

export default App;
