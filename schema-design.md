# Smart Clinic Database Design

## MySQL Database Design

MySQL will store structured and relational data for patients, doctors, appointments, and administrators.

### Table: patients

- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(50), Not Null
- last_name: VARCHAR(50), Not Null
- email: VARCHAR(100), Not Null, Unique
- password: VARCHAR(255), Not Null
- phone: VARCHAR(20)
- date_of_birth: DATE

The email must be unique for each patient. Email and phone formats can be validated by the application.

### Table: doctors

- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(50), Not Null
- last_name: VARCHAR(50), Not Null
- email: VARCHAR(100), Not Null, Unique
- password: VARCHAR(255), Not Null
- phone: VARCHAR(20)
- specialization: VARCHAR(100), Not Null

Each doctor has a unique email address. Doctor availability can be managed by the application to prevent overlapping appointments.

### Table: appointments

- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id), Not Null
- patient_id: INT, Foreign Key → patients(id), Not Null
- appointment_time: DATETIME, Not Null
- status: INT, Not Null (0 = Scheduled, 1 = Completed, 2 = Cancelled)

Each appointment belongs to one doctor and one patient. The application should prevent a doctor from having overlapping appointments.

Past appointments should be retained to preserve patient appointment history. Therefore, deleting a patient should not automatically delete their appointment history.

### Table: admin

- id: INT, Primary Key, Auto Increment
- username: VARCHAR(50), Not Null, Unique
- email: VARCHAR(100), Not Null, Unique
- password: VARCHAR(255), Not Null

Admin usernames and email addresses must be unique. Passwords should be securely stored rather than saved as plain text.


## MongoDB Collection Design

MongoDB will store prescription information because prescriptions can contain flexible and nested data such as multiple medications and dosage instructions.

### Collection: prescriptions

Example document:

```json
{
  "_id": "prescription_1001",
  "patient_id": 101,
  "doctor_id": 25,
  "appointment_id": 5001,
  "date": "2026-10-02",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500 mg",
      "frequency": "3 times daily",
      "duration": "7 days"
    },
    {
      "name": "Ibuprofen",
      "dosage": "200 mg",
      "frequency": "As needed",
      "duration": "5 days"
    }
  ],
  "instructions": {
    "general": "Take medication with food",
    "follow_up_required": true
  }
}