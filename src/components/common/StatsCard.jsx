import React from 'react';

const StatsCard = ({ title, value, icon: Icon, trend, colorClass = "primary" }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-gray-500 mb-1">{title}</div>
        <div className={`text-2xl font-black text-gray-800`}>{value}</div>
        {trend && (
          <div className="text-xs text-gray-400 mt-1">{trend}</div>
        )}
      </div>
      <div className={`p-3 rounded-lg bg-gray-50 text-${colorClass}`}>
        {Icon && <Icon size={24} />}
      </div>
    </div>
  );
};

export default StatsCard;
