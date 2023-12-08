package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    Student findByRut(@Param("rut") String rut);

    @Query(value = "SELECT * FROM students WHERE id_career =:id_career", nativeQuery = true)
    List<Student> findStudentsById_career(@Param("id_career") Integer id_career);
}
