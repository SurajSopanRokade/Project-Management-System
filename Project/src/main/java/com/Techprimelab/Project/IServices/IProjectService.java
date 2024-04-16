package com.Techprimelab.Project.IServices;

import java.util.List;

import com.Techprimelab.Project.Models.DepartmentSuccessDto;
import com.Techprimelab.Project.Models.Project;
import com.Techprimelab.Project.Models.Status;


public interface IProjectService {
	List<Project> getAllProjects();
	Project saveProject(Project p);
	Project updateProject(Project p);
	void deleteProject(int id);
	Project searchProjectById(int id);
	Project updateProjectStatus(int projectId, int statusId);
	int getTotalProjectCount();
	
	int getClosedProjectsCount();
	int getCancelledProjectsCount();
	int getRunningProjectsCount();
	int getClosureDelayProjectsCount();
	List<DepartmentSuccessDto> getDepartmentSuccessData();

}
