package com.Techprimelab.Project.IServices;

import java.util.List;


import com.Techprimelab.Project.Models.Division;

public interface IDivisionService {

	List<Division> getAllDivisions();
	Division saveDivision(Division d);
	Division updateDivision(Division d);
	void deleteDivision(int id);
	Division searchDivisionById(int id);
}
