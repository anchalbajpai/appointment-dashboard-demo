// src/App.jsx
import React, { useState, useEffect } from "react";
import { Calendar, CheckCircle, Clock, Video, Plus, Moon, Sun } from "lucide-react"; // Import Sun/Moon here

// Components
import { NavigationSidebar } from "./components/SideBar";
import { StatCard } from "./components/StatCard";
import { AppointmentCard } from "./components/AppointmentCard";
import { MiniCalendar } from "./components/MiniCalendar";
import { useAppointments } from "./hooks/useAppointments";

function App() {
  const { 
    appointments, loading, activeTab, setActiveTab, 
    selectedDate, setSelectedDate, updateStatus, addAppointment 
  } = useAppointments();

  // DARK MODE STATE
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Function
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  // Sync with HTML tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Derived Stats
  const todayString = new Date().toISOString().split('T')[0];
  const stats = {
    today: appointments.filter(a => a.date === todayString).length,
    upcoming: appointments.filter(a => new Date(a.date) > new Date()).length,
    confirmed: appointments.filter(a => a.status === "Confirmed").length,
    video: appointments.filter(a => a.type === "Video Call" || a.type === "Telemedicine").length,
  };

  const statsData = [
    { label: "Today's Appointments", count: stats.today, variant: "blue", icon: Calendar, badgeText: "Today" },
    { label: "Confirmed Appointments", count: stats.confirmed, variant: "green", icon: CheckCircle, badgeText: "Confirmed" },
    { label: "Upcoming Appointments", count: stats.upcoming, variant: "purple", icon: Clock, badgeText: "Upcoming" },
    { label: "Telemedicine Sessions", count: stats.video, variant: "pink", icon: Video, badgeText: "Virtual" },
  ];

  return (
    <div className={`flex h-screen w-full bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200 overflow-hidden`}>
      
      {/* SIDEBAR: No longer needs props */}
      <div className="w-20 flex-shrink-0 h-full">
        <NavigationSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        <header className="px-8 py-6 flex justify-between items-center bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Appointment Management</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Schedule and manage patient appointments</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* DARK MODE TOGGLE (Moved to Header) */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              onClick={addAppointment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-[1600px] mx-auto">
            {statsData.map((stat, index) => <StatCard key={index} {...stat} />)}
          </div>

          {/* Split View */}
          <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto">
            {/* CALENDAR WRAPPER */}
            <div className="lg:w-1/3 xl:w-1/4 min-w-[300px]">
              {/* Ensure this wrapper doesn't force white background on the calendar */}
              <div className="h-full">
                <MiniCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
              </div>
            </div>

            {/* LIST */}
            <div className="flex-1 min-w-0">
              <div className="flex space-x-4 mb-6 text-sm font-medium text-gray-500 dark:text-gray-400 overflow-x-auto pb-2">
                {["Upcoming", "Today", "Past", "All"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold"
                        : "hover:text-black dark:hover:text-gray-200"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-12 text-gray-400 dark:text-gray-500 animate-pulse">Loading...</div>
                ) : appointments.length > 0 ? (
                  appointments.map((appt) => (
                    <AppointmentCard
                      key={appt.id}
                      id={appt.id}
                      patientName={appt.name}
                      date={appt.date}
                      time={appt.time}
                      duration={appt.duration}
                      doctor={appt.doctor}
                      consultationType={appt.type}
                      status={appt.status}
                      reason={appt.reason}
                      onStatusUpdate={updateStatus}
                      isUpdating={false}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                    No {activeTab} appointments found
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;