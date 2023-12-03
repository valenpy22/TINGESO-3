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

    @Autowired
    StudyPlanService studyPlanService;

    @Autowired
    CareerService careerService;

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

    public Integer getLevelByRut(String rut){
        List<Grade> grades = gradeRepository.getGradesByRut(rut);

        Integer id_subject;
        Integer level = 1;

        for(Grade grade : grades){
            if(!isPassed(grade.getGrade())){
                grade.setStatus("Reprobada");
            }else{
                grade.setStatus("Aprobada");
            }
            id_subject = grade.getId_subject();
            if(studyPlanService.getStudyPlanById_subject(id_subject).getLevel() > level){
                level = studyPlanService.getStudyPlanById_subject(id_subject).getLevel();
            }
            gradeRepository.save(grade);
        }

        return level;

    }

    public boolean isPassed(Double grade){
        return grade >= 4;
    }


    public List<Grade> getPassedGradesByRut(String rut){
        List<Grade> grades = gradeRepository.getGradesByRut(rut);
        List<Grade> passed_grades = new ArrayList<>();

        for(Grade grade : grades){
            if(grade.getStatus().equals("Aprobada")){
                passed_grades.add(grade);
            }
        }

        return passed_grades;
    }

    public List<Grade> getFailedGradesByRut(String rut){
        List<Grade> grades = gradeRepository.getGradesByRut(rut);
        List<Grade> failed_grades = new ArrayList<>();

        for(Grade grade : grades){
            if(grade.getStatus().equals("Reprobada")){
                failed_grades.add(grade);
            }
        }

        return failed_grades;
    }

    public Integer getNumberOfFailedTimesByRutAndIdSubject(String rut, Integer id_subject){
        List<Grade> failed_grades = getFailedGradesByRut(rut);

        int count = 1;
        for(Grade grade : failed_grades){
            if(grade.getId_subject().equals(id_subject)){
                count++;
            }
        }
        return count;
    }

    public List<Grade> getGradesByRut(String rut){
        return gradeRepository.getGradesByRut(rut);
    }

    public Integer getMaxLevelByRut(String rut){
        return gradeRepository.getMaxLevelByRut(rut);
    }

    public boolean isSubjectAvailable(String rut, Integer id_subject){
        List<Grade> grades = getGradesByRut(rut);

        return false;

    }

}
