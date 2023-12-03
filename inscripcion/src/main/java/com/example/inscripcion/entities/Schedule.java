package com.example.inscripcion.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "schedules")
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Schedule {
    @Id
    private String id_schedule;
    private String day;
    private String start_schedule;
    private String final_schedule;
}
