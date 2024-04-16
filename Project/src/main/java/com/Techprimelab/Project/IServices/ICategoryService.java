package com.Techprimelab.Project.IServices;

import java.util.List;

import com.Techprimelab.Project.Models.Category;


public interface ICategoryService {

	
	List<Category> getAllCategory();
	Category saveCategory(Category c);
	Category updateCategory(Category c);
	void deleteCategory(int id);
	Category searchCategoryById(int id);
}
