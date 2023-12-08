package com.example.inscripcion.controllers;

import com.example.inscripcion.services.PrerequisiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class PrerequisiteController {
    @Autowired
    PrerequisiteService prerequisiteService;
}
