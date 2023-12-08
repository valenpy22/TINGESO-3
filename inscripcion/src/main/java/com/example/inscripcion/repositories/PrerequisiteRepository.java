package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Prerequisite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrerequisiteRepository extends JpaRepository<Prerequisite, Integer> {

    @Query(value = "SELECT * FROM prerequisites WHERE id_subject =:id_subject", nativeQuery = true)
    List<Prerequisite> findById_subject(@Param("id_subject") Integer id_subject);

    @Query(value = "SELECT * FROM prerequisites WHERE id_prerequisite =:id_prerequisite", nativeQuery = true)
    List<Prerequisite> getAllowedSubjectsById_prerequisite(@Param("id_prerequisite") Integer id_prerequisite);
}
