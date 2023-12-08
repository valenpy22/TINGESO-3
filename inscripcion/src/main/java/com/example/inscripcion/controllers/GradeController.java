package com.example.inscripcion.controllers;

import com.example.inscripcion.entities.Grade;
import com.example.inscripcion.services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
