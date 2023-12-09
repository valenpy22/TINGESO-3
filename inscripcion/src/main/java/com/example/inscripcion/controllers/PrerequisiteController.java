package com.example.inscripcion.controllers;

import com.example.inscripcion.entities.Prerequisite;
import com.example.inscripcion.services.PrerequisiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/prerequisites")
public class PrerequisiteController {
    @Autowired
    PrerequisiteService prerequisiteService;

    @GetMapping("/{rut}")
    public ResponseEntity<List<Prerequisite>> getAllowedSubjectsByRut(@PathVariable("rut") String rut){
        return ResponseEntity.ok(prerequisiteService.getAllowedSubjectsByRut(rut));
    }
}
