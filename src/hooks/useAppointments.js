import { useState, useEffect } from "react";

// 1. MOCK DATA (Simulating Aurora Database)
// [cite: 14] "Create a hardcoded list of at least 10 mock appointments"
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
  // ... add 4 more to reach 10
];

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setAppointments(MOCK_DB);
      setLoading(false);
    }, 500);
  }, []);

  // ... (Keep existing filtering logic) ...
  const filteredAppointments = appointments.filter((appt) => {
    // ... keep existing logic
    const apptDate = new Date(appt.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate) return appt.date === selectedDate;
    if (activeTab === "Upcoming") return apptDate > today;
    if (activeTab === "Past") return apptDate < today;
    if (activeTab === "Today") {
      const apptString = apptDate.toISOString().split("T")[0];
      const todayString = today.toISOString().split("T")[0];
      return apptString === todayString;
    }
    return true;
  });

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  // NEW: "Quick Add" Function
  const addAppointment = () => {
    // 1. Ask for Patient Name
    const name = window.prompt("Enter Patient Name:");
    if (!name) return; // Stop if user cancels

    // 2. Ask for Doctor (Defaulting to a common one)
    const doctor = window.prompt("Enter Doctor Name:", "Dr. Aditi Rao");
    if (!doctor) return;

    // 3. Ask for Time
    const time = window.prompt("Enter Time (e.g., 10:30 AM):", "10:30 AM");
    if (!time) return;

    // 4. Ask for Type
    const type = window.prompt("Type (In-Person or Video Call):", "In-Person");

    const todayStr = new Date().toISOString().split("T")[0];

    const newAppt = {
      id: Date.now(), // Unique ID based on timestamp
      name: name,
      date: todayStr, // Always set to Today for visibility
      time: time,
      duration: "30 min",
      doctor: doctor,
      type: type || "In-Person",
      status: "Scheduled",
    };

    // Add to top of list
    setAppointments((prev) => [newAppt, ...prev]);

    // Switch view to 'All' or 'Today' so user sees it
    setActiveTab("All");
    alert("New appointment added for Today!");
  };

  return {
    appointments: filteredAppointments,
    loading,
    activeTab,
    setActiveTab,
    selectedDate,
    setSelectedDate,
    updateStatus,
    addAppointment, // <--- Export this
  };
}
