import React from "react";

export function StatCard({ count = 0, label, icon: Icon, variant = "blue", badgeText }) {
  const variantStyles = {
    blue: { iconBg: "bg-blue-500", badgeBg: "bg-blue-50", badgeText: "text-blue-600" },
    green: { iconBg: "bg-green-500", badgeBg: "bg-green-50", badgeText: "text-green-600" },
    purple: { iconBg: "bg-purple-500", badgeBg: "bg-purple-50", badgeText: "text-purple-600" },
    pink: { iconBg: "bg-pink-500", badgeBg: "bg-pink-50", badgeText: "text-pink-600" },
  };
  const styles = variantStyles[variant] || variantStyles.blue;

  return (
    // Added dark:bg-gray-800 and dark:border-gray-700
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col relative transition-all duration-200 hover:shadow-md border border-transparent dark:border-gray-700">
      {badgeText && (
        <div className="absolute top-6 right-6">
          <span className={`${styles.badgeBg} ${styles.badgeText} text-xs font-medium px-3 py-1 rounded-full`}>
            {badgeText}
          </span>
        </div>
      )}
      <div className={`${styles.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-sm`}>
        {Icon && <Icon className="w-6 h-6 text-white" />}
      </div>
      {/* Added dark:text-white */}
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{count}</div>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}