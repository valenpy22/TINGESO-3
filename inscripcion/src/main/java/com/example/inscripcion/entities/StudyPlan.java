package com.example.inscripcion.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "studyplans")
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class StudyPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_plan;
    private Integer id_career;
    private String id_study_plan;
    private Integer level;
    private Integer id_subject;
    private String subject_name;
}
