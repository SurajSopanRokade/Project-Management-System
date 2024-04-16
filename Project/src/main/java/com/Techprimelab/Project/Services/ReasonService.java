package com.Techprimelab.Project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Techprimelab.Project.IServices.IReasonService;
import com.Techprimelab.Project.Models.Reason;
import com.Techprimelab.Project.repositories.ReasonRepo;


@Service
public class ReasonService implements IReasonService{

	@Autowired
	private ReasonRepo reasonRepo;
	
	

	@Override
	public List<Reason> getAllReasons() {
		List<Reason> reasonList = reasonRepo.findAll();
		return reasonList;
	}


	@Override
	public Reason saveReason(Reason r) {
		// TODO Auto-generated method stub
		return null;
	}



	@Override
	public Reason updateReason(Reason r) {
		// TODO Auto-generated method stub
		return null;
	}



	@Override
	public void deleteReason(int id) {
		// TODO Auto-generated method stub
		
	}



	@Override
	public Reason searchReasonById(int id) {
		// TODO Auto-generated method stub
		return null;
	}
}
