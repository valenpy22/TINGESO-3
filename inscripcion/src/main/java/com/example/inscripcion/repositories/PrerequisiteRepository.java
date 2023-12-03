package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Prerequisite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrerequisiteRepository extends JpaRepository<Prerequisite, Integer> {

    List<Prerequisite> findById_subject(@Param("id_subject") Integer id_subject);

}
