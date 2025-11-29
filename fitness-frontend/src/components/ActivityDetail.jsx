import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router';
import { getActivityDetail } from '../services/api';
import { ArrowLeft, Calendar, Clock, Flame, TrendingUp, AlertCircle, Lightbulb, ShieldCheck } from 'lucide-react';

const ActivityDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error(error);
      }
    }

    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading activity details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </button>

      {/* Activity Details Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 mb-6 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Flame className="text-blue-400" size={24} />
          </div>
          Activity Details
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Activity Type */}
          <div className="bg-gray-700/50 rounded-lg p-5 border border-gray-600">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-blue-400" size={20} />
              <p className="text-gray-400 text-sm font-medium">Activity Type</p>
            </div>
            <p className="text-2xl font-bold text-white">{activity.type}</p>
          </div>

          {/* Duration */}
          <div className="bg-gray-700/50 rounded-lg p-5 border border-gray-600">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-green-400" size={20} />
              <p className="text-gray-400 text-sm font-medium">Duration</p>
            </div>
            <p className="text-2xl font-bold text-white">
              {activity.duration} <span className="text-lg text-gray-400">minutes</span>
            </p>
          </div>

          {/* Calories Burned */}
          <div className="bg-gray-700/50 rounded-lg p-5 border border-gray-600">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="text-orange-400" size={20} />
              <p className="text-gray-400 text-sm font-medium">Calories Burned</p>
            </div>
            <p className="text-2xl font-bold text-white">
              {activity.caloriesBurned} <span className="text-lg text-gray-400">kcal</span>
            </p>
          </div>

          {/* Date */}
          <div className="bg-gray-700/50 rounded-lg p-5 border border-gray-600">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-purple-400" size={20} />
              <p className="text-gray-400 text-sm font-medium">Date</p>
            </div>
            <p className="text-lg font-semibold text-white">
              {new Date(activity.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* AI Recommendation Card */}
      {recommendation && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Lightbulb className="text-purple-400" size={24} />
            </div>
            AI Recommendation
          </h2>

          {/* Analysis Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="text-blue-400" size={20} />
              <h3 className="text-xl font-bold text-blue-400">Analysis</h3>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-5 border border-gray-600">
              <p className="text-gray-300 leading-relaxed">{activity.recommendation}</p>
            </div>
          </div>

          {/* Improvements Section */}
          {activity?.improvements && activity.improvements.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="text-yellow-400" size={20} />
                <h3 className="text-xl font-bold text-yellow-400">Improvements</h3>
              </div>
              <div className="space-y-3">
                {Array.isArray(activity.improvements) ? (
                  activity.improvements.map((improvement, index) => (
                    <div key={index} className="flex gap-3 bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                      <span className="text-yellow-400 font-bold">•</span>
                      <p className="text-gray-300 flex-1">{improvement}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-3 bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                    <span className="text-yellow-400 font-bold">•</span>
                    <p className="text-gray-300 flex-1">{activity.improvements}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Suggestions Section */}
          {activity?.suggestions && activity.suggestions.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="text-green-400" size={20} />
                <h3 className="text-xl font-bold text-green-400">Suggestions</h3>
              </div>
              <div className="space-y-3">
                {activity.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex gap-3 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <span className="text-green-400 font-bold">•</span>
                    <p className="text-gray-300 flex-1">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety Guidelines Section */}
          {activity?.safety && activity.safety.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-red-400" size={20} />
                <h3 className="text-xl font-bold text-red-400">Safety Guidelines</h3>
              </div>
              <div className="space-y-3">
                {activity.safety.map((safety, index) => (
                  <div key={index} className="flex gap-3 bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                    <span className="text-red-400 font-bold">•</span>
                    <p className="text-gray-300 flex-1">{safety}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ActivityDetail