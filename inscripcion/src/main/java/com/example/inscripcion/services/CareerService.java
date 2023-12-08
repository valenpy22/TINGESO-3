package com.example.inscripcion.services;

import com.example.inscripcion.entities.Career;
import com.example.inscripcion.repositories.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CareerService {
    @Autowired
    CareerRepository careerRepository;

    public Career findCareerById_career(Integer id_career){
        return careerRepository.findCareerById_career(id_career);
    }

    public String getCareerNameById_career(Integer id_career){
        return careerRepository.findCareerById_career(id_career).getCareer_name();
    }

    public List<Career> getAllCareers(){
        return careerRepository.findAll();
    }
}
