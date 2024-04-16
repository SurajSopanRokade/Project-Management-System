package com.Techprimelab.Project.IServices;

import java.util.List;

import com.Techprimelab.Project.Models.Type;
import com.Techprimelab.Project.Models.User;

public interface ITypeService {

	List<Type> getAllTypes();
	Type saveType(Type t);
	Type updateType(Type t);
	void deleteType(int id);
	Type searchTypeById(int id);
}
