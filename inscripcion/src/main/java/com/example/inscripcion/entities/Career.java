package com.example.inscripcion.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "careers")
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Career {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id_career;
    private String career_name;
}
