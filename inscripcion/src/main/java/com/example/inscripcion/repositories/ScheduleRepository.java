package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    @Query(value = "SELECT * FROM schedules WHERE id_subject =:id_subject", nativeQuery = true)
    List<Schedule> getSchedulesByIdSubject(@Param("id_subject") Integer id_subject);
}
