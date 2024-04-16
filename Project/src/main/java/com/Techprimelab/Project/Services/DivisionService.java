package com.Techprimelab.Project.Services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Techprimelab.Project.IServices.IDivisionService;
import com.Techprimelab.Project.Models.Division;
import com.Techprimelab.Project.repositories.DivisionRepo;



@Service
public class DivisionService implements IDivisionService{

	@Autowired
	private DivisionRepo divisionRepo;

	@Override
	public List<Division> getAllDivisions() {
		List<Division> divList = divisionRepo.findAll();
		return divList;
	}

	
	@Override
	public Division saveDivision(Division d) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Division updateDivision(Division d) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteDivision(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Division searchDivisionById(int id) {
		// TODO Auto-generated method stub
		return null;
	}
}
