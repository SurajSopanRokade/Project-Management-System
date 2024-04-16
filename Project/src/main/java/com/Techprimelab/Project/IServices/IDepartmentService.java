package com.Techprimelab.Project.IServices;

import java.util.List;

import com.Techprimelab.Project.Models.Department;


public interface IDepartmentService {

	List<Department> getAllDepartments();
	Department saveDepartment(Department d);
	Department updateDepartment(Department d);
	void deleteDepartment(int id);
	Department searchDepartmentById(int id);
}
