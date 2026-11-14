// ===============================
// PATIENT REGISTRATION
// ===============================

const patientForm = document.getElementById("patientForm");

if (patientForm) {
    patientForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const patient = {
            name: document.getElementById("name").value,
            age: Number(document.getElementById("age").value),
            gender: document.getElementById("gender").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value
        };

        const response = await fetch("/api/patients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patient)
        });

        if (response.ok) {
            alert("Patient Registered Successfully");
            patientForm.reset();
        }
    });
}


// ===============================
// DOCTOR REGISTRATION
// ===============================

const doctorForm = document.getElementById("doctorForm");
const doctorList = document.getElementById("doctorList");
const appointmentDoctorName =
    document.getElementById("appointmentDoctorName");

async function loadDoctors() {

    const response = await fetch("/api/doctors");

    const doctors = await response.json();

    doctorList.innerHTML = "";

    appointmentDoctorName.innerHTML =
        '<option value="">Select Doctor</option>';

    doctors.forEach(doctor => {

        const div = document.createElement("div");

        div.innerHTML =
            `Dr. ${doctor.name}
             | Specialization: ${doctor.specialization}
             | Phone: ${doctor.phone}
             | Email: ${doctor.email}`;

        doctorList.appendChild(div);

        const option = document.createElement("option");

        option.value = doctor.name;

        option.textContent =
            `Dr. ${doctor.name}`;

        appointmentDoctorName.appendChild(option);
    });
}

if (doctorForm) {

    doctorForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const doctor = {
            name: document.getElementById("doctorName").value,
            specialization: document.getElementById("specialization").value,
            phone: document.getElementById("doctorPhone").value,
            email: document.getElementById("doctorEmail").value
        };

        const response = await fetch("/api/doctors", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(doctor)

        });

        if (response.ok) {

            alert("Doctor Added Successfully");

            doctorForm.reset();

            loadDoctors();
        }
    });
}


// ===============================
// APPOINTMENT BOOKING
// ===============================

const appointmentForm =
    document.getElementById("appointmentForm");

const appointmentList =
    document.getElementById("appointmentList");


async function loadAppointments() {

    const response =
        await fetch("/api/appointments");

    const appointments =
        await response.json();

    appointmentList.innerHTML = "";

    appointments.forEach(appointment => {

        const div =
            document.createElement("div");

        div.innerHTML =

            `Patient: ${appointment.patientName}
            | Doctor: ${appointment.doctorName}
            | Date: ${appointment.appointmentDate}
            | Time: ${appointment.appointmentTime}
            | Status: <b>${appointment.status}</b>

            <button onclick="approveAppointment(${appointment.id})">
                Approve
            </button>

            <button onclick="rejectAppointment(${appointment.id})">
                Reject
            </button>

            <hr>`;

        appointmentList.appendChild(div);
    });
}


if (appointmentForm) {

    appointmentForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const appointment = {

            patientName:
                document.getElementById("appointmentPatientName").value,

            doctorName:
                document.getElementById("appointmentDoctorName").value,

            appointmentDate:
                document.getElementById("appointmentDate").value,

            appointmentTime:
                document.getElementById("appointmentTime").value,

            status: "Pending"
        };

        const response = await fetch("/api/appointments", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(appointment)

        });

        if (response.ok) {

            alert("Appointment Booked Successfully");

            appointmentForm.reset();

            loadAppointments();
        }
    });
}


// ===============================
// APPROVE APPOINTMENT
// ===============================

async function approveAppointment(id) {

    await fetch(
        `/api/appointments/${id}/approve`,
        {
            method: "PUT"
        }
    );

    loadAppointments();
}


// ===============================
// REJECT APPOINTMENT
// ===============================

async function rejectAppointment(id) {

    await fetch(
        `/api/appointments/${id}/reject`,
        {
            method: "PUT"
        }
    );

    loadAppointments();
}


// ===============================
// PAGE LOAD
// ===============================

loadDoctors();
loadAppointments();