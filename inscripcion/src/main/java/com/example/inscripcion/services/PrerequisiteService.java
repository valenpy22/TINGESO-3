package com.example.inscripcion.services;

import com.example.inscripcion.entities.Grade;
import com.example.inscripcion.entities.Prerequisite;
import com.example.inscripcion.entities.Student;
import com.example.inscripcion.repositories.PrerequisiteRepository;
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
public class PrerequisiteService {
    @Autowired
    PrerequisiteRepository prerequisiteRepository;

    @Autowired
    GradeService gradeService;

    public List<Prerequisite> readCSV(String directory){
        List<Prerequisite> prerequisites = new ArrayList<>();

        if(directory.equals("Prerequisitos.xlsx")){
            try(FileInputStream file = new FileInputStream(new File(directory));
                Workbook workbook = new XSSFWorkbook(file)){
                Sheet sheet = workbook.getSheetAt(0);
                boolean firstRow = true;

                for(Row row : sheet){
                    if(firstRow){
                        firstRow = false;
                        continue;
                    }

                    Prerequisite prerequisite = new Prerequisite();
                    prerequisite.setId_subject((int)row.getCell(0).getNumericCellValue());
                    prerequisite.setId_prerequisite((int)row.getCell(1).getNumericCellValue());

                    prerequisites.add(prerequisite);
                }
            }catch (Exception e){
                e.printStackTrace();
            }

            prerequisiteRepository.saveAll(prerequisites);

            return prerequisites;
        }else{
            return null;
        }
    }

    public List<Prerequisite> findById_subject(Integer id_subject){
        return prerequisiteRepository.findById_subject(id_subject);
    }

    public boolean arePrerequisitesDoneForIdSubject(String rut, Integer id_subject){
        List<Prerequisite> prerequisites = findById_subject(id_subject);

        for(Prerequisite prerequisite : prerequisites){
            Integer id_prerequisite = prerequisite.getId_prerequisite();

            List<Grade> grades = gradeService.getGradesByRut(rut);

            for(Grade grade : grades){
                if(grade.getId_subject().equals(id_prerequisite)){
                    if(grade.getGrade() < 4){
                        for(Prerequisite prerequisite1 : prerequisites){
                            prerequisite1.setStatus("No se puede inscribir");
                        }
                        return false;
                    }
                }
            }
        }

        for(Prerequisite prerequisite : prerequisites){
            prerequisite.setStatus("Por inscribir");
        }
        return true;
    }

    // FALTA HACER TABLA INTERMEDIA ENTRE ESTUDIANTE
    // Y PREREQUISITOS

    // ADEMÁS, HAY QUE HACER OTRA TABLA INTERMEDIA QUE PERMITA
    // CONECTAR STUDYPLAN CON SCHEDULE
}
