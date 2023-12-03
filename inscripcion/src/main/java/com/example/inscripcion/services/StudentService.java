package com.example.inscripcion.services;

import com.example.inscripcion.entities.Student;
import com.example.inscripcion.repositories.StudentRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    public List<Student> readCSV(String directory){
        List<Student> students = new ArrayList<>();

        if(directory.equals("Estudiantes.xlsx")){
            try(FileInputStream file = new FileInputStream(new File(directory));
                Workbook workbook = new XSSFWorkbook(file)){
                Sheet sheet = workbook.getSheetAt(0);
                boolean firstRow = true;

                for(Row row : sheet){
                    if(firstRow){
                        firstRow = false;
                        continue;
                    }

                    Student student = new Student();
                    student.setRut(row.getCell(0).getStringCellValue());
                    student.setStudent_name(row.getCell(1).getStringCellValue());
                    student.setStudent_lastname(row.getCell(2).getStringCellValue());
                    student.setEmail(row.getCell(3).getStringCellValue());
                    student.setId_career(((int)row.getCell(4).getNumericCellValue()));

                    students.add(student);
                }
            }catch (Exception e){
                e.printStackTrace();
            }

            studentRepository.saveAll(students);

            return students;
        }else{
            return null;
        }
    }
}
