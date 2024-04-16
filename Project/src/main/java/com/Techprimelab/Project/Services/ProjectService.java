package com.Techprimelab.Project.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Techprimelab.Project.IServices.IProjectService;
import com.Techprimelab.Project.Models.DepartmentSuccessDto;
import com.Techprimelab.Project.Models.Project;
import com.Techprimelab.Project.Models.Status;
import com.Techprimelab.Project.Models.User;
import com.Techprimelab.Project.repositories.ProjectRepo;
import com.Techprimelab.Project.repositories.StatusRepo;
import com.Techprimelab.Project.repositories.UserRepo;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProjectService implements IProjectService  {

	@Autowired
	private ProjectRepo projectrepo;
	
	@Autowired
	private StatusRepo statusrepo;
	
	@Override
	public List<Project> getAllProjects() {
		List<Project> projectlist = projectrepo.findAll();
		return projectlist;
	}

	@Override
	public Project saveProject(Project p) {
		Project res = projectrepo.save(p);
		return res;
	}

	@Override
	public Project updateProject(Project p) {
		Project res = projectrepo.save(p);
		return res;
	}

	@Override
	public void deleteProject(int id) {
		projectrepo.deleteById(id);
		
	}

	@Override
	public Project searchProjectById(int id) {
		Project res = projectrepo.findById(id).get();
		return res;
	}

	  @Override
	    public Project updateProjectStatus(int projectId, int statusId) {
	        
	        Project project = projectrepo.findById(projectId)
	                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));
	        
	        Status status1=  statusrepo.findById(statusId)
	        		 .orElseThrow(() -> new EntityNotFoundException("Status not found with id: " + statusId));
	        
	        
	        project.setStatus(status1);
	        
	        
	        return projectrepo.save(project);
	    }

	@Override
	public int getTotalProjectCount() {
		  return (int) projectrepo.count();
	}

	 public int countProjectsByStatus(int statusId) {
	        return projectrepo.countProjectsByStatus(statusId);
	    }
	 
	 
	 private int countProjectsByRegisteredStatusAndEndDateBeforeToday() {
			int runningProjectsCount = projectrepo.countProjectsByRegisteredStatusAndEndDateBeforeToday();
			return runningProjectsCount;
		}
	 
	 
	@Override
	public int getClosedProjectsCount() {
		return countProjectsByStatus(2);
	}

	@Override
	public int getCancelledProjectsCount() {
		return countProjectsByStatus(3);
	}

	@Override
	public int getRunningProjectsCount() {
		return countProjectsByStatus(1);
	}

	@Override
	public int getClosureDelayProjectsCount() {
		return  countProjectsByRegisteredStatusAndEndDateBeforeToday();

	}
	@Override
    public List<DepartmentSuccessDto> getDepartmentSuccessData() {
        return projectrepo.getDepartmentSuccessData();
    }
	
	
	
	
}
