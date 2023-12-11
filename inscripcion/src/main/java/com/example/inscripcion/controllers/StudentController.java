package com.example.inscripcion.controllers;

import com.example.inscripcion.entities.Student;
import com.example.inscripcion.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/students")
public class StudentController {
    @Autowired
    StudentService studentService;

    @GetMapping("/exists/{rut}")
    public ResponseEntity<Boolean> studentExists(@PathVariable("rut") String rut){
        return ResponseEntity.ok(studentService.studentExists(rut));
    }

    @GetMapping("/{rut}")
    public ResponseEntity<Integer> countLevelsByRut(@PathVariable("rut") String rut){
        return ResponseEntity.ok(studentService.countLevelsByRut(rut));
    }

    @GetMapping("/student/{rut}")
    public ResponseEntity<Student> getStudentByRut(@PathVariable("rut") String rut){
        return ResponseEntity.ok(studentService.findByRut(rut));
    }

    @GetMapping("/maxsubjects/{rut}")
    public ResponseEntity<Integer> getMaxNumberOfSubjectsByRut(@PathVariable("rut") String rut){
        return ResponseEntity.ok(studentService.getMaxNumberOfSubjectsByRut(rut));
    }

    @PutMapping("/status/{rut}")
    public ResponseEntity<Student> setStudentStatus(@PathVariable("rut") String rut){
        return ResponseEntity.ok(studentService.setStudentStatus(rut));
    }

    @GetMapping("/get_status/{rut}")
    public ResponseEntity<Boolean> getStatusByRut(@PathVariable("rut") String rut){
        return ResponseEntity.ok(studentService.getStudentStatus(rut));
    }
}
