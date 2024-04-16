package com.Techprimelab.Project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Techprimelab.Project.Models.Priority;

public interface PriorityRepo extends JpaRepository<Priority, Integer> {

}
