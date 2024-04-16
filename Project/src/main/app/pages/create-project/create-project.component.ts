import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../../models/project';
import { User } from '../../models/user';
import { ProjectServiceService } from '../../services/project-service.service';
import { Reasons } from '../../models/Reasons';
import { Division } from '../../models/Division';
import { Category } from '../../models/Category';
import { Priority } from '../../models/Priority';
import { Department } from '../../models/Department';
import { Location } from '../../models/Location';
import { Type } from '../../models/Type';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatSelectModule } from '@angular/material/select'; 
import { Router, RouterLink } from '@angular/router';
import { Status } from '../../models/status';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MultiSelectModule, 
    MatSelectModule,
    RouterLink
  ],
  providers: [ProjectServiceService,SessionService],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css',
})
export class CreateProjectComponent implements OnInit {

  loggedInUser: string | null = null;
  filteredUsers: User[] = [];
  projectForm!: FormGroup;
  projectName!: String;
  userlist: User[] = [];
  reasonList: Reasons[] = [];
  typesList: Type[] = [];
  divList: Division[] = [];

  categoryList: Category[] = [];
  priorityList: Priority[] = [];
  depList: Department[] = [];
  locationList: Location[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  
  status: string ="Registered";
  selectedUsers: number[] | null= null;
  selectedReason: Reasons =new Reasons(1,"");
  selectedType: Type =new Type(1,"");
  selectedDivision: Division =new Division(1,"");
  selectedCategory: Category =new Category(1,"");
  selectedPriority: Priority =new Priority(1,"");
  selectedDepartment: Department =new Department(1,"");
  selectedLocation: Location =new Location(1,"");
  status1:Status=new Status(1,"registered");
  selectedStartDate: any;
  selectedEndDate: any;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectServiceService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService,
    private router: Router

  ) { }

  saveRecord(e: { target: { value: any; }; }) {
    console.log(e.target.value)
  }

  getSession() {
    this.sessionService.getSession().subscribe(
      (response: string) => {
        this.loggedInUser = response;
        console.warn("Inside getSession : ",this.loggedInUser)
      },
      (error) => {
        console.log("Error getting session:", error);
      }
    );
  }

  ngOnInit(): void {
 //   console.warn("in create project : ",this.sessionService.isLoggedInUser())
  //  if (this.loggedInUser) {
 //   console.warn("Inside ngOnInit : ",this.loggedInUser)
    this.getSession();
    this.initializeForm();
    this.fetchUsersFromAPI();
    this.fetchReasonsFromAPI();
    this.fetchTypeFromAPI();
    this.fetchDivisionFromAPI();
    this.fetchCategoryFromAPI();
    this.fetchPriorityFromAPI();
    this.fetchDepartmentFromAPI();
    this.fetchLocationFromAPI();
  //  }
    // else{
    //   this.router.navigate(['/login']);
    // }
  }

  initializeForm(): void {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      selectedUsers: [[]],
      reason: ['', Validators.required],
      type: ['', Validators.required],
      division: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      department: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required,this.endDateValidator()],
      location: ['', Validators.required]
    });
  }


  SelectedUsersForm(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedUserIds: number[] = [];
    
    for (let i = 0; i < target.options.length; i++) {
      const option = target.options[i];
     
      if (option.selected) {

     
        const valueParts = option.value.split(':'); // Split by colon
        const userId = parseInt(valueParts[1].trim(), 10); // Parse the first part (user ID)
        selectedUserIds.push(userId);

        //selectedUserIds.push(parseInt(option.value, 10));
      }
    }
  
    this.selectedUsers = selectedUserIds;
    
  }

  fetchUsersFromAPI(): void {
    this.projectService.getRequest("user/getAllUsers").subscribe(data => {
      this.userlist = data;
    });
  }


  fetchReasonsFromAPI(): void {
    this.projectService.getRequest("project/reasons").subscribe(data => {
      this.reasonList = data;
    }
    );
  }

  fetchTypeFromAPI(): void {
    this.projectService.getRequest("project/type").subscribe(data => {
      this.typesList = data;
      
    });
  }

  fetchDivisionFromAPI(): void {
    this.projectService.getRequest("project/division").subscribe(data => {
      this.divList = data;
    });
  }

  fetchCategoryFromAPI(): void {
    this.projectService.getRequest("project/category").subscribe(data => {
      this.categoryList = data;
    });
  }

  fetchPriorityFromAPI(): void {
    this.projectService.getRequest("project/priority").subscribe(data => {
      this.priorityList = data;
    });
  }

  fetchDepartmentFromAPI(): void {
    this.projectService.getRequest("project/department").subscribe(data => {
      this.depList = data;
    });
  }

