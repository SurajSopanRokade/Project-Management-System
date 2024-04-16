package com.Techprimelab.Project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Techprimelab.Project.Models.DepartmentSuccessDto;
import com.Techprimelab.Project.Models.Project;


@Repository
public interface ProjectRepo extends JpaRepository<Project, Integer> {

  @Query("SELECT COUNT(p) FROM Project p WHERE p.status.id = :statusId")
   int countProjectsByStatus(int statusId);
  
  @Query("SELECT COUNT(p) FROM Project p WHERE p.status.statusName = 'Registered' AND p.endDate < CURRENT_DATE")
    int countProjectsByRegisteredStatusAndEndDateBeforeToday();
  

  @Query("SELECT new com.Techprimelab.Project.Models.DepartmentSuccessDto(p.department.departmentName, " +
             "COUNT(p), " +
             "COUNT(CASE WHEN p.status.statusName = 'closed' THEN 1 END), " +
             "1.0 * COUNT(CASE WHEN p.status.statusName = 'closed' THEN 1 END) / COUNT(p) * 100) " +
             "FROM Project p GROUP BY p.department.departmentName")
      List<DepartmentSuccessDto> getDepartmentSuccessData();
}