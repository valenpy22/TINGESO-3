package com.example.inscripcion.controllers;

import com.example.inscripcion.entities.Grade;
import com.example.inscripcion.entities.Prerequisite;
import com.example.inscripcion.entities.Schedule_StudyPlan;
import com.example.inscripcion.entities.StudyPlan;
import com.example.inscripcion.services.StudyPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/study_plans")
public class StudyPlanController {
    @Autowired
    StudyPlanService studyPlanService;

    @PostMapping("/prerequisites")
    public ResponseEntity<List<StudyPlan>> getStudyPlanByIdSubjects(
            @RequestBody List<Prerequisite> prerequisites){
        return ResponseEntity.ok(studyPlanService.getStudyPlanByIdSubjects(prerequisites));
    }

    @PostMapping("/grades")
    public ResponseEntity<List<StudyPlan>> getStudyPlanByGrades(@RequestBody List<Grade> grades){
        return ResponseEntity.ok(studyPlanService.getStudyPlanByGrades(grades));
    }
}
