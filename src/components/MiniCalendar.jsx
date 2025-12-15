// src/components/MiniCalendar.jsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function MiniCalendar({ selectedDate, onDateSelect }) {
  const [currentNavDate, setCurrentNavDate] = useState(new Date());

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (selectedDate) {
      setCurrentNavDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentNavDate.getFullYear(), currentNavDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth(currentNavDate.getFullYear(), currentNavDate.getMonth()) }, (_, i) => i + 1);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const prevMonth = () => setCurrentNavDate(new Date(currentNavDate.getFullYear(), currentNavDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentNavDate(new Date(currentNavDate.getFullYear(), currentNavDate.getMonth() + 1, 1));

  return (
    // FIX: Explicitly set dark background and border here
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        {/* FIX: Ensure title is white in dark mode */}
        <h3 className="font-bold text-gray-800 dark:text-white text-lg">
          {monthNames[currentNavDate.getMonth()]} {currentNavDate.getFullYear()}
        </h3>
        <button 
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 text-center">
        {dayNames.map(day => (
          // FIX: Ensure day names are visible in dark mode
          <div key={day} className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-1">
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9" />
        ))}
        
        {days.map(day => {
          const dateString = formatDate(currentNavDate.getFullYear(), currentNavDate.getMonth(), day);
          const isSelected = selectedDate === dateString;
          const isToday = 
            day === new Date().getDate() && 
            currentNavDate.getMonth() === new Date().getMonth() &&
            currentNavDate.getFullYear() === new Date().getFullYear();
            
          return (
            <button
              key={day}
              onClick={() => onDateSelect(isSelected ? null : dateString)}
              // FIX: Detailed dark mode classes for buttons
              className={`h-9 w-9 rounded-full flex items-center justify-center text-sm transition-all duration-200 
                ${isSelected 
                  ? 'bg-blue-600 text-white shadow-md font-bold' 
                  : isToday 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 font-bold' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' 
                }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      
      {selectedDate && (
        <button 
          onClick={() => onDateSelect(null)}
          className="mt-6 w-full text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Clear Date Filter
        </button>
      )}
    </div>
  );
}