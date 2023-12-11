package com.example.inscripcion.controllers;

import com.example.inscripcion.entities.Grade;
import com.example.inscripcion.entities.StudyPlan;
import com.example.inscripcion.services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/grades")
public class GradeController {
    @Autowired
    GradeService gradeService;

    @GetMapping("/{rut}")
    public ResponseEntity<List<Grade>> getGradesByRut(@PathVariable("rut") String rut){
        return ResponseEntity.ok(gradeService.getGradesByRut(rut));
    }

    @GetMapping("/approved/{rut}")
    public ResponseEntity<List<Grade>> getPassedGradesByRut(@PathVariable("rut") String rut){
        return ResponseEntity.ok(gradeService.getPassedGradesByRut(rut));
    }

    @GetMapping("/failed/{rut}")
    public ResponseEntity<List<Grade>> getFailedGradesByRut(@PathVariable("rut") String rut){
        return ResponseEntity.ok(gradeService.getFailedGradesByRut(rut));
    }

    @PostMapping("/grade/{rut}/{id_subject}")
    public ResponseEntity<Grade> enrollSubject(
            @PathVariable("rut") String rut,
            @PathVariable("id_subject") Integer id_subject){
        return ResponseEntity.ok(gradeService.saveGrade(rut, id_subject));
    }

    @GetMapping("/enrolled/{rut}")
    public ResponseEntity<List<Grade>> getEnrolledGrades(@PathVariable("rut") String rut){
        return ResponseEntity.ok(gradeService.getEnrolledGrades(rut));
    }

    @DeleteMapping("/delete/grade/{rut}/{id_subject}")
    public ResponseEntity<List<Grade>> deleteGradeByRut(
            @PathVariable("rut") String rut, @PathVariable("id_subject") Integer id_subject){
        return ResponseEntity.ok(gradeService.deleteGradeByRut(rut, id_subject));
    }

    @GetMapping("/signedup/{rut}")
    public ResponseEntity<Boolean> isRegularStudent(@PathVariable("rut") String rut){
        return ResponseEntity.ok(gradeService.isRegularStudentByGrades(rut));
    }

    @GetMapping("/enrolled_subjects/{rut}")
    public ResponseEntity<List<StudyPlan>> getEnrolledSubjectsByRut(@PathVariable("rut") String rut){
        return ResponseEntity.ok(gradeService.getEnrolledSubjects(rut));
    }
}
