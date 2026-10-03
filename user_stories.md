# User Stories

## Admin User Stories

### Admin - Login to Portal

**Title:**  
*As an Admin, I want to log into the portal with my username and password, so that I can manage the platform securely.*

**Acceptance Criteria:**

1. The Admin can enter a username and password.
2. The system validates the Admin's credentials.
3. The Admin is granted access when the credentials are valid.

**Priority:** High  
**Story Points:** 3  
**Notes:**

- Invalid credentials should not allow access to the portal.

### Admin - Logout of Portal

**Title:**  
*As an Admin, I want to log out of the portal, so that I can protect the system from unauthorized access.*

**Acceptance Criteria:**

1. The Admin can select a logout option.
2. The system ends the Admin's authenticated session.
3. The Admin is redirected to the login page.

**Priority:** High  
**Story Points:** 2  
**Notes:**

- Protected pages should not be accessible after logout without logging in again.

### Admin - Add Doctor

**Title:**  
*As an Admin, I want to add doctors to the portal, so that authorized doctors can use the system.*

**Acceptance Criteria:**

1. The Admin can enter the required information for a new doctor.
2. The system validates the doctor's information.
3. The doctor's profile is saved successfully.

**Priority:** High  
**Story Points:** 3  
**Notes:**

- Required doctor information should not be left blank.

### Admin - Delete Doctor

**Title:**  
*As an Admin, I want to delete a doctor's profile from the portal, so that doctors who should no longer have access can be removed.*

**Acceptance Criteria:**

1. The Admin can select an existing doctor.
2. The Admin can request deletion of the doctor's profile.
3. The doctor's profile is removed from the portal.

**Priority:** Medium  
**Story Points:** 3  
**Notes:**

- The system should confirm the deletion to help prevent accidental removal.

### Admin - Monthly Appointment Statistics

**Title:**  
*As an Admin, I want to run a stored procedure in the MySQL CLI to get the number of appointments per month, so that I can track system usage statistics.*

**Acceptance Criteria:**

1. The Admin can execute the stored procedure from the MySQL CLI.
2. The stored procedure calculates the number of appointments for each month.
3. The results display the monthly appointment counts.

**Priority:** Medium  
**Story Points:** 5  
**Notes:**

- The stored procedure uses appointment data stored in MySQL.


## Patient User Stories

### Patient - View Doctors

**Title:**  
*As a Patient, I want to view a list of doctors without logging in, so that I can explore my options before registering.*

**Acceptance Criteria:**

1. The Patient can access the list of doctors without logging in.
2. The system displays available doctors and their basic information.
3. The Patient is not required to create an account to view the doctor list.

**Priority:** Medium  
**Story Points:** 2  
**Notes:**

- Booking an appointment should require authentication.

### Patient - Sign Up

**Title:**  
*As a Patient, I want to sign up using my email and password, so that I can book appointments.*

**Acceptance Criteria:**

1. The Patient can enter an email address and password.
2. The system validates the required registration information.
3. The Patient account is created when valid information is provided.

**Priority:** High  
**Story Points:** 3  
**Notes:**

- The system should not allow multiple accounts with the same email address.

### Patient - Login

**Title:**  
*As a Patient, I want to log into the portal, so that I can manage my bookings.*

**Acceptance Criteria:**

1. The Patient can enter their email and password.
2. The system validates the Patient's credentials.
3. The Patient is granted access when valid credentials are provided.

**Priority:** High  
**Story Points:** 3  
**Notes:**

- Invalid credentials should not allow access to the Patient's account.

### Patient - Logout

**Title:**  
*As a Patient, I want to log out of the portal, so that I can secure my account.*

**Acceptance Criteria:**

1. The Patient can select a logout option.
2. The system ends the Patient's authenticated session.
3. The Patient must log in again to access protected features.

**Priority:** High  
**Story Points:** 2  
**Notes:**

- The Patient should be redirected to the login or home page.

### Patient - Book Appointment

**Title:**  
*As a Patient, I want to log in and book an hour-long appointment, so that I can consult with a doctor.*

**Acceptance Criteria:**

1. The Patient must be logged in to book an appointment.
2. The Patient can select an available doctor and appointment time.
3. The system creates an hour-long appointment for the selected time.

**Priority:** High  
**Story Points:** 5  
**Notes:**

- Only available appointment times should be shown for booking.

### Patient - View Upcoming Appointments

**Title:**  
*As a Patient, I want to view my upcoming appointments, so that I can prepare accordingly.*

**Acceptance Criteria:**

1. The Patient must be logged in to view their appointments.
2. The system displays the Patient's upcoming appointments.
3. Each appointment displays the doctor, date, and time.

**Priority:** Medium  
**Story Points:** 3  
**Notes:**

- Past appointments should not be displayed as upcoming appointments.


## Doctor User Stories

### Doctor - Login

**Title:**  
*As a Doctor, I want to log into the portal, so that I can manage my appointments.*

**Acceptance Criteria:**

1. The Doctor can enter their username and password.
2. The system validates the Doctor's credentials.
3. The Doctor is granted access when valid credentials are provided.

**Priority:** High  
**Story Points:** 3  
**Notes:**

- Invalid credentials should not allow access to the Doctor's account.

### Doctor - Logout

**Title:**  
*As a Doctor, I want to log out of the portal, so that I can protect my data.*

**Acceptance Criteria:**

1. The Doctor can select a logout option.
2. The system ends the Doctor's authenticated session.
3. The Doctor must log in again to access protected features.

**Priority:** High  
**Story Points:** 2  
**Notes:**

- The Doctor should be redirected to the login or home page.

### Doctor - View Appointment Calendar

**Title:**  
*As a Doctor, I want to view my appointment calendar, so that I can stay organized.*

**Acceptance Criteria:**

1. The Doctor can access their appointment calendar after logging in.
2. The calendar displays the Doctor's scheduled appointments.
3. Each appointment displays the relevant date and time.

**Priority:** High  
**Story Points:** 3  
**Notes:**

- The Doctor should only see appointments assigned to them.

### Doctor - Mark Unavailability

**Title:**  
*As a Doctor, I want to mark my unavailability, so that patients can only see and book my available time slots.*

**Acceptance Criteria:**

1. The Doctor can select dates and times when they are unavailable.
2. The system saves the Doctor's unavailable time slots.
3. Patients cannot book appointments during unavailable times.

**Priority:** High  
**Story Points:** 5  
**Notes:**

- Unavailable time slots should not appear as available to Patients.

### Doctor - Update Profile

**Title:**  
*As a Doctor, I want to update my profile with my specialization and contact information, so that patients have up-to-date information.*

**Acceptance Criteria:**

1. The Doctor can edit their specialization and contact information.
2. The system validates and saves the updated information.
3. Patients can see the Doctor's updated profile information.

**Priority:** Medium  
**Story Points:** 3  
**Notes:**

- Required profile information should not be left blank.

### Doctor - View Patient Details

**Title:**  
*As a Doctor, I want to view patient details for my upcoming appointments, so that I can be prepared.*

**Acceptance Criteria:**

1. The Doctor can view patients associated with their upcoming appointments.
2. The system displays relevant Patient details for each appointment.
3. The Doctor can only access Patient details associated with their appointments.

**Priority:** High  
**Story Points:** 5  
**Notes:**

- Patient information should only be accessible to authorized Doctors.
