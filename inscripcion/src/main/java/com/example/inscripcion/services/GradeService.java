package com.example.inscripcion.services;

import com.example.inscripcion.entities.Grade;
import com.example.inscripcion.entities.Student;
import com.example.inscripcion.repositories.GradeRepository;
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
public class GradeService {
    @Autowired
    GradeRepository gradeRepository;

    public List<Grade> readCSV(String directory){
        List<Grade> grades = new ArrayList<>();

        if(directory.equals("Notas.xlsx")){
            try(FileInputStream file = new FileInputStream(new File(directory));
                Workbook workbook = new XSSFWorkbook(file)){
                Sheet sheet = workbook.getSheetAt(0);
                boolean firstRow = true;

                for(Row row : sheet){
                    if(firstRow){
                        firstRow = false;
                        continue;
                    }

                    Grade grade = new Grade();
                    grade.setYear((int)row.getCell(0).getNumericCellValue());
                    grade.setSemester((int)row.getCell(1).getNumericCellValue());
                    grade.setRut(row.getCell(2).getStringCellValue());
                    grade.setId_subject((int)row.getCell(4).getNumericCellValue());
                    grade.setGrade(row.getCell(5).getNumericCellValue());
                }
            }catch (Exception e){
                e.printStackTrace();
            }

            gradeRepository.saveAll(grades);

            return grades;
        }else{
            return null;
        }
    }

    public Integer getLevelStudentByRut(String rut){
        List<Grade> grades = gradeRepository.getGradesByRut(rut);
        Integer max_level = gradeRepository.getMaxLevelByRut(rut);
        List<Grade> failed_subjects = new ArrayList<>();
        List<Integer> indexes = new ArrayList<>();

        for(Grade grade : grades){
            if(!isPassed(grade.getGrade())){
                failed_subjects.add(grade);
                indexes.add(grades.indexOf(grade));
            }
        }

        for(Grade grade : failed_subjects){
            //Conseguir el código de la asignatura y ver si se dio
            //de nuevo.
            //Ver de qué nivel es la asignatura y si es de primer nivel,
            //se permite revisar si se aprobó 2 veces más.
            //Si no, se permite ver si se aprobó 1 vez más

        }
    }

    public boolean isPassed(Double grade){
        return grade >= 4;
    }
}
