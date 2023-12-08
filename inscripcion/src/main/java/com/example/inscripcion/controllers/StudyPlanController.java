package com.example.inscripcion.controllers;

import com.example.inscripcion.services.StudyPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class StudyPlanController {
    @Autowired
    StudyPlanService studyPlanService;
}
