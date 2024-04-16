package com.Techprimelab.Project.IServices;

import java.util.List;


import com.Techprimelab.Project.Models.Priority;

public interface IPriorityService {


	List<Priority> getAllPrioritys();
	Priority savePriority(Priority p);
	Priority updatePriority(Priority p);
	void deletePriority(int id);
	Priority searchPriorityById(int id);
	
}
