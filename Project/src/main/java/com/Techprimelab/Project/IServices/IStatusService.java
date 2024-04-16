package com.Techprimelab.Project.IServices;

import java.util.List;


import com.Techprimelab.Project.Models.Status;

public interface IStatusService {

	List<Status> getAllStatuss();
	Status saveStatus(Status s);
	Status updateStatus(Status s);
	void deleteStatus(int id);
	Status searchStatusById(int id);
	
}
