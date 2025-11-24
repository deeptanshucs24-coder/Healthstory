import React from 'react';
import { Activity, Moon, Smartphone, Droplets, Brain, Coffee, TrendingUp, Zap, Sun, User } from 'lucide-react';

const iconMap = {
  Activity, Moon, Smartphone, Droplets, Brain, Coffee, TrendingUp, Zap, Sun, User
};

const Questionnaire = ({ questions, currentQuestion, onAnswer }) => {
  const currentQ = questions[currentQuestion];
  const Icon = iconMap[currentQ.iconName];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-purple-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-100 p-4 rounded-full">
              <Icon className="w-12 h-12 text-purple-600" />
            </div>
          </div>
          
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              {currentQ.category}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => onAnswer(currentQ.id, option.value)}
                className="w-full text-left p-5 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-gray-700 font-medium hover:shadow-md"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;