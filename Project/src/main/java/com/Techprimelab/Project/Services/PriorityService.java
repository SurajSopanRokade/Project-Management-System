package com.Techprimelab.Project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Techprimelab.Project.IServices.IPriorityService;
import com.Techprimelab.Project.Models.Priority;
import com.Techprimelab.Project.repositories.PriorityRepo;


@Service
public class PriorityService implements IPriorityService {

	@Autowired
	private PriorityRepo priorityRepo;
	
	@Override
	public List<Priority> getAllPrioritys() {
		List<Priority> pList =priorityRepo.findAll();
		return pList;
	}



	@Override
	public Priority savePriority(Priority p) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Priority updatePriority(Priority p) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deletePriority(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Priority searchPriorityById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
