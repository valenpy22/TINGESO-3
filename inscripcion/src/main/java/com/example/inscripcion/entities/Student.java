package com.example.inscripcion.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "students")
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student {
    @Id
    private String rut;
    private String student_name;
    private String student_lastname;
    private String email;
    private Integer id_career;
}
