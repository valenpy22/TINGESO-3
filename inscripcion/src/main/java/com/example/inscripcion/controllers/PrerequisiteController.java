package com.example.inscripcion.controllers;

import com.example.inscripcion.services.PrerequisiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/prerequisites")
public class PrerequisiteController {
    @Autowired
    PrerequisiteService prerequisiteService;

    @GetMapping("/done/{rut}/{id_subject}")
    public ResponseEntity<Boolean> arePrerequisitesDoneForIdSubject(
            @PathVariable("rut") String rut,
            @PathVariable("id_subject") Integer id_subject){
        return ResponseEntity.ok(prerequisiteService.arePrerequisitesDoneForIdSubject(rut, id_subject));
    }
}
