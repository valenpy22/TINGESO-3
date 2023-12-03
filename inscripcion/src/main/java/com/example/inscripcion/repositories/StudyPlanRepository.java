package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.StudyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyPlanRepository extends JpaRepository<StudyPlan, Integer> {
    StudyPlan getStudyPlanById_subject(@Param("id_subject") Integer id_subject);
}
