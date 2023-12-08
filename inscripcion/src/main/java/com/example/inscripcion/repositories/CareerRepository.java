package com.example.inscripcion.repositories;

import com.example.inscripcion.entities.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerRepository extends JpaRepository<Career, Integer> {

    @Query(value = "SELECT * FROM careers WHERE id_career =:id_career LIMIT 1", nativeQuery = true)
    Career findCareerById_career(@Param("id_career") Integer id_career);

    @Query(value = "SELECT careers.id_career FROM careers WHERE career_name =:career_name", nativeQuery = true)
    Integer findIdCareerByCareerName(@Param("career_name") String career_name);
}
