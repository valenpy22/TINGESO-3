package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Integer> {
}
