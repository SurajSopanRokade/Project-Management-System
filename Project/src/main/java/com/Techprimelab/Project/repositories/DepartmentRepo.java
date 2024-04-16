package com.Techprimelab.Project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Techprimelab.Project.Models.Department;



public interface DepartmentRepo extends JpaRepository<Department, Integer> {

}
