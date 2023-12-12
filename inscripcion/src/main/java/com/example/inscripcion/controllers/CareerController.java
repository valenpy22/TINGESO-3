package com.example.inscripcion.controllers;

import com.example.inscripcion.entities.Career;
import com.example.inscripcion.entities.StudyPlan;
import com.example.inscripcion.services.CareerService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/careers")
public class CareerController {
    @Autowired
    CareerService careerService;

    @GetMapping
    public ResponseEntity<List<Career>> getAllCareers(){
        return ResponseEntity.ok(careerService.getAllCareers());
    }

    @GetMapping("/{career_name}")
    public ResponseEntity<List<StudyPlan>> getSubjectsByCareerName(@PathVariable("career_name") String career_name){
        return ResponseEntity.ok(careerService.getAllSubjectsByCareerName(career_name));
    }

    @GetMapping("/subjects/{id_career}")
    public ResponseEntity<List<StudyPlan>> getSubjectsByIdCareer(@PathVariable("id_career") Integer id_career){
        return ResponseEntity.ok(careerService.getAllSubjectsByIdCareer(id_career));
    }

    @GetMapping("/id/{id_career}")
    public ResponseEntity<String> getCareerById(@PathVariable("id_career") Integer id_career){
        return ResponseEntity.ok(careerService.getCareerNameById_career(id_career));
    }

    @PostMapping("/name/{career_name}")
    public ResponseEntity<Career> saveCareer(@PathVariable("career_name") String career_name){
        return ResponseEntity.ok(careerService.save(career_name));
    }

}
