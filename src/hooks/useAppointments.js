// src/hooks/useAppointments.js
import { useState, useEffect } from "react";

// --- Data Layer Simulation ---
// In a production AWS architecture, this data would reside in an Amazon Aurora PostgreSQL database.
// This mock object serves as the local cache to simulate the schema returned by an AppSync GraphQL query.
const MOCK_DB = [
  {
    id: 1,
    name: "Sarah Johnson",
    date: "2025-11-06",
    time: "09:00 AM",
    duration: "30 min",
    doctor: "Dr. Rajesh Kumar",
    type: "In-Person",
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "2025-11-06",
    time: "10:00 AM",
    duration: "45 min",
    doctor: "Dr. Priya Sharma",
    type: "In-Person",
    status: "Scheduled",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    date: "2025-11-06",
    time: "11:30 AM",
    duration: "30 min",
    doctor: "Dr. Rajesh Kumar",
    type: "Video Call",
    status: "Confirmed",
  },
  {
    id: 4,
    name: "John Doe",
    date: "2025-11-07",
    time: "02:00 PM",
    duration: "15 min",
    doctor: "Dr. Priya Sharma",
    type: "In-Person",
    status: "Upcoming",
  },
  {
    id: 5,
    name: "Alice Cooper",
    date: "2025-11-05",
    time: "09:30 AM",
    duration: "60 min",
    doctor: "Dr. Rajesh Kumar",
    type: "Video Call",
    status: "Completed",
  },
  {
    id: 6,
    name: "Bob Smith",
    date: "2025-11-15",
    time: "04:00 PM",
    duration: "30 min",
    doctor: "Dr. Priya Sharma",
    type: "In-Person",
    status: "Scheduled",
  },
  // In production, pagination logic would be handled here to lazy-load additional records.
];

/**
 * Custom Hook: useAppointments
 * Encapsulates the Appointment Management business domain.
 * Acts as an adapter between the UI components and the (simulated) backend services.
 */
export function useAppointments() {
  // State Management: Holds the "Source of Truth" for the session
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // View State: Manages UI filters (Tabs & Calendar)
  const [activeTab, setActiveTab] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);

  // --- Data Fetching ---
  // Simulates an async network call (e.g., AppSync GraphQL Query).
  // Uses setTimeout to mimic network latency for a realistic loading state.
  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      setAppointments(MOCK_DB);
      setLoading(false);
    }, 500);

    return () => clearTimeout(fetchTimer); // Cleanup on unmount
  }, []);

  // --- Filtering Logic ---
  // Memoized derivation of the visible list based on active filters.
  // Prioritizes specific Date selection over broad Tab categories.
  const filteredAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Calendar Filter (High Priority)
    if (selectedDate) return appt.date === selectedDate;

    // 2. Tab Category Filters
    if (activeTab === "Upcoming") return apptDate > today;
    if (activeTab === "Past") return apptDate < today;
    if (activeTab === "Today") {
      const apptString = apptDate.toISOString().split("T")[0];
      const todayString = today.toISOString().split("T")[0];
      return apptString === todayString;
    }
    
    // Default: Show all
    return true;
  });

  // --- Mutations ---
  
  /**
   * Updates the status of a specific appointment.
   * Simulates an optimistic UI update for an AppSync Mutation.
   * @param {number} id - The ID of the appointment to update.
   * @param {string} newStatus - The new status (e.g., 'Confirmed', 'Cancelled').
   */
  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  /**
   * Quick-Add feature for demonstration purposes.
   * Uses prompt() to gather minimal data and pushes a new entity to the local state.
   * In production, this would open a Modal Form and trigger a createAppointment mutation.
   */
  const addAppointment = () => {
    // 1. Capture User Input
    const name = window.prompt("Enter Patient Name:");
    if (!name) return;

    const doctor = window.prompt("Enter Doctor Name:", "Dr. Aditi Rao");
    if (!doctor) return;

    const time = window.prompt("Enter Time (e.g., 10:30 AM):", "10:30 AM");
    if (!time) return;

    const type = window.prompt("Type (In-Person or Video Call):", "In-Person");

    // 2. Construct New Entity
    // Note: ID generation uses timestamp to avoid collisions in this mock environment.
    const todayStr = new Date().toISOString().split("T")[0];
    const newAppt = {
      id: Date.now(),
      name: name,
      date: todayStr, // Force date to 'Today' to ensure immediate visibility in the dashboard
      time: time,
      duration: "30 min",
      doctor: doctor,
      type: type || "In-Person",
      status: "Scheduled",
    };

    // 3. Optimistic Update
    setAppointments((prev) => [newAppt, ...prev]);

    // 4. UX Feedback: Reset view to ensure the user sees the new item
    setActiveTab("All");
    alert("New appointment added for Today!");
  };

  // Expose the public API of the hook
  return {
    appointments: filteredAppointments,
    loading,
    activeTab,
    setActiveTab,
    selectedDate,
    setSelectedDate,
    updateStatus,
    addAppointment,
  };
}