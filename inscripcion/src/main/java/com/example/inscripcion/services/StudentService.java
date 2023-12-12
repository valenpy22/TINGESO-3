package com.example.inscripcion.services;

import com.example.inscripcion.entities.Grade;
import com.example.inscripcion.entities.Student;
import com.example.inscripcion.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public void setStudentStatusByGrades(String rut){
        List<Grade> grades = gradeService.getGradesByRut(rut);
        for(Grade grade : grades) {
            Integer id_subject = grade.getId_subject();
            Integer number_failed_times = gradeService.getNumberOfFailedTimesByRutAndIdSubject(rut, id_subject);
            Integer level = studyPlanService.getStudyPlanLevelById_subject(id_subject);
            Student student = studentRepository.findByRut(rut);

            student.setStatus("Regular");

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
        return studyPlanService.countByLevelAndId_career(level, student.getId_career());
    }

    public List<Student> getStudentsByCareer(Integer id_career){
        return studentRepository.findStudentsById_career(id_career);
    }

    public boolean studentExists(String rut){
        return studentRepository.findByRut(rut) != null;
    }

    public Integer countLevelsByRut(String rut){
        Integer id_career = findByRut(rut).getId_career();
        return studyPlanService.countLevelsByIdCareer(id_career);
    }

    public Student setStudentStatus(String rut){
        Student student = studentRepository.findByRut(rut);
        if(gradeService.isRegularStudentByGrades(rut)){
            student.setStatus("Regular");
        }else{
            student.setStatus("Eliminado");
        }

        return studentRepository.save(student);
    }

    public boolean getStudentStatus(String rut){
        return studentRepository.findByRut(rut).getStatus().equals("Regular");
    }

    public Double getAverageScoreByRut(String rut){
        List<Grade> grades = gradeService.getGradesByRut(rut);
        Double suma = 0.0;
        for(Grade grade : grades){
            suma += grade.getGrade();
        }

        if(!grades.isEmpty()){
            return suma/grades.size();
        }else{
            return 0.0;
        }
    }

}
