package com.example.inscripcion.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "prerequisites")
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Prerequisite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_generated;
    private Integer id_subject;
    private Integer id_prerequisite;
    private String status;
}
