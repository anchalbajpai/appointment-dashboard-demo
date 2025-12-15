# appointment_service.py
from typing import Any, Dict, List, Optional

Appointment = Dict[str, Any]

# EXACT MATCH: Data matches the React MOCK_DB
# This ensures your "Backend" and "Frontend" tell the same story.
MOCK_APPOINTMENTS: List[Appointment] = [
    { "id": "1", "name": "Sarah Johnson", "date": "2025-11-06", "time": "09:00 AM", "duration": "30 min", "doctorName": "Dr. Rajesh Kumar", "status": "Confirmed", "mode": "In-Person" },
    { "id": "2", "name": "Michael Chen", "date": "2025-11-06", "time": "10:00 AM", "duration": "45 min", "doctorName": "Dr. Priya Sharma", "status": "Scheduled", "mode": "In-Person" },
    { "id": "3", "name": "Emily Rodriguez", "date": "2025-11-06", "time": "11:30 AM", "duration": "30 min", "doctorName": "Dr. Rajesh Kumar", "status": "Confirmed", "mode": "Video Call" },
    { "id": "4", "name": "John Doe", "date": "2025-11-07", "time": "02:00 PM", "duration": "15 min", "doctorName": "Dr. Priya Sharma", "status": "Upcoming", "mode": "In-Person" },
    { "id": "5", "name": "Alice Cooper", "date": "2025-11-05", "time": "09:30 AM", "duration": "60 min", "doctorName": "Dr. Rajesh Kumar", "status": "Completed", "mode": "Video Call" },
]

def get_appointments(filters: Optional[Dict[str, Any]] = None) -> List[Appointment]:
    """Return appointments matching the frontend mock data."""
    appointment_list = list(MOCK_APPOINTMENTS)

    if not filters:
        return appointment_list

    # Filter implementation (simulating Aurora query)
    if "date" in filters:
        appointment_list = [a for a in appointment_list if a["date"] == filters["date"]]
    
    if "status" in filters:
        appointment_list = [a for a in appointment_list if a["status"].lower() == filters["status"].lower()]

    return appointment_list

def update_appointment_status(appointment_id: str, new_status: str) -> Appointment:
    for appointment in MOCK_APPOINTMENTS:
        if str(appointment["id"]) == str(appointment_id):
            appointment["status"] = new_status
            print(f"[Backend] Updated Appointment {appointment_id} to {new_status}")
            return appointment
    raise ValueError(f"Appointment {appointment_id} not found")

if __name__ == "__main__":
    print("--- SIMULATING AWS LAMBDA APPOINTMENT SERVICE ---")
    print(f"Loaded {len(get_appointments())} mock appointments (Synched with Frontend).")
    
    # Demo 1: List all
    print("\n[Query] get_appointments():")
    for appt in get_appointments():
        print(f" - {appt['date']} | {appt['name']} ({appt['status']})")
        
    # Demo 2: Update status
    print("\n[Mutation] update_appointment_status('2', 'Confirmed'):")
    updated = update_appointment_status("2", "Confirmed")
    print(f" - Result: {updated['name']} is now {updated['status']}")