package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Prerequisite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrerequisiteRepository extends JpaRepository<Prerequisite, Integer> {
}
