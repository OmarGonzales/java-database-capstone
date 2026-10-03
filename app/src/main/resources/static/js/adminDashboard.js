import { openModal } from "./components/modals.js";
import {
    getDoctors,
    filterDoctors,
    saveDoctor
} from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";


// Open the Add Doctor modal
document.getElementById("addDocBtn")?.addEventListener("click", () => {
    openModal("addDoctor");
});


// Load doctors when the page is ready
document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();

    document
        .getElementById("searchBar")
        ?.addEventListener("input", filterDoctorsOnChange);

    document
        .getElementById("filterTime")
        ?.addEventListener("change", filterDoctorsOnChange);

    document
        .getElementById("filterSpecialty")
        ?.addEventListener("change", filterDoctorsOnChange);
});


// Fetch and display all doctors
async function loadDoctorCards() {
    try {
        const doctors = await getDoctors();

        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = "";

        doctors.forEach((doctor) => {
            const card = createDoctorCard(doctor);
            contentDiv.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading doctors:", error);
    }
}


// Filter doctors when search/filter values change
async function filterDoctorsOnChange() {
    try {
        let name = document.getElementById("searchBar").value;
        let time = document.getElementById("filterTime").value;
        let specialty = document.getElementById("filterSpecialty").value;

        // Normalize empty values
        name = name || null;
        time = time || null;
        specialty = specialty || null;

        const result = await filterDoctors(
            name,
            time,
            specialty
        );

        const doctors = result.doctors || [];

        if (doctors.length > 0) {
            renderDoctorCards(doctors);
        } else {
            const contentDiv = document.getElementById("content");

            contentDiv.innerHTML =
                "<p>No doctors found with the given filters.</p>";
        }

    } catch (error) {
        console.error("Error filtering doctors:", error);
        alert("Something went wrong!");
    }
}


// Render a supplied list of doctors
function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");

    contentDiv.innerHTML = "";

    doctors.forEach((doctor) => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
    });
}


// Add a new doctor
window.adminAddDoctor = async function () {
    const name = document.getElementById("name").value;
    const specialty = document.getElementById("specialty").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    const availableTimes = Array.from(
        document.querySelectorAll(
            'input[type="checkbox"]:checked'
        )
    ).map((checkbox) => checkbox.value);

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Authentication token not found.");
        return;
    }

    const doctor = {
        name,
        specialty,
        email,
        password,
        phone,
        availableTimes
    };

    try {
        const result = await saveDoctor(doctor, token);

        if (result.success) {
            alert(result.message);

            // Reload dashboard to display the new doctor
            window.location.reload();
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Error adding doctor:", error);
        alert("Something went wrong!");
    }
};