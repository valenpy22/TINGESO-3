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
    private Integer id_schedule;
    private String day;
    private Integer start_schedule;
    private Integer final_schedule;
}
