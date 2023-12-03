package com.example.inscripcion.services;

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
}
