// src/services/appointmentApi.js
import { format, addDays, isToday, isFuture, isPast, parseISO } from "date-fns";

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data that matches the Python backend structure
const mockAppointments = [
  {
    id: 1,
    patient_name: "John Doe",
    appointment_date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    appointment_time: "09:00 AM",
    duration: 30,
    doctor_name: "Dr. Smith",
    status: "Scheduled",
    mode: "In-Person",
    reason: "Routine Checkup",
  },
  {
    id: 2,
    patient_name: "Jane Smith",
    appointment_date: format(new Date(), "yyyy-MM-dd"),
    appointment_time: "02:30 PM",
    duration: 45,
    doctor_name: "Dr. Johnson",
    status: "Confirmed",
    mode: "Video",
    reason: "Follow-up Consultation",
  },
  // Add more mock appointments as needed
];

// Simulate API calls
export const appointmentApi = {
  // Get appointments with optional filtering
  async getAppointments({ date, status, mode } = {}) {
    await delay(300); // Simulate network delay

    let filtered = [...mockAppointments];

    // Apply filters if provided
    if (date) {
      filtered = filtered.filter((apt) => apt.appointment_date === date);
    }

    if (status) {
      filtered = filtered.filter((apt) => apt.status === status);
    }

    if (mode) {
      filtered = filtered.filter((apt) => apt.mode === mode);
    }

    // Categorize appointments
    const today = format(new Date(), "yyyy-MM-dd");
    const categorized = {
      today: filtered.filter((apt) => apt.appointment_date === today),
      upcoming: filtered.filter(
        (apt) => new Date(apt.appointment_date) > new Date(today)
      ),
      past: filtered.filter(
        (apt) => new Date(apt.appointment_date) < new Date(today)
      ),
    };

    return {
      appointments: filtered,
      ...categorized,
    };
  },

  // Update appointment status
  // In appointmentApi.js, update the updateAppointmentStatus function
  async updateAppointmentStatus(appointmentId, newStatus) {
    await delay(300); // Simulate network delay

    const appointment = mockAppointments.find(
      (apt) => apt.id === appointmentId
    );
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    // Validate status
    const validStatuses = ["Scheduled", "Confirmed", "Cancelled", "Completed"];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    // Update the status
    appointment.status = newStatus;

    // Return the updated appointment
    return { ...appointment };
  },

  // Get appointment statistics
  async getAppointmentStats() {
    await delay(200); // Simulate network delay

    const today = format(new Date(), "yyyy-MM-dd");
    const upcoming = mockAppointments.filter(
      (apt) => new Date(apt.appointment_date) > new Date(today)
    );
    const videoAppointments = mockAppointments.filter(
      (apt) => apt.mode === "Video"
    );

    return {
      total: mockAppointments.length,
      today: mockAppointments.filter((apt) => apt.appointment_date === today)
        .length,
      upcoming: upcoming.length,
      video: videoAppointments.length,
    };
  },
};

export default appointmentApi;
