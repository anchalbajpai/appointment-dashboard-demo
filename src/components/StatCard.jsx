// src/components/StatCard.jsx
import React from "react";

/**
 * StatCard Component
 * Displays a key performance indicator (KPI) with an icon, count, and optional badge.
 * * Features:
 * - Supports multiple color themes (blue, green, purple, pink)
 * - Auto-adapts to Dark Mode
 * - Hover effects for interactivity
 * * @param {number|string} count - The main statistic number to display.
 * @param {string} label - Description of the statistic.
 * @param {ElementType} icon - Lucide React icon component.
 * @param {string} [variant="blue"] - Color theme key ('blue', 'green', 'purple', 'pink').
 * @param {string} [badgeText] - Optional text for a status badge in the top-right.
 */
export function StatCard({ 
  count = 0, 
  label, 
  icon: Icon, 
  variant = "blue", 
  badgeText 
}) {
  
  // Configuration for color themes. 
  // Centralizing this object makes it easy to add new themes or adjust brand colors.
  const variantStyles = {
    blue: {
      iconBg: "bg-blue-500",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-600",
    },
    green: {
      iconBg: "bg-green-500",
      badgeBg: "bg-green-50",
      badgeText: "text-green-600",
    },
    purple: {
      iconBg: "bg-purple-500",
      badgeBg: "bg-purple-50",
      badgeText: "text-purple-600",
    },
    pink: {
      iconBg: "bg-pink-500",
      badgeBg: "bg-pink-50",
      badgeText: "text-pink-600",
    },
  };

  // Fallback to blue if an invalid variant is passed
  const styles = variantStyles[variant] || variantStyles.blue;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col relative transition-all duration-200 hover:shadow-md border border-transparent dark:border-gray-700">
      
      {/* Optional Status Badge (Top Right) */}
      {badgeText && (
        <div className="absolute top-6 right-6">
          <span className={`${styles.badgeBg} ${styles.badgeText} text-xs font-medium px-3 py-1 rounded-full`}>
            {badgeText}
          </span>
        </div>
      )}

      {/* Icon Container */}
      <div className={`${styles.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-sm`}>
        {Icon && <Icon className="w-6 h-6 text-white" />}
      </div>

      {/* Main Metric Count */}
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {count}
      </div>

      {/* Label / Description */}
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </div>
    </div>
  );
}