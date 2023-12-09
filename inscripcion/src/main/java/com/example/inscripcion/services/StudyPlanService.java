package com.example.inscripcion.services;

import com.example.inscripcion.entities.Grade;
import com.example.inscripcion.entities.Prerequisite;
import com.example.inscripcion.entities.StudyPlan;
import com.example.inscripcion.repositories.StudyPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudyPlanService {
    @Autowired
    StudyPlanRepository studyPlanRepository;

    public StudyPlan getStudyPlanById_subject(Integer id_subject){
        return studyPlanRepository.getStudyPlanById_subject(id_subject);
    }

    public Integer getStudyPlanLevelById_subject(Integer id_subject){
        return studyPlanRepository.getStudyPlanLevelById_Subject(id_subject);
    }

    public Integer countByLevelAndId_career(Integer level, Integer id_career){
        return studyPlanRepository.countByLevelAndId_career(level, id_career);
    }

    public List<StudyPlan> getStudyPlansById_career(Integer id_career){
        return studyPlanRepository.getStudyPlansById_career(id_career);
    }

    public Integer countLevelsByIdCareer(Integer id_career){
        return studyPlanRepository.countLevelsByIdCareer(id_career);
    }

    public List<StudyPlan> getStudyPlanByIdSubjects(List<Prerequisite> prerequisites){
        List<StudyPlan> studyPlans = new ArrayList<>();

        for(Prerequisite prerequisite : prerequisites){
            studyPlans.add(studyPlanRepository.getStudyPlanById_subject(prerequisite.getId_subject()));
        }

        return studyPlans;
    }

    public List<StudyPlan> getStudyPlanByGrades(List<Grade> grades){
        List<StudyPlan> studyPlans = new ArrayList<>();

        for(Grade grade : grades){
            studyPlans.add(studyPlanRepository.getStudyPlanById_subject(grade.getId_subject()));
        }

        return studyPlans;
    }

}
