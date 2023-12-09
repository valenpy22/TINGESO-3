package com.example.inscripcion.services;

import com.example.inscripcion.entities.Schedule;
import com.example.inscripcion.repositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {
    @Autowired
    ScheduleRepository scheduleRepository;

}
