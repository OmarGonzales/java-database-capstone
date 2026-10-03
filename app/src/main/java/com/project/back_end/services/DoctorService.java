package com.project.back_end.services;

import com.project.back_end.DTO.Login;
import com.project.back_end.models.Appointment;
import com.project.back_end.models.Doctor;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.DoctorRepository;

import jakarta.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final TokenService tokenService;

    public DoctorService(
            DoctorRepository doctorRepository,
            AppointmentRepository appointmentRepository,
            TokenService tokenService) {

        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.tokenService = tokenService;
    }

    @Transactional
    public List<String> getDoctorAvailability(Long doctorId, LocalDate date) {

        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);

        if (doctor == null) {
            return new ArrayList<>();
        }

        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(LocalTime.MAX);

        List<Appointment> appointments =
                appointmentRepository.findByDoctorIdAndAppointmentTimeBetween(
                        doctorId, start, end);

        List<String> bookedTimes = appointments.stream()
                .map(a -> a.getAppointmentTime().toLocalTime().toString())
                .toList();

        return doctor.getAvailableTimes().stream()
                .filter(time -> !bookedTimes.contains(time))
                .toList();
    }

    public int saveDoctor(Doctor doctor) {
        try {
            Doctor existingDoctor = doctorRepository.findByEmail(doctor.getEmail());

            if (existingDoctor != null) {
                return -1;
            }

            doctorRepository.save(doctor);
            return 1;

        } catch (Exception e) {
            return 0;
        }
    }

    public int updateDoctor(Doctor doctor) {
        try {
            if (!doctorRepository.existsById(doctor.getId())) {
                return -1;
            }

            doctorRepository.save(doctor);
            return 1;

        } catch (Exception e) {
            return 0;
        }
    }

    @Transactional
    public List<Doctor> getDoctors() {

        List<Doctor> doctors = doctorRepository.findAll();

        for (Doctor doctor : doctors) {
            doctor.getAvailableTimes().size();
        }

        return doctors;
    }

    @Transactional
    public int deleteDoctor(long id) {
        try {
            if (!doctorRepository.existsById(id)) {
                return -1;
            }

            appointmentRepository.deleteAllByDoctorId(id);
            doctorRepository.deleteById(id);

            return 1;

        } catch (Exception e) {
            return 0;
        }
    }

    public ResponseEntity<Map<String, String>> validateDoctor(Login login) {

        Map<String, String> response = new HashMap<>();

        Doctor doctor =
                doctorRepository.findByEmail(login.getIdentifier());

        if (doctor == null ||
                !doctor.getPassword().equals(login.getPassword())) {

            response.put("message", "Invalid email or password");
            return ResponseEntity.badRequest().body(response);
        }

        String token =
        tokenService.generateToken(doctor.getEmail());

        response.put("token", token);
        response.put("message", "Login successful");

        return ResponseEntity.ok(response);
    }

    @Transactional
    public Map<String, Object> findDoctorByName(String name) {

        List<Doctor> doctors = doctorRepository.findByNameLike(name);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);

        return response;
    }

    @Transactional
    public Map<String, Object> filterDoctorsByNameSpecilityandTime(
            String name,
            String specialty,
            String amOrPm) {

        List<Doctor> doctors =
                doctorRepository
                        .findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(
                                name, specialty);

        doctors = filterDoctorByTime(doctors, amOrPm);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);

        return response;
    }

    @Transactional
    public Map<String, Object> filterDoctorByNameAndTime(
            String name,
            String amOrPm) {

        List<Doctor> doctors = doctorRepository.findByNameLike(name);

        doctors = filterDoctorByTime(doctors, amOrPm);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);

        return response;
    }

    @Transactional
    public Map<String, Object> filterDoctorByNameAndSpecility(
            String name,
            String specilty) {

        List<Doctor> doctors =
                doctorRepository
                        .findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(
                                name, specilty);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);

        return response;
    }

    @Transactional
    public Map<String, Object> filterDoctorByTimeAndSpecility(
            String specilty,
            String amOrPm) {

        List<Doctor> doctors =
                doctorRepository.findBySpecialtyIgnoreCase(specilty);

        doctors = filterDoctorByTime(doctors, amOrPm);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);

        return response;
    }

    @Transactional
    public Map<String, Object> filterDoctorBySpecility(String specilty) {

        List<Doctor> doctors =
                doctorRepository.findBySpecialtyIgnoreCase(specilty);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);

        return response;
    }

    @Transactional
    public Map<String, Object> filterDoctorsByTime(String amOrPm) {

        List<Doctor> doctors = doctorRepository.findAll();

        doctors = filterDoctorByTime(doctors, amOrPm);

        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors);

        return response;
    }

    private List<Doctor> filterDoctorByTime(
        List<Doctor> doctors,
        String timeFilter) {

    return doctors.stream()
            .filter(doctor ->
                    doctor.getAvailableTimes().stream()
                            .anyMatch(time -> {

                                // Exact time-range filter, e.g. 09:00-10:00
                                if (!"AM".equalsIgnoreCase(timeFilter)
                                        && !"PM".equalsIgnoreCase(timeFilter)) {
                                    return time.equals(timeFilter);
                                }

                                // Extract starting time from a range
                                // e.g. "09:00-10:00" -> "09:00"
                                String startTime = time.split("-")[0];
                                LocalTime localTime = LocalTime.parse(startTime);

                                if ("AM".equalsIgnoreCase(timeFilter)) {
                                    return localTime.isBefore(LocalTime.NOON);
                                }

                                return !localTime.isBefore(LocalTime.NOON);
                            }))
            .toList();
}
}