package com.example.inscripcion.services;

import com.example.inscripcion.entities.Career;
import com.example.inscripcion.entities.Grade;
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

    @Autowired
    GradeService gradeService;

    @Autowired
    StudyPlanService studyPlanService;

    @Autowired
    CareerService careerService;

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
                    student.setStatus("Regular");

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

    public void setStudentStatusByGrades(String rut){
        List<Grade> grades = gradeService.getGradesByRut(rut);
        for(Grade grade : grades) {
            Integer id_subject = grade.getId_subject();
            Integer number_failed_times = gradeService.getNumberOfFailedTimesByRutAndIdSubject(rut, id_subject);
            Integer level = studyPlanService.getStudyPlanLevelById_subject(id_subject);
            Student student = studentRepository.findByRut(rut);

            if (level == 1) {
                if (number_failed_times >= 1 && number_failed_times < 3) {

                    student.setStatus("Regular");
                } else {
                    student.setStatus("Eliminado");
                }
            } else {
                if (number_failed_times == 1) {
                    student.setStatus("Regular");
                } else {
                    student.setStatus("Eliminado");
                }
            }

            studentRepository.save(student);

        }
    }

    public Student findByRut(String rut){
        return studentRepository.findByRut(rut);
    }

    public Integer getMaxNumberOfSubjectsByRut(String rut){
        Student student = findByRut(rut);
        Integer level = gradeService.getLevelByRut(rut);
        return studyPlanService.countByLevelAndAndId_career(level, student.getId_career());
    }

}
