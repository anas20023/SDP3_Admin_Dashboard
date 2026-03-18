import React from "react";
import { Clock, CheckCircle, XCircle, Star } from "lucide-react";

const SuggestionCard = ({ suggestion, onClick }) => {
  const statusConfig = {
    pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    approved: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Approved" },
    reject: { icon: XCircle, color: "bg-red-100 text-red-800", label: "Rejected" },
  };

  const status = suggestion.status || "pending";
  const StatusIcon = statusConfig[status]?.icon || Clock;
  const statusColor = statusConfig[status]?.color || "bg-gray-100 text-gray-800";

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-800">{suggestion.course_code}</h3>
            {suggestion.course_name && (
              <p className="text-sm text-gray-600">{suggestion.course_name}</p>
            )}
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
            <StatusIcon className="h-3 w-3" />
            <span>{statusConfig[status]?.label}</span>
          </div>
        </div>

        {/* Description (truncated) */}
        {suggestion.description && (
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {suggestion.description}
          </p>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span>{suggestion.stars || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;