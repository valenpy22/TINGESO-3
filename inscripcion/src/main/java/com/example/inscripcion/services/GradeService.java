package com.example.inscripcion.services;

import com.example.inscripcion.entities.Grade;
import com.example.inscripcion.entities.StudyPlan;
import com.example.inscripcion.repositories.GradeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GradeService {
    @Autowired
    GradeRepository gradeRepository;

    @Autowired
    StudyPlanService studyPlanService;

    @Autowired
    CareerService careerService;

    public Integer getLevelByRut(String rut){
        List<Grade> grades = gradeRepository.getGradesByRut(rut);

        Integer id_subject;
        Integer level = 1;

        for(Grade grade : grades){
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
            if(grade.getGrade() >= 4){
                passed_grades.add(grade);
            }
        }

        return passed_grades;
    }

    public List<Grade> getFailedGradesByRut(String rut){
        List<Grade> grades = gradeRepository.getGradesByRut(rut);
        List<Grade> failed_grades = new ArrayList<>();

        for(Grade grade : grades){
            if(grade.getGrade() < 4 && grade.getGrade() != 0.0){
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

    public Grade saveGrade(String rut, Integer id_subject){
        Grade gradea = new Grade();
        gradea.setGrade(0.0);
        gradea.setStatus("Inscrita");
        gradea.setRut(rut);
        gradea.setYear(2024);
        gradea.setSemester(1);
        gradea.setId_subject(id_subject);

        return gradeRepository.save(gradea);
    }

    public List<Grade> getEnrolledGrades(String rut){
        List<Grade> grades = gradeRepository.getGradesByRut(rut);
        return grades.stream().filter(g -> g.getStatus() != null && g.getStatus().equals("Inscrita")).toList();
    }

    public List<Grade> deleteGradeByRut(String rut, Integer id_subject){
        List<Grade> grades = gradeRepository.getGradesByRut(rut);
        Grade grade = grades.stream()
                .filter(g -> g.getId_subject().equals(id_subject))
                .findFirst()
                .orElse(null);

        if(grade != null){
            gradeRepository.deleteById(grade.getId_grade());
        }else{
            throw new EntityNotFoundException("Grade not found");
        }

        return gradeRepository.getGradesByRut(rut).stream()
                .filter(g -> "Inscrita".equals(g.getStatus()))
                .toList();
    }

    public boolean isRegularStudentByGrades(String rut){
        List<Grade> grades = getGradesByRut(rut);
        Map<Integer, Integer> failedSubjects = new HashMap<>();

        for(Grade grade : grades){
            if(grade.getGrade() < 4){
                failedSubjects.put(grade.getId_subject(), failedSubjects.getOrDefault(grade.getId_subject(), 0) + 1);
            }
        }

        for(Map.Entry<Integer, Integer> entry : failedSubjects.entrySet()){
            int idSubject = entry.getKey();
            int timesFailed = entry.getValue();

            int level = studyPlanService.getLevelOfSubject(idSubject);

            if((level != 1 && timesFailed >= 1) || (level == 1 && timesFailed >= 2)){
                return false;
            }
        }

        return true;
    }

    public List<StudyPlan> getEnrolledSubjects(String rut){
        List<Grade> grades = getEnrolledGrades(rut);
        return studyPlanService.getStudyPlanByGrades(grades);
    }

}
