import React from 'react';
import { Heart } from 'lucide-react';

const Welcome = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 flex items-center justify-center">
      <div className="max-w-2xl bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="mb-6 flex justify-center">
          <Heart className="w-20 h-20 text-pink-500 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">My Health Risk Story</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Small daily choices shape your future health in powerful ways. Answer 17 simple questions, 
          and we will show you a personalized story of where your habits might lead—and how to change the ending.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 text-left rounded-lg">
          <p className="text-gray-700">
            <strong className="text-blue-700">No medical predictions.</strong> Just honest, visual storytelling 
            about how today's routines can influence tomorrow's energy, mood, and wellness.
          </p>
        </div>
        <button 
          onClick={onStart}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-semibold px-10 py-4 rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
        >
          Start Your Story →
        </button>
      </div>
    </div>
  );
};

export default Welcome;