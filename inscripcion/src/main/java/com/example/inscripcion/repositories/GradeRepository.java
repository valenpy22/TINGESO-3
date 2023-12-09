package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Grade;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Integer> {
    List<Grade> getGradesByRut(String rut);

    List<Grade> getGradesByRutAndSemesterAndYear(
            String rut,
            Integer semester,
            Integer year);

    @Query(value = "SELECT MAX(grades.level) FROM grades WHERE grades.rut =:rut", nativeQuery = true)
    Integer getMaxLevelByRut(@Param("rut") String rut);

    @Query(value = "SELECT * FROM grades WHERE grades.rut =:rut AND grades.status='Inscrita'", nativeQuery = true)
    List<Grade> getEnrolledGrades(@Param("rut") String rut);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO grades (grade, id_subject, semester, year, rut, status) VALUES (?1, ?2, ?3, ?4, ?5, ?6)", nativeQuery = true)
    void saveGrade(Double grade, Integer id_subject, Integer semester, Integer year, String rut, String status);
}
