package com.Techprimelab.Project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Techprimelab.Project.IServices.ITypeService;
import com.Techprimelab.Project.Models.Type;
import com.Techprimelab.Project.repositories.TypeRepo;


@Service
public class TypeService implements ITypeService {

	@Autowired
	private TypeRepo typeRepo;
	
	@Override
	public List<Type> getAllTypes() {
		List<Type> typeList =typeRepo.findAll();
		return typeList;
	}

	@Override
	public Type saveType(Type t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Type updateType(Type t) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteType(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Type searchTypeById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