fetchLocationFromAPI(): void {
  this.projectService.getRequest("project/location").subscribe(data => {
      this.locationList = data;
    });
  }


  // saveProject(): void {
  //   if (this.projectForm.valid) {
  //     const projectData = this.projectForm.value;
  //     projectData.selectedUsers = this.selectedUsers;
  //     this.projectService.saveProject(projectData).subscribe(response => {
  //       console.log('Project saved:', projectData, response);
  //     });
  //   } else {
  //     // Handle form validation errors
  //   }
  // }

  saveProject(): void {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      console.log("hiii",projectData)

      const type = this.projectForm.get('type')?.value;
      console.log('Type:', type);

      delete projectData.id;
      projectData.reason = this.getReasonObject(projectData.reason);
      projectData.type = this.getTypeObject(this.projectForm.get('type')?.value);
      console.log("type : ",projectData.typeId)
      projectData.division = this.getDivisionObject(projectData.division);
      projectData.category = this.getCategoryObject(projectData.category);
      projectData.priority = this.getPriorityObject(projectData.priority);
      projectData.department = this.getDepartmentObject(projectData.department);
      projectData.location = this.getLocationObject(projectData.location);
      projectData.status = this.status1;
      projectData.startDate = this.projectForm.get('startDate')?.value;
      projectData.endDate = this.projectForm.get('endDate')?.value;
      
      // Assuming selectedUsers is an array of user IDs
      const selectedUserIds = this.projectForm.get('selectedUsers')?.value;
      if (selectedUserIds && selectedUserIds.length > 0) { 
        const selectedUsers = this.userlist.filter(user => selectedUserIds.includes(user.id));
        projectData.user = selectedUsers[0]; // Assuming only one user can be selected
      }
      
      this.projectService.postRequest("project/saveProject", projectData).subscribe(response => {
        console.log('Project saved:', projectData, response);
      });
    } else {
      // Handle form validation errors
    }
  } 
  
getReasonObject(reasonId: number): Reasons {
    console.warn("hii in reason : " + reasonId);
    this.selectedReason.reasonId=Number(reasonId);
    return this.selectedReason
}
  

getTypeObject(typeId: number): Type  {
    this.selectedType.typeId=Number(typeId);
    return this.selectedType
}

getDivisionObject(divisionId: number): Division {
    this.selectedDivision.divisionId=Number(divisionId);
    return this.selectedDivision
}

getCategoryObject(categoryId: number): Category {
    this.selectedCategory.categoryId=Number(categoryId);
    return this.selectedCategory
}

getPriorityObject(priorityId: number): Priority {
    this.selectedPriority.priorityId=Number(priorityId);
    return this.selectedPriority
}

getDepartmentObject(departmentId: number): Department {
    this.selectedDepartment.departmentId=Number(departmentId);
    return this.selectedDepartment
}

getLocationObject(locationId: number): Location {
    this.selectedLocation.locationId=Number(locationId);
    return this.selectedLocation
}



  // getUserObject(userId: number): User | null {
  //   return this.userlist.find(user => user.id == userId)  null;
  // }

  // searchUsers(event: any): void {
  //   const searchTerm = event.target.value.toLowerCase();
  //   this.filteredUsers = this.userlist.filter(user =>
  //     user.username.toLowerCase().includes(searchTerm)
  //   );
  // }

  endDateValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve) => {
        const startDate = control.parent?.get('startDate')?.value;
        const endDate = control.value;

        if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
          // Show snackbar with error message
          this.showSnackbar('End date should be greater than start date');
          resolve({ endDateInvalid: true });
        } else {
          resolve(null);
        }
      });
    };
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center', // Position of the snackbar
      verticalPosition: 'top',
      panelClass: ['snackbar-error'], // Custom CSS class for styling
    });
  }

 

}