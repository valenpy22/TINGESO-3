package com.example.inscripcion.services;

import com.example.inscripcion.entities.Grade;
import com.example.inscripcion.entities.Schedule_StudyPlan;
import com.example.inscripcion.entities.Student;
import com.example.inscripcion.entities.StudyPlan;
import com.example.inscripcion.repositories.Schedule_StudyPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class Schedule_StudyPlanService {
    @Autowired
    Schedule_StudyPlanRepository scheduleStudyPlanRepository;

    @Autowired
    GradeService gradeService;

    public List<Schedule_StudyPlan> deleteAllSchedulesByIdSubject(Integer id_subject){
        List<Schedule_StudyPlan> s = scheduleStudyPlanRepository
                .getSchedule_StudyPlanById_subject(id_subject)
                .stream()
                .filter(scheduleStudyPlan -> scheduleStudyPlan.getId_subject().equals(id_subject)
                        || scheduleStudyPlan.getBlock() == null)
                .toList();

        scheduleStudyPlanRepository.deleteAll(s);

        return scheduleStudyPlanRepository.getSchedule_StudyPlanById_subject(id_subject);
    }

    public List<Schedule_StudyPlan> saveSchedules(List<Schedule_StudyPlan> scheduleStudyPlans){
        List<Schedule_StudyPlan> studyPlans = scheduleStudyPlans.stream()
                .filter(g -> g.getBlock() != null)
                .toList();
        return scheduleStudyPlanRepository.saveAll(studyPlans);
    }

    public List<Schedule_StudyPlan> getSchedulesByIdSubject(Integer id_subject){
        if(scheduleStudyPlanRepository.getSchedule_StudyPlanById_subject(id_subject).isEmpty()){
            return null;
        }else{
            return scheduleStudyPlanRepository.getSchedule_StudyPlanById_subject(id_subject);
        }
    }

    public List<Schedule_StudyPlan> getSchedulesByRut(String rut){
        List<Grade> grades = gradeService.getEnrolledGrades(rut);
        List<Schedule_StudyPlan> scheduleStudyPlans = new ArrayList<>();

        for(Grade grade : grades){
            List<Schedule_StudyPlan> schedulesForSubject = scheduleStudyPlanRepository.getSchedule_StudyPlanById_subject(grade.getId_subject());
            scheduleStudyPlans.addAll(schedulesForSubject);
        }

        return scheduleStudyPlans;
    }

    public boolean deleteSchedulesWithNullBlocks(){
        scheduleStudyPlanRepository.deleteAll(
                scheduleStudyPlanRepository
                        .findAll().stream()
                        .filter(sc -> sc.getBlock() == null).toList());

        return scheduleStudyPlanRepository.findAll().stream()
                .filter(sc -> sc.getBlock() == null).toList().isEmpty();
    }
}
