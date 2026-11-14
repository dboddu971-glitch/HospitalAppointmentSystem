package com.hospital.controller;

import com.hospital.model.Appointment;
import com.hospital.repository.AppointmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Book Appointment
    @PostMapping
    public Appointment bookAppointment(@RequestBody Appointment appointment) {

        if (appointment.getStatus() == null ||
            appointment.getStatus().isEmpty()) {

            appointment.setStatus("Pending");
        }

        return appointmentRepository.save(appointment);
    }

    // Get All Appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {

        return appointmentRepository.findAll();
    }

    // Approve Appointment
    @PutMapping("/{id}/approve")
    public Appointment approveAppointment(@PathVariable Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Appointment not found"));

        appointment.setStatus("Approved");

        return appointmentRepository.save(appointment);
    }

    // Reject Appointment
    @PutMapping("/{id}/reject")
    public Appointment rejectAppointment(@PathVariable Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Appointment not found"));

        appointment.setStatus("Rejected");

        return appointmentRepository.save(appointment);
    }
}