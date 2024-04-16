package com.Techprimelab.Project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Techprimelab.Project.IServices.IDepartmentService;
import com.Techprimelab.Project.Models.Department;
import com.Techprimelab.Project.repositories.DepartmentRepo;



@Service
public class DepartmentService implements IDepartmentService {

	@Autowired
	private DepartmentRepo departmentRepo;

	
	@Override
	public List<Department> getAllDepartments() {
		List<Department> depList = departmentRepo.findAll();
		return depList;
	}

	@Override
	public Department saveDepartment(Department d) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Department updateDepartment(Department d) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteDepartment(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Department searchDepartmentById(int id) {
		// TODO Auto-generated method stub
		return null;
	}
}
