package com.Techprimelab.Project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Techprimelab.Project.IServices.ICategoryService;
import com.Techprimelab.Project.Models.Category;
import com.Techprimelab.Project.repositories.CategoryRepo;



@Service
public class CategoryService implements ICategoryService{

	@Autowired
	private CategoryRepo categoryRepo;

	@Override
	public List<Category> getAllCategory() {
		List<Category>catList = categoryRepo.findAll();
		return catList;
	}

	@Override
	public Category saveCategory(Category c) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Category updateCategory(Category c) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteCategory(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Category searchCategoryById(int id) {
		// TODO Auto-generated method stub
		return null;
	}
}
