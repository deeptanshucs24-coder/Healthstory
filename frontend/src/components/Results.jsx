import React from 'react';
import { Heart, Activity, TrendingUp, AlertCircle, CheckCircle, Target, Zap, User, Download, Info } from 'lucide-react';

const Results = ({ analysis, story, onReset, onDownload }) => {
  const getHabitDetails = (category) => {
    const details = {
      'Sleep': {
        why: 'Sleep is your body\'s repair and recovery time. Poor sleep affects hormone regulation, immune function, memory consolidation, and emotional stability.',
        impact: 'Chronic sleep deprivation increases risk of obesity, diabetes, heart disease, and mental health issues. It also accelerates aging at the cellular level.',
        action: 'Aim for 7-8 hours of quality sleep. Create a bedtime routine, avoid screens 1 hour before bed, keep your room cool and dark, and maintain consistent sleep/wake times.'
      },
      'Nutrition': {
        why: 'Your food choices determine what building blocks your cells have to work with. Regular, balanced meals keep your metabolism stable and energy consistent.',
        impact: 'Poor nutrition leads to blood sugar spikes, insulin resistance, inflammation, weight gain, and nutrient deficiencies that affect every body system.',
        action: 'Eat regular meals with protein at each one. Include vegetables, whole grains, and healthy fats. Minimize processed foods and sugary drinks.'
      },
      'Physical Activity': {
        why: 'Movement is essential for cardiovascular health, muscle strength, bone density, joint mobility, and mental wellbeing.',
        impact: 'Sedentary lifestyle increases risk of heart disease, diabetes, obesity, osteoporosis, and cognitive decline.',
        action: 'Aim for 30 minutes of movement daily. Mix cardio with strength training. Find activities you enjoy.'
      },
      'Mental Health': {
        why: 'Mental exhaustion and chronic stress damage your brain\'s structure and function.',
        impact: 'Chronic mental strain leads to anxiety, depression, weakened immunity, and increased inflammation.',
        action: 'Practice stress management: meditation, deep breathing, journaling. Seek support when needed.'
      },
      'Digital Health': {
        why: 'Excessive screen time fragments attention and disrupts sleep through blue light exposure.',
        impact: 'Digital overload increases anxiety, disrupts circadian rhythms, and reduces focus ability.',
        action: 'Set screen boundaries: no phones 1 hour before bed or during meals. Take regular breaks.'
      },
      'Lifestyle': {
        why: 'Daily choices like sunlight exposure and posture compound over time.',
        impact: 'Lack of sunlight affects mood and vitamin D. Poor posture causes chronic pain.',
        action: 'Get 15-30 minutes of sunlight daily. Check posture regularly. Build sustainable habits.'
      },
      'Hydration': {
        why: 'Water is essential for every cellular process.',
        impact: 'Chronic dehydration causes fatigue, headaches, and poor concentration.',
        action: 'Drink 8+ glasses of water daily. Keep a water bottle with you.'
      },
      'Energy': {
        why: 'Consistent energy levels indicate balanced hormones and good overall health.',
        impact: 'Poor energy management leads to caffeine dependency and afternoon crashes.',
        action: 'Balance blood sugar with regular meals. Get quality sleep. Manage stress.'
      },
      'Physical Health': {
        why: 'Posture affects breathing, circulation, joint health, and pain levels.',
        impact: 'Poor posture causes back pain, neck strain, and reduced lung capacity.',
        action: 'Check posture hourly. Strengthen core muscles. Adjust workspace ergonomics.'
      }
    };
    return details[category] || { why: '', impact: '', action: '' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">Your Future Health Story</h1>
            <p className="text-gray-600 text-lg">Based on your current lifestyle habits</p>
          </div>

          {/* Human Figurine */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className={`bg-gradient-to-br ${story.statusColor} p-12 rounded-3xl shadow-xl relative overflow-hidden`}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                  <circle
                    cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="8"
                    strokeDasharray={`${(analysis.overallPercentage / 100) * 565} 565`}
                    strokeDashoffset="0" transform="rotate(-90 100 100)" strokeLinecap="round"
                  />
                </svg>
                <div className="relative z-10 text-center">
                  <User className="w-32 h-32 text-white mx-auto mb-4" strokeWidth={1.5} />
                  <div className="text-white">
                    <div className="text-5xl font-bold mb-2">{analysis.overallPercentage}%</div>
                    <div className="text-lg font-semibold opacity-90">Overall Health</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-8 py-3 rounded-full shadow-xl border-4 border-gray-50">
                <span className="font-bold text-gray-800 text-xl">{story.healthStatus}</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center mb-10">
            <button
              onClick={onDownload}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Detailed Report
            </button>
          </div>

          {/* 10-Year Outlook */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-7 h-7 mr-3 text-purple-600" />
              Your 10-Year Outlook
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{story.overallMessage}</p>
          </div>

          {/* Health Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <Zap className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-700 mb-2">Energy Level</h3>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  style={{ width: `${story.energyLevel}%` }}
                />
              </div>
              <p className="text-2xl font-bold text-blue-600">{story.energyLevel}%</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <Heart className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-700 mb-2">Mood Health</h3>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-purple-600"
                  style={{ width: `${story.moodLevel}%` }}
                />
              </div>
              <p className="text-2xl font-bold text-purple-600">{story.moodLevel}%</p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-6 text-center">
              <Activity className="w-10 h-10 text-pink-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-700 mb-2">Mobility</h3>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-pink-600"
                  style={{ width: `${story.mobilityLevel}%` }}
                />
              </div>
              <p className="text-2xl font-bold text-pink-600">{story.mobilityLevel}%</p>
            </div>
          </div>

          {/* Why Numbers Matter */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why These Numbers Matter</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{story.detailedStory}</p>
          </div>

          {/* Habit Categories */}
          <div className="space-y-6">
            {analysis.habits.mustImprove.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
                  <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
                  Must Improve (Priority)
                </h3>
                <p className="text-gray-700 mb-3">These habits need immediate attention:</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.habits.mustImprove.map((h, i) => {
                    const details = getHabitDetails(h.category);
                    return (
                      <div key={i} className="relative group">
                        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium inline-flex items-center gap-2 cursor-help">
                          {h.category} ({h.score}%)
                          <Info className="w-4 h-4" />
                        </span>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-80">
                          <div className="bg-gray-900 text-white text-sm rounded-lg p-4 shadow-2xl">
                            <h4 className="font-bold mb-2 text-red-300">Why It Matters:</h4>
                            <p className="mb-3">{details.why}</p>
                            <h4 className="font-bold mb-2 text-red-300">Health Impact:</h4>
                            <p className="mb-3">{details.impact}</p>
                            <h4 className="font-bold mb-2 text-green-300">What To Do:</h4>
                            <p>{details.action}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {analysis.habits.easierToStart.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
                  <Target className="w-6 h-6 mr-2 text-yellow-600" />
                  Easier to Start
                </h3>
                <p className="text-gray-700 mb-3">You have a foundation here:</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.habits.easierToStart.map((h, i) => {
                    const details = getHabitDetails(h.category);
                    return (
                      <div key={i} className="relative group">
                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium inline-flex items-center gap-2 cursor-help">
                          {h.category} ({h.score}%)
                          <Info className="w-4 h-4" />
                        </span>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-80">
                          <div className="bg-gray-900 text-white text-sm rounded-lg p-4 shadow-2xl">
                            <h4 className="font-bold mb-2 text-yellow-300">Why It Matters:</h4>
                            <p className="mb-3">{details.why}</p>
                            <h4 className="font-bold mb-2 text-yellow-300">Health Impact:</h4>
                            <p className="mb-3">{details.impact}</p>
                            <h4 className="font-bold mb-2 text-green-300">What To Do:</h4>
                            <p>{details.action}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {analysis.habits.easiestToMaintain.length > 0 && (
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Easiest to Maintain
                </h3>
                <p className="text-gray-700 mb-3">Great work! Keep these going:</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.habits.easiestToMaintain.map((h, i) => {
                    const details = getHabitDetails(h.category);
                    return (
                      <div key={i} className="relative group">
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium inline-flex items-center gap-2 cursor-help">
                          {h.category} ({h.score}%)
                          <Info className="w-4 h-4" />
                        </span>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-80">
                          <div className="bg-gray-900 text-white text-sm rounded-lg p-4 shadow-2xl">
                            <h4 className="font-bold mb-2 text-green-300">Why It Matters:</h4>
                            <p className="mb-3">{details.why}</p>
                            <h4 className="font-bold mb-2 text-green-300">Health Impact:</h4>
                            <p className="mb-3">{details.impact}</p>
                            <h4 className="font-bold mb-2 text-green-300">Keep It Up:</h4>
                            <p>{details.action}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Retake Button */}
          <div className="mt-10 text-center">
            <button
              onClick={onReset}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold px-8 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;