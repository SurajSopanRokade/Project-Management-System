package com.Techprimelab.Project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Techprimelab.Project.Models.Category;


public interface CategoryRepo extends JpaRepository<Category, Integer> {

}
