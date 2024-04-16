import { Component, NO_ERRORS_SCHEMA   } from '@angular/core';
import { ProjectServiceService } from '../../services/project-service.service';
import { RouterLink, Router } from '@angular/router';

import { jqxChartModule } from 'jqwidgets-ng/jqxchart'; 
import { CommonModule } from '@angular/common';
import { DepartmentSuccessDto } from '../../models/department-success-dto';
import { SessionService } from '../../services/session.service';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../../models/user';



@Component({
  selector: 'app-dashboard', 
  standalone: true,
  imports: [RouterLink, CommonModule,jqxChartModule],     
  providers: [ProjectServiceService,SessionService], 
  schemas: [NO_ERRORS_SCHEMA],  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
}) 
export class DashboardComponent {
  loggedInUser!: string;
  totalProjects: number = 0;
  closedProjectsCount: number = 0;
  cancelledProjectsCount: number = 0;
  runningProjectsCount: number = 0; 
  closureDelayProjectsCount: number = 0;
  departmentSuccessData: DepartmentSuccessDto[]=[];
  // userEmail: string = ''; 
  // user: any | undefined; 
  
 
 
  sampleData!: any[];
  xAxis!: any;
  seriesGroups!: any[];

  constructor(private apiService: ProjectServiceService,private sessionService: SessionService,private router: Router) {}

  ngOnInit(): void {
    // if (this.sessionService.isLoggedInUser()) {
    // this.getSession()
    // this.getUserByEmail();
    this.fetchDepartmentSuccessData();
    this.fetchTotalProjectsCount();
    this.fetchClosedProjectsCount();
    this.fetchCancelledProjectsCount();
    this.fetchRunningProjectsCount();
    this.fetchClosureDelayProjectsCount();
   // }
    // else{
    //   this.router.navigate(['/login']);
    // }
  }
  

  fetchTotalProjectsCount(): void {
    this.apiService.getRequest('project/getTotalProjectCount').subscribe(
      (count: number) => {
        this.totalProjects = count;
      },
      (error) => {
        console.log('Error fetching total projects count:', error);
      }
    );
  }

  fetchClosedProjectsCount(): void {
    this.apiService.getRequest('project/closedProjectsCount').subscribe(
      (data: number) => {
        this.closedProjectsCount = data;
      }, 
      (error) => {
        console.error('Error fetching closed projects count:', error);
      }
    );
  }

  fetchCancelledProjectsCount(): void {
    this.apiService.getRequest('project/cancelledProjectsCount').subscribe(
      (data: number) => {
        this.cancelledProjectsCount = data;
      },
      (error) => {
        console.error('Error fetching cancelled projects count:', error);
      }
    );
  }

  fetchRunningProjectsCount(): void {
    this.apiService.getRequest('project/runningProjectsCount').subscribe(
      (data: number) => {
        this.runningProjectsCount = data;
      },
      (error) => {
        console.error('Error fetching running projects count:', error);     
      }
    ); 
  }

  fetchClosureDelayProjectsCount(): void {
    this.apiService
      .getRequest('project/getClosureDelayProjectsCount')
      .subscribe(
        (data: number) => {
          this.closureDelayProjectsCount = data;
        },
        (error) => {
          console.error('Error fetching running projects count:', error);
        }
      );
  }
  fetchDepartmentSuccessData(): void {
    this.apiService.getRequest('project/getDepartmentSuccessData').subscribe(
      (data: DepartmentSuccessDto[]) => {
        this.departmentSuccessData = data;
  
        // Populate sampleData array
        this.sampleData = data.map(item => ({
          department: item.departmentName,
          totalProjects: item.totalProjects, 
          totalProjectsclosed: item.closedProjects, 
          successPercentage: item.successRate 
        }));
  
        console.log('sampledata 11',this.sampleData)
        // Configure xAxis
        this.xAxis = { 
          dataField: 'department', 
          showGridLines: true,  
          labels: {
            formatFunction: (value: string): string => {
             // const abbreviatedValue = value.substring(0, 5);
              const item = this.sampleData.find((item) => item.department == value);
              if (item) {
                return `${item.successPercentage}% <br> ${value}`;
              }
            
              return value; 
            },
          },
        };
  
  
        // Configure seriesGroups
        this.seriesGroups = [
          {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 0,
            valueAxis: {
              unitInterval: 2,
              minValue: 0,
              maxValue: 16,
              displayValueAxis: true,
              description: '',
              axisSize: 'auto',
              tickMarksColor: '#888888'
            },
            series: [
              { dataField: 'totalProjects', displayText: 'Total Projects' },
              { dataField: 'totalProjectsclosed', displayText: 'Closed Projects' },
             
            ]
          }
        ];
      
        console.log('Department success data:', data);
      },
      (error) => {
        console.error('Error fetching department success data:', error);
      }
    );
  }
  
  logout() {
  //  this.sessionService.setLoggedIn(false);
    this.router.navigate(['/login']);
  }


  padding: any = { left: 15, top: 15, right: 15, bottom: 15 };
  titlePadding: any = { left: 10, top: 10, right: 0, bottom: 10 }; 

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

  // isManager(): boolean {
  //   if (this.user && this.user.userRole === 'manager') {
  //     this.sessionService.setLoggedIn(true)
  //     return true;
  //   } else {
  //     console.warn("User : ",this.user);
  //     this.sessionService.setLoggedIn(false)
  //     return false;
  //   }
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

