// src/components/MiniCalendar.jsx
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * MiniCalendar Component
 * A standalone calendar widget for filtering appointments by date.
 * Features:
 * - Month navigation
 * - Visual indication of "Today"
 * - Selection state management
 * - Dark mode support
 */
export function MiniCalendar({ selectedDate, onDateSelect }) {
  // State: Tracks the currently viewed month (independent of selection)
  const [currentNavDate, setCurrentNavDate] = useState(new Date());

  // Helper: Formats date to YYYY-MM-DD for consistency with backend data
  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  // Sync the view if the parent component changes the selected date programmatically
  useEffect(() => {
    if (selectedDate) {
      setCurrentNavDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  // --- Calendar Logic ---
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(
    currentNavDate.getFullYear(),
    currentNavDate.getMonth(),
    1
  ).getDay();

  // Create array of days [1, 2, ..., 31]
  const days = Array.from(
    {
      length: daysInMonth(
        currentNavDate.getFullYear(),
        currentNavDate.getMonth()
      ),
    },
    (_, i) => i + 1
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Navigation Handlers
  const prevMonth = () =>
    setCurrentNavDate(
      new Date(currentNavDate.getFullYear(), currentNavDate.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentNavDate(
      new Date(currentNavDate.getFullYear(), currentNavDate.getMonth() + 1, 1)
    );

  return (
    // FIX: Removed 'h-full flex flex-col' to prevent stretching
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200 h-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <h3 className="font-bold text-gray-800 dark:text-white text-lg select-none">
          {monthNames[currentNavDate.getMonth()]} {currentNavDate.getFullYear()}
        </h3>

        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next Month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-1 select-none"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9" />
        ))}

        {days.map((day) => {
          const dateString = formatDate(
            currentNavDate.getFullYear(),
            currentNavDate.getMonth(),
            day
          );
          const isSelected = selectedDate === dateString;
          const isToday =
            day === new Date().getDate() &&
            currentNavDate.getMonth() === new Date().getMonth() &&
            currentNavDate.getFullYear() === new Date().getFullYear();

          return (
            <button
              key={day}
              onClick={() => onDateSelect(isSelected ? null : dateString)}
              className={`h-9 w-9 rounded-full flex items-center justify-center text-sm transition-all duration-200 
                ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md font-bold hover:bg-blue-700"
                    : isToday
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 font-bold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Footer */}
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
