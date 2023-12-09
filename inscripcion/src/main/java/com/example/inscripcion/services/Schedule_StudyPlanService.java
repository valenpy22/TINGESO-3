package com.example.inscripcion.services;

import com.example.inscripcion.entities.Schedule_StudyPlan;
import com.example.inscripcion.entities.StudyPlan;
import com.example.inscripcion.repositories.Schedule_StudyPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Schedule_StudyPlanService {
    @Autowired
    Schedule_StudyPlanRepository scheduleStudyPlanRepository;

    public List<Schedule_StudyPlan> deleteAllSchedulesByIdSubject(Integer id_subject){
        List<Schedule_StudyPlan> scheduleStudyPlans = scheduleStudyPlanRepository.getSchedule_StudyPlanById_subject(id_subject);

        for(Schedule_StudyPlan scheduleStudyPlan : scheduleStudyPlans){
            if(scheduleStudyPlan.getId_subject().equals(id_subject)){
                scheduleStudyPlanRepository.delete(scheduleStudyPlan);
            }
        }

        return scheduleStudyPlanRepository.getSchedule_StudyPlanById_subject(id_subject);
    }

    public List<Schedule_StudyPlan> saveSchedules(List<Schedule_StudyPlan> scheduleStudyPlans){
        return scheduleStudyPlanRepository.saveAll(scheduleStudyPlans);
    }

    public List<Schedule_StudyPlan> getSchedulesByIdSubject(Integer id_subject){
        if(scheduleStudyPlanRepository.getSchedule_StudyPlanById_subject(id_subject).isEmpty()){
            return null;
        }else{
            return scheduleStudyPlanRepository.getSchedule_StudyPlanById_subject(id_subject);
        }
    }
}
