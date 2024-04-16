package com.Techprimelab.Project.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Techprimelab.Project.IServices.ICategoryService;
import com.Techprimelab.Project.IServices.IDepartmentService;
import com.Techprimelab.Project.IServices.IDivisionService;
import com.Techprimelab.Project.IServices.ILocationService;
import com.Techprimelab.Project.IServices.IPriorityService;
import com.Techprimelab.Project.IServices.IProjectService;
import com.Techprimelab.Project.IServices.IReasonService;
import com.Techprimelab.Project.IServices.ITypeService;
import com.Techprimelab.Project.Models.Category;
import com.Techprimelab.Project.Models.Department;
import com.Techprimelab.Project.Models.DepartmentSuccessDto;
import com.Techprimelab.Project.Models.Division;
import com.Techprimelab.Project.Models.Location;
import com.Techprimelab.Project.Models.Priority;
import com.Techprimelab.Project.Models.Project;
import com.Techprimelab.Project.Models.Reason;
import com.Techprimelab.Project.Models.Status;
import com.Techprimelab.Project.Models.Type;
import com.Techprimelab.Project.repositories.ProjectRepo;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/project")
public class ProjectController {

	@Autowired
	private IProjectService projectservice;
	
	@Autowired
	private ProjectRepo projectRepo;
	
	@Autowired
	private IReasonService reasonService;

	@Autowired
	private ITypeService typeService;
	
	@Autowired
	private IPriorityService priorityService;
	
	@Autowired
	private ILocationService locationService;
	
	@Autowired
	private IDivisionService divisionService;
	
	@Autowired
	private IDepartmentService departmentService;
	
	@Autowired
	private ICategoryService categoryService;

	
	
	@PostMapping("/saveProject")
	public Project saveProject(@RequestBody Project p) {
		Project res=null;
		System.out.println("inside saveProject");
		try {
			System.out.println("Project saved");
			
			System.out.println(p);
			res=projectservice.saveProject(p);
		}
		
		catch(Exception ex){
			System.out.println(ex.getMessage());
		}
		return res;
	}
	
	
	@GetMapping("/getAllProjects")
	public List<Project> getAllProjects(){
		return projectservice.getAllProjects();
	}
	
	@DeleteMapping("/deleteProject/{id}")
	public void deleteProject(@PathVariable int id) {
		try {
			projectservice.deleteProject(id);
		}
		catch(Exception ex) {
			System.out.println(ex.getMessage());
		}
	}
	
	@PutMapping("/updateProject")
	public Project updateProject(@RequestBody Project p) {
		Project res=null;
		System.out.println("inside updateProject");
		try {
			System.out.println("Project updated");
			res=projectservice.updateProject(p);
		}
		
		catch(Exception ex){
			System.out.println(ex.getMessage());
		}
		return res;
	}
	
	
	@GetMapping("/searchProjectById/{id}")
	public Project searchProjectById(@PathVariable int id) {
		Project res=null;
		
		try {
			res=projectservice.searchProjectById(id);
			
		}
		catch(Exception ex) {
			System.out.println(ex.getMessage());
		}
		return res;
	}
	
	@GetMapping("/reasons")
	public List<Reason> getAllReason() {
		return reasonService.getAllReasons();
	}
	
	@GetMapping("/type")
	public List<Type> getAllType() {
		
		
		return typeService.getAllTypes();
	}
	
	
	@GetMapping("/priority")
	public List<Priority> getAllPriority(){
		return priorityService.getAllPrioritys();
	}
	
	@GetMapping("/location")
	public List<Location> getAllLocation(){
		return locationService.getAllLocations();
	}
	
	@GetMapping("/division")
	public List<Division> getAllDivision(){
		return divisionService.getAllDivisions();
	}
	
	@GetMapping("/department")
	public List<Department> getAllDepartment(){
		return departmentService.getAllDepartments();
	}
	
	@GetMapping("/category")
	public List<Category> getAllCategory(){
		return categoryService.getAllCategory();
	}
	
	@PutMapping("/updateStatus/{projectId}")
	public ResponseEntity<Project> updateProjectStatus(@PathVariable int projectId, @RequestBody int statusId) {
	   System.out.println("innnnnn"+ statusId);
		Project updatedProject = projectservice.updateProjectStatus(projectId, statusId);
	    System.out.println("in updatestatus");
	    return ResponseEntity.ok(updatedProject);
	}
	
	@GetMapping("/getTotalProjectCount")
	  public int getTotalProjectCount() {
	    return projectservice.getTotalProjectCount();
	  }
	
	   @GetMapping("/closedProjectsCount")
	    public int getClosedProjectsCount() {
	        return projectservice.getClosedProjectsCount();
	    }

	    @GetMapping("/cancelledProjectsCount")
	    public int getCancelledProjectsCount() {
	        return projectservice.getCancelledProjectsCount();
	    }

	    @GetMapping("/runningProjectsCount")
	    public int getRunningProjectsCount() {
	        return projectservice.getRunningProjectsCount();
	    }
	

	    @GetMapping("/getClosureDelayProjectsCount")
	    public int getClosureDelayProjectsCount() {
	        return projectservice.getClosureDelayProjectsCount();
	    }
	    
	    @GetMapping("/getDepartmentSuccessData")
	    public List<DepartmentSuccessDto> getDepartmentSuccessData() {
	        return projectservice.getDepartmentSuccessData();
	    }
}
