import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgetpassComponent } from './pages/forgetpass/forgetpass.component';


export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'createproject', component:CreateProjectComponent},
    {path:'projectList',component:ProjectListComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'forget',component:ForgetpassComponent},
    {path:'', redirectTo:'/login',pathMatch:'full'}
];
