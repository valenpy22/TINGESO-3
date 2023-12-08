package com.example.inscripcion.controllers;

import com.example.inscripcion.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class StudentController {
    @Autowired
    StudentService studentService;
}
