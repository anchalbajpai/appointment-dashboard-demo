# appointment_service.py
from typing import Any, Dict, List, Optional

# Type alias for clarity in function signatures
Appointment = Dict[str, Any]

# --- Data Layer Simulation ---
# In a production architecture (AWS AppSync + Lambda + Aurora), this data would
# reside in a PostgreSQL database. We use this in-memory list to simulate
# the persistence layer and ensure strict parity with the frontend mock data.
MOCK_APPOINTMENTS: List[Appointment] = [
    { "id": "1", "name": "Sarah Johnson", "date": "2025-11-06", "time": "09:00 AM", "duration": "30 min", "doctorName": "Dr. Rajesh Kumar", "status": "Confirmed", "mode": "In-Person" },
    { "id": "2", "name": "Michael Chen", "date": "2025-11-06", "time": "10:00 AM", "duration": "45 min", "doctorName": "Dr. Priya Sharma", "status": "Scheduled", "mode": "In-Person" },
    { "id": "3", "name": "Emily Rodriguez", "date": "2025-11-06", "time": "11:30 AM", "duration": "30 min", "doctorName": "Dr. Rajesh Kumar", "status": "Confirmed", "mode": "Video Call" },
    { "id": "4", "name": "John Doe", "date": "2025-11-07", "time": "02:00 PM", "duration": "15 min", "doctorName": "Dr. Priya Sharma", "status": "Upcoming", "mode": "In-Person" },
    { "id": "5", "name": "Alice Cooper", "date": "2025-11-05", "time": "09:30 AM", "duration": "60 min", "doctorName": "Dr. Rajesh Kumar", "status": "Completed", "mode": "Video Call" },
]

def get_appointments(filters: Optional[Dict[str, Any]] = None) -> List[Appointment]:
    """
    Simulates the 'getAppointments' Query Resolver.

    In a real AWS environment:
    1. AppSync receives the GraphQL query.
    2. Mapping templates pass arguments to this Lambda.
    3. This function constructs a SQL query (SELECT * FROM appointments WHERE...)
       and executes it against Aurora Serverless.

    Args:
        filters: Optional dictionary containing 'date' or 'status' to filter results.

    Returns:
        List of appointment dictionaries.
    """
    # Start with the full dataset
    appointment_list = list(MOCK_APPOINTMENTS)

    if not filters:
        return appointment_list

    # Apply Filters (Simulating SQL WHERE clauses)
    if "date" in filters:
        appointment_list = [a for a in appointment_list if a["date"] == filters["date"]]

    if "status" in filters:
        # Case-insensitive comparison for robustness
        appointment_list = [
            a for a in appointment_list 
            if a["status"].lower() == filters["status"].lower()
        ]

    return appointment_list

def update_appointment_status(appointment_id: str, new_status: str) -> Appointment:
    """
    Simulates the 'updateStatus' Mutation Resolver.

    Architecture Note:
    1. **Transactional Write:** In production, this performs an `UPDATE` SQL statement
       on the Aurora database within a transaction block.
    2. **Real-time Sync:** Upon successful update, AppSync triggers a Subscription 
       (e.g., `onUpdateAppointment`) to push this change to all connected clients 
       via WebSockets.

    Args:
        appointment_id: The unique ID of the appointment.
        new_status: The new status string (e.g., 'Confirmed', 'Cancelled').

    Returns:
        The updated appointment object.

    Raises:
        ValueError: If the appointment ID does not exist.
    """
    for appointment in MOCK_APPOINTMENTS:
        # Ensure type safety when comparing IDs (string vs int from JSON)
        if str(appointment["id"]) == str(appointment_id):
            appointment["status"] = new_status
            print(f"[Backend] Transaction Committed: Appointment {appointment_id} -> {new_status}")
            return appointment

    # Simulate a 404 or GraphQL Error
    raise ValueError(f"Appointment {appointment_id} not found")

if __name__ == "__main__":
    print("--- SIMULATING AWS LAMBDA APPOINTMENT SERVICE ---")
    print(f"Loaded {len(get_appointments())} mock appointments.")
    
    # Test Case 1: Read
    print("\n[Query] Fetching all appointments...")
    for appt in get_appointments():
        print(f" - {appt['date']} | {appt['name']} ({appt['status']})")
        
    # Test Case 2: Write
    print("\n[Mutation] Updating Appointment 2 to 'Confirmed'...")
    try:
        updated = update_appointment_status("2", "Confirmed")
        print(f" - Success: {updated['name']} is now {updated['status']}")
    except ValueError as e:
        print(f" - Error: {e}")