package com.example.inscripcion.services;

import com.example.inscripcion.entities.*;
import com.example.inscripcion.repositories.PrerequisiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PrerequisiteService {
    @Autowired
    PrerequisiteRepository prerequisiteRepository;

    @Autowired
    GradeService gradeService;

    @Autowired
    CareerService careerService;

    @Autowired
    StudentService studentService;

    @Autowired
    StudyPlanService studyPlanService;

    public List<Prerequisite> findById_subject(Integer id_subject){
        return prerequisiteRepository.findById_subject(id_subject);
    }

    public List<Prerequisite> getAllowedSubjects(Integer id_prerequisite){
        return prerequisiteRepository.getAllowedSubjectsById_prerequisite(id_prerequisite);
    }

    public List<Prerequisite> getAllowedSubjectsByRut(String rut){
        Student student = studentService.findByRut(rut);
        List<Grade> grades = gradeService.getGradesByRut(rut);
        List<StudyPlan> studyPlans = studyPlanService.getStudyPlansById_career(student.getId_career());

        List<Integer> id_subjects = studyPlans.stream()
                .map(StudyPlan::getId_subject)
                .toList();

        List<Integer> passed_subjects = grades.stream()
                .filter(grade -> grade.getGrade() != null && grade.getGrade() >= 4)
                .map(Grade::getId_subject)
                .toList();

        List<Integer> failed_subjects = grades.stream()
                .filter(grade -> grade.getGrade() != null && grade.getGrade() < 4)
                .map(Grade::getId_subject)
                .toList();

        List<Integer> notTakenSubjects = id_subjects.stream()
                .filter(id -> !passed_subjects.contains(id) && !failed_subjects.contains(id))
                .toList();

        List<Integer> allowedSubjects = new ArrayList<>();

        for (Integer subjectId : notTakenSubjects) {
            List<Integer> prerequisites = getPrerequisitesForSubject(subjectId);

            if (prerequisites.isEmpty() || passed_subjects.containsAll(prerequisites)) {
                allowedSubjects.add(subjectId);
            }
        }

        Set<Integer> uniqueNumbers = new HashSet<>(allowedSubjects);
        List<Integer> numbers = new ArrayList<>(uniqueNumbers);

        return convertToPrerequisiteObjects(numbers);
    }

    private List<Integer> getPrerequisitesForSubject(Integer id_subject) {
        return prerequisiteRepository.findById_subject(id_subject)
                .stream().map(Prerequisite::getId_prerequisite)
                .toList();
    }

    private List<Prerequisite> convertToPrerequisiteObjects(List<Integer> subjectIds) {
        Map<Integer, Prerequisite> uniquePrerequisitesMap = new HashMap<>();

        for(Integer id : subjectIds){
            List<Prerequisite> prerequisites = findById_subject(id);
            if(!prerequisites.isEmpty()){
                Prerequisite firstPrerequisite = prerequisites.get(0);
                uniquePrerequisitesMap.putIfAbsent(id, firstPrerequisite);
            }
        }

        return new ArrayList<>(uniquePrerequisitesMap.values());
    }

}
