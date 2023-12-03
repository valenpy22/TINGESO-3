package com.example.inscripcion.services;

import com.example.inscripcion.entities.Student;
import com.example.inscripcion.entities.StudyPlan;
import com.example.inscripcion.repositories.StudyPlanRepository;
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
public class StudyPlanService {
    @Autowired
    StudyPlanRepository studyPlanRepository;

    public List<StudyPlan> readCSV(String directory){
        List<StudyPlan> studyPlans = new ArrayList<>();

        if(directory.equals("Plan_estudios.xlsx")){
            try(FileInputStream file = new FileInputStream(new File(directory));
                Workbook workbook = new XSSFWorkbook(file)){
                Sheet sheet = workbook.getSheetAt(0);
                boolean firstRow = true;

                for(Row row : sheet){
                    if(firstRow){
                        firstRow = false;
                        continue;
                    }

                    StudyPlan studyPlan = new StudyPlan();
                    studyPlan.setId_career((int)row.getCell(0).getNumericCellValue());
                    studyPlan.setId_study_plan(row.getCell(1).getStringCellValue());
                    studyPlan.setLevel((int)row.getCell(2).getNumericCellValue());
                    studyPlan.setId_subject((int)row.getCell(3).getNumericCellValue());
                    studyPlan.setSubject_name(row.getCell(4).getStringCellValue());

                    studyPlans.add(studyPlan);
                }
            }catch (Exception e){
                e.printStackTrace();
            }

            studyPlanRepository.saveAll(studyPlans);

            return studyPlans;
        }else{
            return null;
        }
    }
}
