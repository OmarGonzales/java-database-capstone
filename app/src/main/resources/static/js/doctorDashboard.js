import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";


// Table body where appointment rows will be displayed
const patientTableBody = document.getElementById("patientTableBody");

// Today's date in YYYY-MM-DD format
let selectedDate = new Date().toISOString().split("T")[0];

// Doctor authentication token
const token = localStorage.getItem("token");

// Patient name used for filtering
let patientName = null;


// Search appointments by patient name
document.getElementById("searchBar")?.addEventListener("input", (event) => {
    const searchValue = event.target.value.trim();

    patientName = searchValue !== "" ? searchValue : "null";

    loadAppointments();
});


// Show today's appointments
document.getElementById("todayButton")?.addEventListener("click", () => {
    selectedDate = new Date().toISOString().split("T")[0];

    document.getElementById("datePicker").value = selectedDate;

    loadAppointments();
});


// Show appointments for selected date
document.getElementById("datePicker")?.addEventListener("change", (event) => {
    selectedDate = event.target.value;

    loadAppointments();
});


// Fetch and display appointments
async function loadAppointments() {
    try {
        const appointments = await getAllAppointments(
            selectedDate,
            patientName,
            token
        );

        // Clear existing rows
        patientTableBody.innerHTML = "";

        // No appointments found
        if (!appointments || appointments.length === 0) {
            patientTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="noPatientRecord">
                        No Appointments found for today.
                    </td>
                </tr>
            `;

            return;
        }

        // Create a row for every appointment
        appointments.forEach((appointment) => {
            const patient = {
                id: appointment.patient.id,
                name: appointment.patient.name,
                phone: appointment.patient.phone,
                email: appointment.patient.email
            };

            const row = createPatientRow(patient, appointment);

            patientTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading appointments:", error);

        patientTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="noPatientRecord">
                    Error loading appointments. Try again later.
                </td>
            </tr>
        `;
    }
}


// Initial page load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("datePicker").value = selectedDate;

    renderContent();
    loadAppointments();
});