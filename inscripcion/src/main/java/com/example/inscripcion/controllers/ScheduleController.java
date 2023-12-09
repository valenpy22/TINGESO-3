package com.example.inscripcion.controllers;

import com.example.inscripcion.entities.Schedule;
import com.example.inscripcion.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/schedules")
public class ScheduleController {
    @Autowired
    ScheduleService scheduleService;


}
