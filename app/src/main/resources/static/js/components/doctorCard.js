export function createDoctorCard(doctor) {
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    const role = localStorage.getItem("userRole");

    // Doctor information
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("doctor-info");

    const name = document.createElement("h3");
    name.textContent = doctor.name;

    const specialization = document.createElement("p");
    specialization.textContent = doctor.specialty;

    const email = document.createElement("p");
    email.textContent = doctor.email;

    const availability = document.createElement("p");
    availability.textContent = doctor.availableTimes.join(", ");

    infoDiv.appendChild(name);
    infoDiv.appendChild(specialization);
    infoDiv.appendChild(email);
    infoDiv.appendChild(availability);

    // Action buttons
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-actions");

    // ADMIN
    if (role === "admin") {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";

        removeBtn.addEventListener("click", async () => {
            const confirmed = confirm(
                `Are you sure you want to delete ${doctor.name}?`
            );

            if (!confirmed) {
                return;
            }

            const token = localStorage.getItem("token");

            try {
                const success = await deleteDoctor(doctor.id, token);

                if (success) {
                    card.remove();
                }
            } catch (error) {
                console.error("Error deleting doctor:", error);
            }
        });

        actionsDiv.appendChild(removeBtn);
    }

    // PATIENT - NOT LOGGED IN
    else if (role === "patient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";

        bookNow.addEventListener("click", () => {
            alert("Patient needs to login first.");
        });

        actionsDiv.appendChild(bookNow);
    }

    // PATIENT - LOGGED IN
    else if (role === "loggedPatient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "Book Now";

        bookNow.addEventListener("click", async (e) => {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Session expired. Please login again.");
                return;
            }

            try {
                const patientData = await getPatientData(token);

                showBookingOverlay(
                    e,
                    doctor,
                    patientData
                );
            } catch (error) {
                console.error(
                    "Error loading patient data:",
                    error
                );
            }
        });

        actionsDiv.appendChild(bookNow);
    }

    // Assemble card
    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    return card;
}