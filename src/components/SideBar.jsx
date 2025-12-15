// src/components/SideBar.jsx
import React from 'react';
import { 
  Search, LayoutGrid, Menu, Activity, Calendar, Heart, Users, Plus, Settings 
} from 'lucide-react';

export function NavigationSidebar() {
  const navItems = [
    { icon: Search, label: 'Search' },
    { icon: LayoutGrid, label: 'Dashboard' },
    { icon: Menu, label: 'Menu' },
    { icon: Activity, label: 'Activity' },
    { icon: Calendar, label: 'Calendar', active: true },
    { icon: Heart, label: 'Favorites' },
    { icon: Users, label: 'Patients' },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="p-4 flex justify-center">
        <div className="w-10 h-10 bg-gray-900 dark:bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">M</div>
      </div>

      <nav className="flex-1 flex flex-col items-center py-6 space-y-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`p-3 rounded-xl transition-all duration-200 group relative ${
              item.active 
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <item.icon className={`w-6 h-6 ${item.active ? 'stroke-2' : 'stroke-[1.5]'}`} />
          </button>
        ))}
      </nav>

      <div className="p-4 flex flex-col items-center space-y-4 pb-6">
        <button className="p-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}