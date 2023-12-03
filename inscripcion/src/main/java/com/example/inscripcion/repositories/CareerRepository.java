package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerRepository extends JpaRepository<Career, Integer> {

    Career findById_career(@Param("id_career") Integer id_career);
}
