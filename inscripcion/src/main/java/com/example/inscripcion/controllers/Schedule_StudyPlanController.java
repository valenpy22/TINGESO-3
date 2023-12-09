package com.example.inscripcion.controllers;

import com.example.inscripcion.entities.Prerequisite;
import com.example.inscripcion.entities.Schedule_StudyPlan;
import com.example.inscripcion.services.Schedule_StudyPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/schedules_studyplan")
public class Schedule_StudyPlanController {
    @Autowired
    Schedule_StudyPlanService scheduleStudyPlanService;

    @PostMapping
    public ResponseEntity<List<Schedule_StudyPlan>> saveSchedules(@RequestBody List<Schedule_StudyPlan> scheduleStudyPlans){
        return ResponseEntity.ok(scheduleStudyPlanService.saveSchedules(scheduleStudyPlans));
    }

    @GetMapping("/{id_subject}")
    public ResponseEntity<List<Schedule_StudyPlan>> getSchedulesByIdSubject(@PathVariable("id_subject") Integer id_subject){
        return ResponseEntity.ok(scheduleStudyPlanService.getSchedulesByIdSubject(id_subject));
    }

    @DeleteMapping("/{id_subject}")
    public ResponseEntity<List<Schedule_StudyPlan>> deleteSchedulesByIdSubject(
            @PathVariable("id_subject") Integer id_subject){
        return ResponseEntity.ok(scheduleStudyPlanService.deleteAllSchedulesByIdSubject(id_subject));
    }
}
