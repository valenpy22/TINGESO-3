package com.example.inscripcion.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    private Integer id_career;
    private String career_name;
}
