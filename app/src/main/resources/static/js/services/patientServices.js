// patientServices.js

import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + "/patient";


// For creating a patient in the database
export async function patientSignup(data) {
    try {
        const response = await fetch(PATIENT_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return {
            success: response.ok,
            message: result.message
        };

    } catch (error) {
        console.error("Error :: patientSignup :: ", error);

        return {
            success: false,
            message: error.message
        };
    }
}


// For logging in a patient
export async function patientLogin(data) {
    console.log("patientLogin :: ", data);

    return await fetch(`${PATIENT_API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}


// Get patient data such as name and ID.
// Used when booking appointments.
export async function getPatientData(token) {
    try {
        const response = await fetch(`${PATIENT_API}/${token}`);

        const data = await response.json();

        if (response.ok) {
            return data.patient;
        }

        return null;

    } catch (error) {
        console.error("Error fetching patient details:", error);
        return null;
    }
}


// Fetch patient records/appointments.
// The same backend API is used by the patient and doctor dashboards.
export async function getPatientAppointments(id, token, user) {
    try {
        const response = await fetch(
            `${PATIENT_API}/${id}/${user}/${token}`
        );

        const data = await response.json();

        console.log(data.appointments);

        if (response.ok) {
            return data.appointments;
        }

        return null;

    } catch (error) {
        console.error("Error fetching patient details:", error);
        return null;
    }
}


// Filter appointments
export async function filterAppointments(condition, name, token) {
    try {
        const response = await fetch(
            `${PATIENT_API}/filter/${condition}/${name}/${token}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        }

        console.error(
            "Failed to fetch doctors:",
            response.statusText
        );

        return {
            appointments: []
        };

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");

        return {
            appointments: []
        };
    }
}