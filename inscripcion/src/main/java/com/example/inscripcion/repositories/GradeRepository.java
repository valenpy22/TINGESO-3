package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
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

}
