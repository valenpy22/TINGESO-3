package com.example.inscripcion.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "schedule_study_plan")
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Schedule_StudyPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_schedule_study_plan;
    private Integer id_subject;
    private Integer block;
}
