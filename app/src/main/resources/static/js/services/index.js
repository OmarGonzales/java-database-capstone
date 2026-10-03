import { openModal } from "../components/modals.js";
import { API_BASE_URL } from "../config/config.js";

const ADMIN_API = API_BASE_URL + "/admin";
const DOCTOR_API = API_BASE_URL + "/doctor/login";


// Set up Admin and Doctor login buttons
window.onload = function () {
    const adminBtn = document.getElementById("adminLogin");
    const doctorBtn = document.getElementById("doctorLogin");

    if (adminBtn) {
        adminBtn.addEventListener("click", () => {
            openModal("adminLogin");
        });
    }

    if (doctorBtn) {
        doctorBtn.addEventListener("click", () => {
            openModal("doctorLogin");
        });
    }
};


// Admin login
window.adminLoginHandler = async function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const admin = {
        username,
        password
    };

    try {
        const response = await fetch(ADMIN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(admin)
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("token", data.token);
            selectRole("admin");
        } else {
            alert("Invalid credentials!");
        }

    } catch (error) {
        alert("An unexpected error occurred.");
        console.error(error);
    }
};


// Doctor login
window.doctorLoginHandler = async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const doctor = {
        email,
        password
    };

    try {
        const response = await fetch(DOCTOR_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(doctor)
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("token", data.token);
            selectRole("doctor");
        } else {
            alert("Invalid credentials!");
        }

    } catch (error) {
        alert("An unexpected error occurred.");
        console.error(error);
    }
};