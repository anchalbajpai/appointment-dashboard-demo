// src/services/mockAppointmentService.js
const mockAppointments = [
  {
    id: '1',
    name: 'John Doe',
    date: '2023-12-15',
    time: '10:00',
    duration: 30,
    doctorName: 'Dr. Smith',
    status: 'Scheduled',
    mode: 'In-Person'
  },
  // More mock data will be added here
  ...Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 2),
    name: `Patient ${i + 2}`,
    date: new Date(Date.now() + (Math.floor(Math.random() * 20) - 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: `${9 + Math.floor(Math.random() * 8)}:${Math.random() > 0.5 ? '00' : '30'}`,
    duration: 30,
    doctorName: `Dr. ${['Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'][i % 5]}`,
    status: ['Scheduled', 'Completed', 'Cancelled', 'No-Show'][Math.floor(Math.random() * 4)],
    mode: ['In-Person', 'Virtual'][Math.floor(Math.random() * 2)]
  }))
];
export const getAppointments = async (filters = {}) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let result = [...mockAppointments];
  
  // Apply filters
  if (filters.status) {
    result = result.filter(appt => appt.status === filters.status);
  }
  if (filters.date) {
    result = result.filter(appt => appt.date === filters.date);
  }
  
  return result;
};
export const updateAppointmentStatus = async (appointmentId, newStatus) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const appointment = mockAppointments.find(appt => appt.id === appointmentId);
  if (appointment) {
    const oldStatus = appointment.status;
    appointment.status = newStatus;
    return { success: true, oldStatus, newStatus };
  }
  return { success: false, error: 'Appointment not found' };
};