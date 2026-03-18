import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { manageApi } from '../services/api';
import UsersLast30Day from './UsersLast30Day';
import ApprovalPieChart from './ApprovalPieChart';
import SuggestionBarChart from './SuggestionBarChart';
import StatsCard from './common/StatsCard';

const Analytics = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics'],
    queryFn: manageApi.getAnalytics,
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white/20 rounded-xl"></div>
          ))}
        </div>
        <div className="h-96 bg-white/20 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-error">
        Error loading analytics: {error.message}
      </div>
    );
  }
  return (
    <div className="p-4 space-y-4 bg-slate-50 min-h-screen">

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-5 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          {data?.userAnalytics && <UsersLast30Day data={data.userAnalytics} />}
        </div>
        
        <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          {data?.starAnalysis && <SuggestionBarChart data={data.starAnalysis} />}
        </div>
        
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          {data?.suggestionAnalysis && <ApprovalPieChart data={data.suggestionAnalysis} />}
        </div>
      </div>
    </div>
  );
};

export default Analytics;