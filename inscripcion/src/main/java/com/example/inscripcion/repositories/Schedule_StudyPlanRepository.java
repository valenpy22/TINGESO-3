package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Schedule_StudyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Schedule_StudyPlanRepository extends JpaRepository<Schedule_StudyPlan, Integer> {
    @Query(value = "SELECT * FROM schedule_study_plan WHERE id_subject =:id_subject", nativeQuery = true)
    List<Schedule_StudyPlan> getSchedule_StudyPlanById_subject(@Param("id_subject") Integer id_subject);
}
