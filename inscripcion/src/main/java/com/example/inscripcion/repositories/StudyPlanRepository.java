package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.StudyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyPlanRepository extends JpaRepository<StudyPlan, Integer> {
    @Query(value = "SELECT * FROM studyplans WHERE id_subject =:id_subject LIMIT 1", nativeQuery = true)
    StudyPlan getStudyPlanById_subject(@Param("id_subject") Integer id_subject);

    @Query(value = "SELECT studyplans.level FROM studyplans " +
            "WHERE studyplans.id_subject =:id_subject", nativeQuery = true)
    Integer getStudyPlanLevelById_Subject(@Param("id_subject") Integer id_subject);


    @Query(value = "SELECT COUNT(*) FROM studyplans WHERE level =:level" +
            "AND studyplans.id_career =:id_career", nativeQuery = true)
    Integer countByLevelAndAndId_career(@Param("level") Integer level, @Param("id_career") Integer id_career);
}
