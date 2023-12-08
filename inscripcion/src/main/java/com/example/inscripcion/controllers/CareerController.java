package com.example.inscripcion.controllers;

import com.example.inscripcion.entities.Career;
import com.example.inscripcion.services.CareerService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
public class CareerController {
    @Autowired
    CareerService careerService;

}
