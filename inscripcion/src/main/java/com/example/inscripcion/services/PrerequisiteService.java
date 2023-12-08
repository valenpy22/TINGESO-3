package com.example.inscripcion.services;

import com.example.inscripcion.entities.Grade;
import com.example.inscripcion.entities.Prerequisite;
import com.example.inscripcion.repositories.PrerequisiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PrerequisiteService {
    @Autowired
    PrerequisiteRepository prerequisiteRepository;

    @Autowired
    GradeService gradeService;

    public List<Prerequisite> findById_subject(Integer id_subject){
        return prerequisiteRepository.findById_subject(id_subject);
    }

    public boolean arePrerequisitesDoneForIdSubject(String rut, Integer id_subject){
        List<Prerequisite> prerequisites = findById_subject(id_subject);

        for(Prerequisite prerequisite : prerequisites){
            Integer id_prerequisite = prerequisite.getId_prerequisite();

            List<Grade> grades = gradeService.getGradesByRut(rut);

            for(Grade grade : grades){
                if(grade.getId_subject().equals(id_prerequisite)){
                    if(grade.getGrade() < 4){
                        for(Prerequisite prerequisite1 : prerequisites){
                            prerequisite1.setStatus("No se puede inscribir");
                            prerequisiteRepository.save(prerequisite1);
                        }
                        return false;
                    }
                }
            }
        }

        for(Prerequisite prerequisite : prerequisites){
            prerequisite.setStatus("Por inscribir");
            prerequisiteRepository.save(prerequisite);
        }
        return true;
    }

    public List<Prerequisite> getAllowedSubjects(Integer id_prerequisite){
        return prerequisiteRepository.getAllowedSubjectsById_prerequisite(id_prerequisite);
    }


}
