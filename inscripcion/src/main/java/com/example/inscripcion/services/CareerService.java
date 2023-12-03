package com.example.inscripcion.services;

import com.example.inscripcion.entities.Career;
import com.example.inscripcion.repositories.CareerRepository;
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
public class CareerService {
    @Autowired
    CareerRepository careerRepository;

    public List<Career> readCSV(String directory){
        List<Career> careers = new ArrayList<>();

        if(directory.equals("carreras.xlsx")){
            try(FileInputStream file = new FileInputStream(new File(directory));
                Workbook workbook = new XSSFWorkbook(file)){
                Sheet sheet = workbook.getSheetAt(0);
                boolean firstRow = true;

                for(Row row : sheet){
                    if(firstRow){
                        firstRow = false;
                        continue;
                    }

                    Career career = new Career();
                    career.setId_career((int)row.getCell(0).getNumericCellValue());
                    career.setCareer_name(row.getCell(1).getStringCellValue());

                }
            }catch (Exception e){
                e.printStackTrace();
            }

            careerRepository.saveAll(careers);
            return careers;
        }else{
            return null;
        }
    }
}
