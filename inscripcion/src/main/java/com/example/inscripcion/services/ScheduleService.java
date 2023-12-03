package com.example.inscripcion.services;

import com.example.inscripcion.entities.Schedule;
import com.example.inscripcion.repositories.ScheduleRepository;
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
public class ScheduleService {
    @Autowired
    ScheduleRepository scheduleRepository;

    public List<Schedule> readCSV(String directory){
        List<Schedule> schedules = new ArrayList<>();

        if(directory.equals("schedules.xlsx")){
            try(FileInputStream file = new FileInputStream(new File(directory));
                Workbook workbook = new XSSFWorkbook(file)){
                Sheet sheet = workbook.getSheetAt(0);
                boolean firstRow = true;

                for(Row row : sheet){
                    if(firstRow){
                        firstRow = false;
                        continue;
                    }

                    Schedule schedule = new Schedule();
                    schedule.setDay(row.getCell(0).getStringCellValue());
                    schedule.setStart_schedule(row.getCell(1).getStringCellValue());
                    schedule.setFinal_schedule(row.getCell(2).getStringCellValue());
                    schedule.setId_schedule(row.getCell(3).getStringCellValue());
                }
            }catch (Exception e){
                e.printStackTrace();
            }

            scheduleRepository.saveAll(schedules);

            return schedules;
        }else{
            return null;
        }
    }
}
