// header.js

function renderHeader() {

    // If we are on the homepage, clear the previous session.
    if (window.location.pathname.endsWith("/")) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    const headerDiv = document.getElementById("header");

    // Some pages may not contain a header placeholder.
    if (!headerDiv) {
        return;
    }

    // Validate logged-in users.
    if (
        (role === "loggedPatient" ||
         role === "admin" ||
         role === "doctor") &&
        !token
    ) {
        localStorage.removeItem("userRole");

        alert("Session expired or invalid login. Please log in again.");

        window.location.href = "/";
        return;
    }

    let headerContent = "";

    // Admin header
    if (role === "admin") {
        headerContent += `
            <button
                id="addDocBtn"
                class="adminBtn"
                onclick="openModal('addDoctor')">
                Add Doctor
            </button>

            <a href="#" id="logoutBtn">Logout</a>
        `;
    }

    // Doctor header
    else if (role === "doctor") {
        headerContent += `
            <a href="#" id="homeBtn">Home</a>
            <a href="#" id="logoutBtn">Logout</a>
        `;
    }

    // Patient who has not logged in
    else if (role === "patient") {
        headerContent += `
            <button id="patientLoginBtn">Login</button>
            <button id="patientSignupBtn">Sign Up</button>
        `;
    }

    // Logged-in patient
    else if (role === "loggedPatient") {
        headerContent += `
            <a href="#" id="patientHomeBtn">Home</a>
            <a href="#" id="appointmentsBtn">Appointments</a>
            <a href="#" id="patientLogoutBtn">Logout</a>
        `;
    }

    // Insert generated HTML into the header.
    headerDiv.innerHTML = headerContent;

    // Elements now exist, so listeners can be attached.
    attachHeaderButtonListeners();
}


function attachHeaderButtonListeners() {

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (event) {
            event.preventDefault();
            logout();
        });
    }

    const patientLogoutBtn =
        document.getElementById("patientLogoutBtn");

    if (patientLogoutBtn) {
        patientLogoutBtn.addEventListener("click", function (event) {
            event.preventDefault();
            logoutPatient();
        });
    }

    const patientLoginBtn =
        document.getElementById("patientLoginBtn");

    if (patientLoginBtn) {
        patientLoginBtn.addEventListener("click", function () {
            openModal("patientLogin");
        });
    }

    const patientSignupBtn =
        document.getElementById("patientSignupBtn");

    if (patientSignupBtn) {
        patientSignupBtn.addEventListener("click", function () {
            openModal("patientSignup");
        });
    }
}


function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    window.location.href = "/";
}


function logoutPatient() {

    localStorage.removeItem("token");

    // Patient remains a patient, but is no longer logged in.
    localStorage.setItem("userRole", "patient");

    window.location.href = "/pages/patientDashboard.html";
}


// Render header when this script loads.
renderHeader();