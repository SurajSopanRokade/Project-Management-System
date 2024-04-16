import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgetpassComponent } from './pages/forgetpass/forgetpass.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SignupComponent,LoginComponent,CreateProjectComponent,DashboardComponent,ProjectListComponent,HttpClientModule,ForgetpassComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Techprimelab';
}
