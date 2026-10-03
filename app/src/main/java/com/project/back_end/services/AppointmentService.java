package com.project.back_end.services;

import com.project.back_end.DTO.AppointmentDTO;
import com.project.back_end.models.Appointment;
import com.project.back_end.models.Doctor;
import com.project.back_end.models.Patient;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.DoctorRepository;
import com.project.back_end.repo.PatientRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
     private final com.project.back_end.services.Service service;
    private final TokenService tokenService;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            com.project.back_end.services.Service service,
            TokenService tokenService,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository) {

        this.appointmentRepository = appointmentRepository;
        this.service = service;
        this.tokenService = tokenService;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @Transactional
    public int bookAppointment(Appointment appointment) {
        try {
            appointmentRepository.save(appointment);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    @Transactional
    public ResponseEntity<Map<String, String>> updateAppointment(
            Appointment appointment) {

        Map<String, String> response = new HashMap<>();

        if (appointment.getId() == null ||
                !appointmentRepository.existsById(appointment.getId())) {

            response.put("message", "Appointment not found");

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(response);
        }

        int validation = service.validateAppointment(appointment);

        if (validation == -1) {
            response.put("message", "Doctor not found");

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(response);
        }

        if (validation == 0) {
            response.put("message", "Appointment time is not available");

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(response);
        }

        try {
            appointmentRepository.save(appointment);

            response.put("message", "Appointment updated successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Some internal error occurred");

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }
    }

    @Transactional
    public ResponseEntity<Map<String, String>> cancelAppointment(
            long id, String token) {

        Map<String, String> response = new HashMap<>();

        Appointment appointment =
                appointmentRepository.findById(id).orElse(null);

        if (appointment == null) {
            response.put("message", "Appointment not found");

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(response);
        }

        String email = tokenService.extractIdentifier(token);

        Patient patient = patientRepository.findByEmail(email);

        if (patient == null ||
                appointment.getPatient() == null ||
                !appointment.getPatient().getId().equals(patient.getId())) {

            response.put("message", "Unauthorized");

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        try {
            appointmentRepository.delete(appointment);

            response.put(
                    "message",
                    "Appointment cancelled successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put(
                    "message",
                    "Some internal error occurred");

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }
    }

    public Map<String, Object> getAppointment(
            String patientName,
            LocalDate date,
            String token) {

        Map<String, Object> response = new HashMap<>();

        String email = tokenService.extractIdentifier(token);

        Doctor doctor = doctorRepository.findByEmail(email);

        if (doctor == null) {
            response.put("appointments", new ArrayList<>());
            return response;
        }

        LocalDateTime start =
                date.atStartOfDay();

        LocalDateTime end =
                date.atTime(LocalTime.MAX);

        List<Appointment> appointments;

        if (patientName == null ||
                patientName.isBlank() ||
                patientName.equalsIgnoreCase("null")) {

            appointments =
                    appointmentRepository
                            .findByDoctorIdAndAppointmentTimeBetween(
                                    doctor.getId(),
                                    start,
                                    end);

        } else {

            appointments =
                    appointmentRepository
                            .findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween(
                                    doctor.getId(),
                                    patientName,
                                    start,
                                    end);
        }

        List<AppointmentDTO> appointmentDTOs =
                new ArrayList<>();

        for (Appointment appointment : appointments) {

            appointmentDTOs.add(
                    new AppointmentDTO(
                            appointment.getId(),
                            appointment.getDoctor().getId(),
                            appointment.getDoctor().getName(),
                            appointment.getPatient().getId(),
                            appointment.getPatient().getName(),
                            appointment.getPatient().getEmail(),
                            appointment.getPatient().getPhone(),
                            appointment.getPatient().getAddress(),
                            appointment.getAppointmentTime(),
                            appointment.getStatus()));
        }

        response.put("appointments", appointmentDTOs);

        return response;
    }

    @Transactional
    public void changeStatus(int status, long id) {
        appointmentRepository.updateStatus(status, id);
    }
}