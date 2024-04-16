import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { FormBuilder, FormGroup,FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectServiceService } from '../../services/project-service.service';
import { SessionService } from '../../services/session.service';
import { ForgetpassComponent } from '../forgetpass/forgetpass.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterOutlet, SignupComponent,
           RouterLink, ReactiveFormsModule,HttpClientModule,ForgetpassComponent],
  providers:[ProjectServiceService, SessionService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  isFormSubmitted:boolean = false;
  loggedInUser: string | null = null;
  userEmail: string = ''; 
  user: any | undefined; 

  constructor(
    private fb: FormBuilder,
    private authService: ProjectServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private sessionService: SessionService
  ) { }


  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
 //   this.getUserByEmail();
    this.isManager();
  }

  // getSession() {
  //   this.authService.getSession().subscribe(
  //     (response: string) => {
  //       this.loggedInUser = response;
  //       console.warn("Inside getSession : ",this.loggedInUser)
  //     },
  //     (error) => {
  //       console.log("Error getting session:", error);
  //     }
  //   );
  // }

  onSubmit(): void {
    console.warn("Hii i am in onsubmit")
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.warn("IsManager : ",this.isManager())
      this.authService.login("user/login", email, password).subscribe(
        (response: any) => {
          console.warn("Role:"+response.userRole)
          console.warn("status : "+response.status)
          if (response && response.status === 'success' && response.message === 'Login successful') {
            console.log("111",response)
            if (this.isManager()) {
              console.warn("Inside set login")
               this.sessionService.setLoggedIn(true);
               console.warn("isloggedin in login : "+this.sessionService.isLoggedInUser())
              this.router.navigate(['/createproject']);
            } else {
                 this.router.navigate(['/projectList']);
                 this.sessionService.setLoggedIn(false);
            }
          } else {
            console.error("Unexpected response:", response);
            // Handle unexpected response format
            this.snackBar.open("Unexpected response. Please try again later.", 'Close', {
              duration: 3000 // Duration in milliseconds
            });
          }
        },
        (error: any) => {
          console.log(error);
          if (error.status === 404) {
            this.snackBar.open("User not found. Please register...", 'Close', {
              duration: 3000 // Duration in milliseconds
            });
          } else if (error.status === 401) {
            this.snackBar.open("Incorrect password...", 'Close', {
              duration: 3000 // Duration in milliseconds
            });
          } else {
            // Handle other errors
            console.error("An unexpected error occurred:", error);
            this.snackBar.open("An unexpected error occurred. Please try again later.", 'Close', {
              duration: 3000 // Duration in milliseconds
            });
          }
        }
      );
    }
  }

  getUserByEmail(): void {
      const { email } = this.loginForm.value;
      this.sessionService.findByEmail(email).subscribe(
        (data: any) => {
          this.user = data;
          console.log('User Data:', this.user);
          this.isManager(); 
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }

    isManager(): boolean {
        this.getUserByEmail();
        if (this.user && this.user.userRole === 'manager') {
          this.sessionService.setLoggedIn(true)
          return true;
        } else {
          console.warn("User : ",this.user.userRole);
          this.sessionService.setLoggedIn(false)
          return false;
        }
      }

      forget():void{
        this.router.navigate(['/forget'])
      }
  
}
