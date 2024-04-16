import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectServiceService } from '../../services/project-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from 'express';



@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,MatPaginatorModule, RouterLink],
  providers: [ProjectServiceService, SessionService],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchText: string = '';
  selectedSortColumn: string = ''; // Track the selected column for sorting
  isSortAscending: boolean = true; // Track the sorting order
  pageSize = 10;
  pageSizeOptions: number[] = [10];
  userEmail: string = ''; 
  user: any | undefined; 

  constructor(private apiService: ProjectServiceService,private sessionService: SessionService) {}

  ngOnInit(): void {
    //  this.getSession()
    //  this.getUserByEmail();
    this.fetchProjectsFromAPI();
    this.filteredProjects = [...this.projects];
  }

  // fetchProjectsFromAPI(): void {
  //   this.apiService.getRequest('project/getAllProjects').subscribe((data) => {
  //     this.projects = data;
  //     this.filteredProjects = [...this.projects];
  //     console.log(this.projects);
  //   });
  // }
  fetchProjectsFromAPI(): void {
    this.apiService.getRequest('project/getAllProjects').subscribe((data) => {
      this.projects = data;
      this.filteredProjects = [...this.projects];
      this.paginator.length = this.filteredProjects.length; // Update paginator length
      console.log(this.projects);
    });
  }
 
  
  startProject(project: Project): void {
    if (project.id) this.updateProjectStatus(project.id, 1);
  }

  closeProject(project: Project): void {
    console.log('2', project);
    if (project.id) this.updateProjectStatus(project.id, 2);
  }

  cancelProject(project: Project): void {
    console.log('in cancelProject');

    if (project.id) this.updateProjectStatus(project.id, 3);
  }

  updateProjectStatus(projectId: number, statusId: number): void {
    this.apiService
      .updateProjectStatus('project/updateStatus', projectId, statusId)
      .subscribe(
        (response) => {
          console.log('Project status updated:', response);
          console.log(statusId);
          this.fetchProjectsFromAPI();
        },
        (error) => {
          console.error('Error updating project status:', error);
        }
      );
  }

  applySearch(): void {
    if (!this.searchText) {
      this.filteredProjects = [...this.projects]; // No search text, show all projects
      return;
    }

    const searchTextLower = this.searchText.toLowerCase();
    this.filteredProjects = this.projects.filter((project) =>
      this.doesObjectContainSearchText(project, searchTextLower)
    );
  }

  doesObjectContainSearchText(obj: any, searchText: string): boolean {
    for (const key in obj) {
      if (
        typeof obj[key] === 'string' &&
        obj[key].toLowerCase().includes(searchText)
      ) {
        return true; // Found match in current property
      } else if (typeof obj[key] === 'object') {
        // Recursively search nested objects or arrays
        if (this.doesObjectContainSearchText(obj[key], searchText)) {
          return true; // Found match in nested object
        }
      }
    }
    return false; // No match found in this object
  }

  // Sorting

  sortFilteredProjects(): void {
    if (!this.selectedSortColumn) return; 

    
    this.filteredProjects.sort((a, b) => {
      const valA = this.getValueForSorting(a, this.selectedSortColumn);
      const valB = this.getValueForSorting(b, this.selectedSortColumn);

      if (valA < valB) return this.isSortAscending ? -1 : 1;
      if (valA > valB) return this.isSortAscending ? 1 : -1;
      return 0;
    });
  }
  
  getValueForSorting(project: Project, column: string): any {
    switch (column) {
      case 'projectName':
        return project.projectName;
      case 'reason':
        return project.reason?.reasonName;
      case 'type':
        return project.type?.typeName;
      case 'division':
        return project.division?.divisionName;
      case 'category':
        return project.category?.categoryName;
      case 'priority':
        return project.priority?.priorityName;
      case 'department':
        return project.department?.departmentName;
      case 'location':
        return project.location?.locationName;
      case 'status':
        return project.status?.statusName;

      case 'startDate':
        return project.startDate ? new Date(project.startDate) : null;
      case 'endDate':
        return project.endDate ? new Date(project.endDate) : null;
      default:
        
    } 
  }

 
  applySort(): void {
    this.sortFilteredProjects();
  }
 
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.filteredProjects = this.projects.slice(startIndex, endIndex);
  }

  // getSession(){
  //   this.sessionService.getSession().subscribe(
  //     (response: any) => {
  //       this.userEmail = response;
  //       console.warn("Inside dashboard getSession response : ",response)
  //       console.warn("Inside dashboard getSession : ",this.userEmail)
  //     },
  //     (error) => {
  //       console.log("Error getting session:", error);
  //     }
  //   );
  // }

  // getUserByEmail(): void {
  //   this.sessionService.findByEmail(this.userEmail).subscribe(
  //     (data: any) => {
  //       this.user = data;
  //       console.log('User Data:', this.user);
  //       this.isManager(); // Call isManager once user data is fetched
  //     },
  //     (error) => {
  //       console.error('Error fetching user:', error);
  //     }
  //   );
  // }

  isManager(): boolean {
    if(this.sessionService.isLoggedInUser()){
      return true;
    }
    else{
      return false;
    }
  }
  
}