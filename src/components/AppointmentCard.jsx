import React from 'react';
import { Calendar, Clock, User, Video, Users, Check, X, MoreVertical } from "lucide-react";

export function AppointmentCard({ id, patientName, date, time, duration, doctor, consultationType, status, reason, onStatusUpdate, isUpdating }) {
  const handleStatusChange = (newStatus) => {
    if (onStatusUpdate && !isUpdating) onStatusUpdate(id, newStatus);
  };

  return (
    // Added dark:bg-gray-800 and dark:border-gray-700
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                {/* Added dark:text-white */}
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">{patientName}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                  status === 'Cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>{status}</span>
              </div>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-4">
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />{date}
                </div>
                {/* Add dark:text-gray-400 to the rest of these text blocks */}
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />{time} • {duration}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                   <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />{doctor}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                   <Video className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />{consultationType}
                </div>
              </div>
              {reason && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-700 dark:text-gray-200">Reason:</span> {reason}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center space-x-2">
          {status !== 'Confirmed' && status !== 'Completed' && status !== 'Cancelled' && (
            <button onClick={() => handleStatusChange('Confirmed')} disabled={isUpdating} className="p-2 rounded-full text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 disabled:opacity-50 transition-colors">
              <Check className="h-5 w-5" />
            </button>
          )}
          {status !== 'Cancelled' && status !== 'Completed' && (
            <button onClick={() => handleStatusChange('Cancelled')} disabled={isUpdating} className="p-2 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 disabled:opacity-50 transition-colors">
              <X className="h-5 w-5" />
            </button>
          )}
          <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}