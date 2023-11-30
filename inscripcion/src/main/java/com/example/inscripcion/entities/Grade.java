package com.example.inscripcion.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "grades")
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_grade;
    private Integer year;
    private Integer semester;
    private String rut;
    private Integer level;
    private Integer id_subject;
    private Float grade;
}
