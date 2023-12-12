package com.example.inscripcion.services;

import com.example.inscripcion.entities.Career;
import com.example.inscripcion.entities.StudyPlan;
import com.example.inscripcion.repositories.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.util.List;

@Service
public class CareerService {
    @Autowired
    CareerRepository careerRepository;

    @Autowired
    StudyPlanService studyPlanService;

    public Career findCareerById_career(Integer id_career){
        return careerRepository.findCareerById_career(id_career);
    }

    public String getCareerNameById_career(Integer id_career){
        return careerRepository.findCareerById_career(id_career).getCareer_name();
    }

    public List<Career> getAllCareers(){
        int i = 0;
        for(Career career : careerRepository.findAll()){
            System.out.println(i);
            i++;
        }
        return careerRepository.findAll();
    }

    public Integer findIdCareerByCareerName(String career_name){
        return careerRepository.findIdCareerByCareerName(career_name);
    }
    public List<StudyPlan> getAllSubjectsByCareerName(String career_name){
        Integer id_career = findIdCareerByCareerName(career_name);
        return studyPlanService.getStudyPlansById_career(id_career);
    }

    public List<StudyPlan> getAllSubjectsByIdCareer(Integer id_career){
        return studyPlanService.getStudyPlansById_career(id_career);
    }

    public Career save(String career_name){
        Career career = new Career();
        career.setCareer_name(career_name);
        System.out.println(career.getId_career());
        return careerRepository.save(career);
    }
}
